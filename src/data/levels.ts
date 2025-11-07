export const MAX_LEVEL = 20;
export const XP_PER_MINUTE = 2;

export const LEVEL_NAMES_ELF: Record<number, string> = {
  1: "🌱 Tomato Seed",
  2: "🪴 Young Sprout",
  3: "🌿 Tomato Sprout",
  4: "🍃 Growing Plant",
  5: "🌾 Healthy Plant",
  6: "🌺 Early Blossom",
  7: "🌸 Tomato Blossom",
  8: "🌼 Full Bloom",
  9: "🌻 Flowering Plant",
  10: "🍀 Mature Plant",
  11: "🌷 Tomato Guardian",
  12: "🌹 Tomato Keeper",
  13: "💐 Tomato Protector",
  14: "🥀 Tomato Champion",
  15: "🏵️ Tomato Master",
  16: "🌾 Tomato Lord",
  17: "🌿 Tomato Sage",
  18: "🍃 Tomato Legend",
  19: "🌱 Tomato Emperor",
  20: "🍅 Tomato God"
};

export const LEVEL_NAMES_HUMAN: Record<number, string> = {
  1: "🌱 Tomato Seed",
  2: "🪴 Brave Sprout",
  3: "🌿 Tomato Sprout",
  4: "🍃 Strong Plant",
  5: "🌾 Hardy Plant",
  6: "🌺 Battle Blossom",
  7: "🌸 Tomato Blossom",
  8: "🌼 Warrior Bloom",
  9: "🌻 Fighting Plant",
  10: "🍀 Veteran Plant",
  11: "🌷 Tomato Warrior",
  12: "🌹 Tomato Knight",
  13: "💐 Tomato Defender",
  14: "🥀 Tomato Hero",
  15: "🏵️ Tomato Master",
  16: "🌾 Tomato Warlord",
  17: "🌿 Tomato Commander",
  18: "🍃 Tomato Legend",
  19: "🌱 Tomato Emperor",
  20: "🍅 Tomato God"
};

export const ROLE_EMOJI_ELF = "🏹";
export const ROLE_EMOJI_HUMAN = "⚔️";

export function getLevelName(level: number, path: 'elf' | 'human'): string {
  const names = path === 'elf' ? LEVEL_NAMES_ELF : LEVEL_NAMES_HUMAN;
  return names[level] || names[MAX_LEVEL];
}

export function getXPNeeded(level: number): number {
  return level * 100;
}

export function getTotalXPForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += getXPNeeded(i);
  }
  return total;
}

export function getBadgeForLevel(level: number, prestigeLevel: number): string {
  const stars = "⭐".repeat(Math.min(prestigeLevel, 5));

  if (level <= 5) return "🌱" + stars;
  if (level <= 10) return "🌿" + stars;
  if (level <= 15) return "🌺" + stars;
  if (level <= 19) return "🍀" + stars;
  return "🍅" + stars;
}
