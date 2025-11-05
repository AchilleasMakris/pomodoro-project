/**
 * Level System Module
 * Manages user XP, levels, and prestige system
 */

// Constants
const MAX_LEVEL = 20;
const XP_PER_HOUR = 10; // 60 minutes = 10 XP
const USERNAME_EDIT_COOLDOWN = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const USERNAME_EDIT_COST = 50; // XP cost for early username change
const PRESTIGE_THRESHOLD = MAX_LEVEL;

/**
 * Calculate XP required for a given level
 * Formula: 100 * level (e.g., Level 1->2 needs 100 XP, Level 2->3 needs 200 XP)
 */
function getXPRequiredForLevel(level) {
  if (level >= MAX_LEVEL) {
    return 100 * MAX_LEVEL; // Max level requirement
  }
  return 100 * level;
}

/**
 * Calculate total XP needed to reach a specific level from level 1
 */
function getTotalXPForLevel(level) {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += getXPRequiredForLevel(i);
  }
  return total;
}

/**
 * Calculate XP earned based on study time in minutes
 */
function calculateXPFromTime(minutes) {
  return Math.floor((minutes / 60) * XP_PER_HOUR);
}

/**
 * Get current level data from settings
 */
function getLevelData() {
  const settings = loadSettings();
  return {
    xp: settings.xp || 0,
    level: settings.level || 1,
    prestigeLevel: settings.prestigeLevel || 0,
    totalPomodoros: settings.totalPomodoros || 0,
    username: settings.username || 'User',
    lastUsernameChange: settings.lastUsernameChange || null
  };
}

/**
 * Show XP collection popup notification
 * @param {number} xpAmount - Amount of XP gained
 */
function showXPPopup(xpAmount) {
  // Remove any existing popup
  const existingPopup = document.querySelector('.xp-popup');
  if (existingPopup) {
    existingPopup.remove();
  }

  // Create popup element
  const popup = document.createElement('div');
  popup.className = 'xp-popup';
  popup.innerHTML = `+${xpAmount} XP Collected 🍅`;

  document.body.appendChild(popup);

  let isHovered = false;
  let fadeTimeout;

  // Handle hover to keep popup visible
  popup.addEventListener('mouseenter', () => {
    isHovered = true;
    popup.style.opacity = '0.8';
    clearTimeout(fadeTimeout);
  });

  popup.addEventListener('mouseleave', () => {
    isHovered = false;
    // Start fade out after unhover
    fadeTimeout = setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => {
        if (!isHovered) {
          popup.remove();
        }
      }, 300);
    }, 100);
  });

  // Auto fade after 1 second if not hovered
  fadeTimeout = setTimeout(() => {
    if (!isHovered) {
      popup.style.opacity = '0';
      setTimeout(() => {
        if (!isHovered) {
          popup.remove();
        }
      }, 300);
    }
  }, 1000);
}

/**
 * Create tomato explosion celebration for level-up
 */
function createTomatoCelebration() {
  const celebrationContainer = document.querySelector('.level-celebration');
  if (!celebrationContainer) return;

  const levelBox = document.querySelector('.level-box');
  if (!levelBox) return;

  const boxRect = levelBox.getBoundingClientRect();
  const centerX = boxRect.width / 2;
  const centerY = boxRect.height / 2;

  // Create 12 tomato particles
  const numParticles = 12;
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'tomato-particle';
    particle.textContent = '🍅';

    // Calculate random angle and distance
    const angle = (i / numParticles) * Math.PI * 2;
    const distance = 60 + Math.random() * 30;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    // Set CSS custom properties for animation
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);

    // Position at center
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    particle.style.transform = 'translate(-50%, -50%)';

    celebrationContainer.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

/**
 * Award XP and handle level ups
 * @param {number} minutes - Study time in minutes
 * @returns {object} - Result with level changes and XP gained
 */
function awardXP(minutes) {
  const settings = loadSettings();
  const xpGained = calculateXPFromTime(minutes);

  let currentXP = settings.xp || 0;
  let currentLevel = settings.level || 1;
  const currentPrestige = settings.prestigeLevel || 0;

  currentXP += xpGained;

  const levelUps = [];

  // Check for level ups
  while (currentLevel < MAX_LEVEL && currentXP >= getXPRequiredForLevel(currentLevel)) {
    currentXP -= getXPRequiredForLevel(currentLevel);
    currentLevel++;
    levelUps.push(currentLevel);

    // Dispatch level up event
    window.dispatchEvent(new CustomEvent('levelUp', {
      detail: { newLevel: currentLevel, prestigeLevel: currentPrestige }
    }));

    // Trigger tomato celebration
    createTomatoCelebration();
  }

  // Check for prestige eligibility
  const canPrestige = currentLevel >= MAX_LEVEL;

  // Save updated data
  settings.xp = currentXP;
  settings.level = currentLevel;
  settings.totalPomodoros = (settings.totalPomodoros || 0) + 1;
  saveSettings(settings);

  // Dispatch XP gained event
  window.dispatchEvent(new CustomEvent('xpGained', {
    detail: {
      xpGained,
      currentXP,
      currentLevel,
      levelUps,
      canPrestige
    }
  }));

  // Show XP popup notification
  showXPPopup(xpGained);

  return {
    xpGained,
    currentXP,
    currentLevel,
    levelUps,
    canPrestige
  };
}

/**
 * Perform prestige - reset to level 1 but gain a prestige star
 */
function performPrestige() {
  const settings = loadSettings();

  if (settings.level < MAX_LEVEL) {
    return { success: false, message: 'Must reach Level 20 to prestige' };
  }

  const newPrestigeLevel = (settings.prestigeLevel || 0) + 1;

  // Reset level and XP, but keep stats
  settings.level = 1;
  settings.xp = 0;
  settings.prestigeLevel = newPrestigeLevel;

  saveSettings(settings);

  // Dispatch prestige event
  window.dispatchEvent(new CustomEvent('prestige', {
    detail: { prestigeLevel: newPrestigeLevel }
  }));

  return { success: true, prestigeLevel: newPrestigeLevel };
}

/**
 * Check if username can be changed for free
 */
function canChangeUsernameFree() {
  const settings = loadSettings();
  const lastChange = settings.lastUsernameChange;

  if (!lastChange) {
    return true; // First time, always free
  }

  const timeSinceLastChange = Date.now() - lastChange;
  return timeSinceLastChange >= USERNAME_EDIT_COOLDOWN;
}

/**
 * Get time remaining until free username change (in milliseconds)
 */
function getTimeUntilFreeChange() {
  const settings = loadSettings();
  const lastChange = settings.lastUsernameChange;

  if (!lastChange) {
    return 0;
  }

  const timeSinceLastChange = Date.now() - lastChange;
  const remaining = USERNAME_EDIT_COOLDOWN - timeSinceLastChange;

  return Math.max(0, remaining);
}

/**
 * Format time remaining for display
 */
function formatTimeRemaining(milliseconds) {
  const days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
  const hours = Math.floor((milliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

  if (days > 0) {
    return `${days}d ${hours}h`;
  }
  return `${hours}h`;
}

/**
 * Change username
 * @param {string} newUsername - New username
 * @param {boolean} forceWithXP - If true, spend XP to change before cooldown
 */
function changeUsername(newUsername, forceWithXP = false) {
  const settings = loadSettings();

  if (!newUsername || newUsername.trim().length === 0) {
    return { success: false, message: 'Username cannot be empty' };
  }

  if (newUsername.length > 20) {
    return { success: false, message: 'Username too long (max 20 characters)' };
  }

  const isFree = canChangeUsernameFree();

  if (!isFree && !forceWithXP) {
    const timeRemaining = getTimeUntilFreeChange();
    return {
      success: false,
      needsXP: true,
      xpCost: USERNAME_EDIT_COST,
      timeRemaining: formatTimeRemaining(timeRemaining)
    };
  }

  if (!isFree && forceWithXP) {
    // Check if user has enough XP
    if (settings.xp < USERNAME_EDIT_COST) {
      return {
        success: false,
        message: `Not enough XP. Need ${USERNAME_EDIT_COST} XP, have ${settings.xp} XP`
      };
    }

    // Deduct XP
    settings.xp -= USERNAME_EDIT_COST;
  }

  settings.username = newUsername.trim();
  settings.lastUsernameChange = Date.now();
  saveSettings(settings);

  // Dispatch username change event
  window.dispatchEvent(new CustomEvent('usernameChanged', {
    detail: { username: newUsername, xpSpent: !isFree ? USERNAME_EDIT_COST : 0 }
  }));

  return { success: true, xpSpent: !isFree ? USERNAME_EDIT_COST : 0 };
}

/**
 * Get progress percentage for current level
 */
function getLevelProgress() {
  const settings = loadSettings();
  const currentXP = settings.xp || 0;
  const currentLevel = settings.level || 1;

  if (currentLevel >= MAX_LEVEL) {
    return 100; // Max level reached
  }

  const xpRequired = getXPRequiredForLevel(currentLevel);
  const progress = (currentXP / xpRequired) * 100;

  return Math.min(100, Math.max(0, progress));
}

/**
 * Get stats for display
 */
function getStats() {
  const settings = loadSettings();
  const totalPomodoros = settings.totalPomodoros || 0;
  const totalMinutes = totalPomodoros * (settings.pomodoroTime || 25);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  return {
    level: settings.level || 1,
    xp: settings.xp || 0,
    xpRequired: getXPRequiredForLevel(settings.level || 1),
    prestigeLevel: settings.prestigeLevel || 0,
    totalPomodoros,
    totalStudyTime: `${totalHours}h ${remainingMinutes}m`,
    progress: getLevelProgress(),
    canPrestige: (settings.level || 1) >= MAX_LEVEL
  };
}

/**
 * Reset all progress (for settings option)
 */
function resetProgress() {
  const settings = loadSettings();
  settings.xp = 0;
  settings.level = 1;
  settings.prestigeLevel = 0;
  settings.totalPomodoros = 0;
  settings.username = 'User';
  settings.lastUsernameChange = null;
  saveSettings(settings);

  window.dispatchEvent(new CustomEvent('progressReset'));

  return { success: true };
}

// Initialize level system when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Listen for pomodoro completions
  window.addEventListener('pomodoroCompleted', (event) => {
    const duration = event.detail.duration; // in minutes
    awardXP(duration);
  });

  // Update UI initially
  updateLevelDisplay();

  // Make level number clickable to open Progress tab
  const levelNumber = document.querySelector('.level-number');
  if (levelNumber) {
    levelNumber.addEventListener('click', () => {
      // Open settings modal
      const settingsModal = document.getElementById('settings-modal');
      if (settingsModal) {
        settingsModal.classList.remove('hidden');
      }

      // Switch to Progress tab
      const progressTabBtn = document.querySelector('[data-tab="progress"]');
      if (progressTabBtn) {
        progressTabBtn.click();
      }
    });
  }

  // Front-page test XP button
  const testXpBtnMain = document.getElementById('test-xp-btn-main');
  if (testXpBtnMain) {
    testXpBtnMain.addEventListener('click', () => {
      // Award 10 XP (equivalent to 60 minutes)
      awardXP(60);
      updateLevelDisplay();
    });
  }
});

/**
 * Get badge icon based on level and prestige
 */
function getBadgeIcon(level, prestigeLevel) {
  // Prestige badges (override level badges)
  if (prestigeLevel >= 5) return '👑'; // King/Queen at 5+ prestige
  if (prestigeLevel >= 3) return '💎'; // Diamond at 3-4 prestige
  if (prestigeLevel >= 1) return '⭐'; // Star at 1-2 prestige

  // Level-based badges
  if (level >= 20) return '🏆'; // Trophy at max level
  if (level >= 15) return '🔥'; // Fire at level 15-19
  if (level >= 10) return '⚡'; // Lightning at level 10-14
  if (level >= 5) return '🌟'; // Glowing star at level 5-9
  return '🍅'; // Tomato for beginners (level 1-4)
}

/**
 * Update the level display in the UI
 */
function updateLevelDisplay() {
  const stats = getStats();
  const data = getLevelData();

  // Update level box
  const levelNumberElement = document.querySelector('.level-number');
  const usernameElement = document.querySelector('.level-username');
  const xpTextElement = document.querySelector('.xp-text');
  const xpProgressFill = document.querySelector('.xp-progress-fill');
  const prestigeStars = document.querySelector('.prestige-stars');

  if (levelNumberElement) {
    if (stats.level >= MAX_LEVEL && stats.canPrestige) {
      levelNumberElement.textContent = `Level ${stats.level} MAX`;
    } else {
      levelNumberElement.textContent = `Level ${stats.level}`;
    }
  }

  if (usernameElement) {
    usernameElement.textContent = data.username;
  }

  if (xpTextElement) {
    if (stats.level >= MAX_LEVEL) {
      xpTextElement.textContent = 'Ready to Prestige!';
    } else {
      xpTextElement.textContent = `${stats.xp} / ${stats.xpRequired} XP`;
    }
  }

  if (xpProgressFill) {
    xpProgressFill.style.width = `${stats.progress}%`;
  }

  if (prestigeStars && data.prestigeLevel > 0) {
    prestigeStars.textContent = '★'.repeat(Math.min(data.prestigeLevel, 5)); // Show max 5 stars
    prestigeStars.style.display = 'inline';
  } else if (prestigeStars) {
    prestigeStars.style.display = 'none';
  }

  // Update badge icon
  const badgeIcon = document.getElementById('badge-icon');
  if (badgeIcon) {
    badgeIcon.textContent = getBadgeIcon(data.level, data.prestigeLevel);
  }
}

// Update display when XP is gained
window.addEventListener('xpGained', () => {
  updateLevelDisplay();
});

// Update display when level up occurs
window.addEventListener('levelUp', () => {
  updateLevelDisplay();
});

// Update display when prestige occurs
window.addEventListener('prestige', () => {
  updateLevelDisplay();
});

// Update display when username changes
window.addEventListener('usernameChanged', () => {
  updateLevelDisplay();
});

/**
 * Update the Progress tab stats in settings modal
 */
function updateProgressTabStats() {
  const stats = getStats();
  const data = getLevelData();

  // Update stat values
  const statLevel = document.getElementById('stat-level');
  const statXP = document.getElementById('stat-xp');
  const statPrestige = document.getElementById('stat-prestige');
  const statPomodoros = document.getElementById('stat-pomodoros');
  const statStudyTime = document.getElementById('stat-study-time');

  if (statLevel) {
    statLevel.textContent = stats.level;
  }

  if (statXP) {
    if (stats.canPrestige) {
      statXP.textContent = 'MAX';
    } else {
      statXP.textContent = `${stats.xp} / ${stats.xpRequired}`;
    }
  }

  if (statPrestige) {
    statPrestige.textContent = data.prestigeLevel;
  }

  if (statPomodoros) {
    statPomodoros.textContent = stats.totalPomodoros;
  }

  if (statStudyTime) {
    statStudyTime.textContent = stats.totalStudyTime;
  }

  // Update prestige section visibility
  const prestigeSection = document.getElementById('prestige-section');
  if (prestigeSection) {
    if (stats.canPrestige) {
      prestigeSection.style.display = 'block';
    } else {
      prestigeSection.style.display = 'none';
    }
  }

  // Update username input
  const usernameInput = document.getElementById('username-input');
  if (usernameInput && !usernameInput.value) {
    usernameInput.value = data.username;
  }

  // Update username cooldown text
  updateUsernameCooldownText();
}

/**
 * Update username cooldown text
 */
function updateUsernameCooldownText() {
  const cooldownText = document.getElementById('username-cooldown-text');
  if (!cooldownText) return;

  if (canChangeUsernameFree()) {
    cooldownText.style.display = 'none';
  } else {
    const timeRemaining = getTimeUntilFreeChange();
    cooldownText.textContent = `Free username change available in ${formatTimeRemaining(timeRemaining)}. Changing now costs 50 XP.`;
    cooldownText.style.display = 'block';
  }
}

/**
 * Setup event listeners for Progress tab
 */
function setupProgressTabListeners() {
  // Prestige button
  const prestigeBtn = document.getElementById('prestige-btn');
  if (prestigeBtn) {
    prestigeBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to Prestige? You will reset to Level 1 but gain a prestige star.')) {
        const result = performPrestige();
        if (result.success) {
          alert(`Prestige successful! You are now Prestige Level ${result.prestigeLevel}!`);
          updateProgressTabStats();
          updateLevelDisplay();
        } else {
          alert(result.message);
        }
      }
    });
  }

  // Save username button
  const saveUsernameBtn = document.getElementById('save-username-btn');
  const usernameInput = document.getElementById('username-input');

  if (saveUsernameBtn && usernameInput) {
    saveUsernameBtn.addEventListener('click', () => {
      const newUsername = usernameInput.value.trim();

      if (!newUsername) {
        alert('Username cannot be empty.');
        return;
      }

      const isFree = canChangeUsernameFree();

      if (!isFree) {
        const confirmMsg = 'Changing your username now will cost 50 XP. Continue?';
        if (!confirm(confirmMsg)) {
          return;
        }
      }

      const result = changeUsername(newUsername, !isFree);

      if (result.success) {
        const xpMsg = result.xpSpent > 0 ? ` (Spent ${result.xpSpent} XP)` : '';
        alert(`Username changed to "${newUsername}"${xpMsg}`);
        updateProgressTabStats();
        updateLevelDisplay();
      } else if (result.needsXP) {
        alert(`Username change requires 50 XP or waiting ${result.timeRemaining}.`);
      } else {
        alert(result.message);
      }
    });
  }

  // Test XP button
  const testXpBtn = document.getElementById('test-xp-btn');
  if (testXpBtn) {
    testXpBtn.addEventListener('click', () => {
      // Award 10 XP directly (equivalent to 60 minutes of study)
      const result = awardXP(60);
      updateProgressTabStats();
      updateLevelDisplay();
    });
  }

  // Reset progress button
  const resetProgressBtn = document.getElementById('reset-progress-btn');
  if (resetProgressBtn) {
    resetProgressBtn.addEventListener('click', () => {
      if (confirm('Are you ABSOLUTELY SURE you want to reset ALL progress? This cannot be undone!')) {
        if (confirm('This will delete your level, XP, prestige, and all stats. Continue?')) {
          resetProgress();
          alert('All progress has been reset.');
          updateProgressTabStats();
          updateLevelDisplay();
          // Reset username input
          if (usernameInput) {
            usernameInput.value = 'User';
          }
        }
      }
    });
  }
}

// Listen for settings modal opening to update Progress tab
window.addEventListener('settingsChanged', () => {
  updateProgressTabStats();
});

// Update Progress tab when it's switched to
document.addEventListener('DOMContentLoaded', () => {
  // Setup event listeners
  setupProgressTabListeners();

  // Listen for tab switches
  const progressTabBtn = document.querySelector('[data-tab="progress"]');
  if (progressTabBtn) {
    progressTabBtn.addEventListener('click', () => {
      updateProgressTabStats();
    });
  }
});
