// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Define the durations for pomodoro, short break, and long break
  const pomodoroTime = 25 * 60; // 25 minutes in seconds
  const shortBreakTime = 5 * 60; // 5 minutes in seconds
  const longBreakTime = 15 * 60; // 15 minutes in seconds

  // Initialize timer value, interval, and state
  let timerValue = pomodoroTime;
  let timerInterval;
  let timerState = "stopped";

  // Initialize active timer to pomodoro
  let activeTimer = document.getElementById("pomodoro");

  // Get references to timer display, start button, reset button, and audio element
  const timerDisplay = document.querySelector(".timer");
  const startBtn = document.getElementById("start-btn");
  const resetBtn = document.getElementById("reset-btn");
  const audio = new Audio("./sound/bell.mp3");

  // Set the volume to 50%
  audio.volume = 0.5;

  // Counter to keep track of pomodoros completed for long break
  let pomodoroCount = 0;

  // Function to start the timer
  function startTimer() {
    timerState = "running";
    startBtn.textContent = "Pause";
    timerInterval = setInterval(() => {
      timerValue--;
      updateTimerDisplay();
      if (timerValue === 0) {
        clearInterval(timerInterval);
        playSound();
        switchTimer();
      }
    }, 1000);
  }

  // Function to pause the timer
  function pauseTimer() {
    clearInterval(timerInterval);
    timerState = "paused";
    startBtn.textContent = "Start";
  }

  // Function to reset the timer
  function resetTimer() {
    clearInterval(timerInterval);
    timerState = "stopped";
    timerValue = getTimeValue(activeTimer.id);
    updateTimerDisplay();
    startBtn.textContent = "Start";
  }

  // Function to switch between timers
  function switchTimer() {
    if (activeTimer.id === "pomodoro") {
      pomodoroCount++;
      if (pomodoroCount === 4) {
        activeTimer = document.getElementById("longbreak");
        timerValue = longBreakTime;
        pomodoroCount = 0; // Reset the counter
      } else {
        activeTimer = document.getElementById("shortbreak");
        timerValue = shortBreakTime;
      }
    } else if (activeTimer.id === "shortbreak") {
      activeTimer = document.getElementById("pomodoro");
      timerValue = pomodoroTime;
    } else {
      activeTimer = document.getElementById("pomodoro");
      timerValue = pomodoroTime;
    }
    activeTimer.checked = true;
    updateTimerDisplay();
    startTimer();
  }

  // Function to update the timer display
  function updateTimerDisplay() {
    const minutes = Math.floor(timerValue / 60);
    const seconds = timerValue % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  // Function to get the time value for a timer
  function getTimeValue(timerId) {
    switch (timerId) {
      case "pomodoro":
        return pomodoroTime;
      case "shortbreak":
        return shortBreakTime;
      case "longbreak":
        return longBreakTime;
      default:
        return 0;
    }
  }

  // Function to play the sound when the timer ends
  function playSound() {
    audio.play();
  }

  // Event listener for the start button
  startBtn.addEventListener("click", () => {
    if (timerState === "stopped") {
      startTimer();
    } else if (timerState === "running") {
      pauseTimer();
    } else if (timerState === "paused") {
      startTimer();
    }
  });

  // Event listener for the reset button
  resetBtn.addEventListener("click", () => {
    resetTimer();
  });

  // Event listeners for radio buttons to switch timers
  document.querySelectorAll('input[name="timerType"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio !== activeTimer) {
        activeTimer = radio;
        timerValue = getTimeValue(radio.id);
        resetTimer();
      }
    });
  });

  // Initialize timer display
  updateTimerDisplay();
});
