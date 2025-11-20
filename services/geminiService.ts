
// "No AI" Implementation - Pure Tuff Algorithms 💀

const TUFF_VOCAB = [
  "DEMON", "REAPER", "GHOST", "PHANTOM", "SHADOW", "VIPER", "SLAYER", 
  "KILLA", "DRILLA", "SOLDIER", "BANDIT", "NEMESIS", "CRASHOUT", "TWIN",
  "SAVAGE", "BEAST", "TITAN", "VENOM", "HAZARD", "CHAOS", "OMEN", "SPECTRE"
];

const PREFIXES = [
  "xX", "Itz", "Real", "Big", "Lil", "Tha", "Da", "Evil", "Dark", 
  "Locked_In", "Based", "Tuff", "Ur_Fav", "iAm", "Not", "Only"
];

const SUFFIXES = [
  "Xx", "420", "69", "999", "777", "WRLD", "SZN", "GOD", "MAIN", 
  "OFFICIAL", "REAL", "VIBEZ", "ARC", "TECH", "METHOD", "ZONE", "CLAN"
];

const leetify = (text: string): string => {
  return text
    .replace(/E/g, '3')
    .replace(/A/g, '4')
    .replace(/O/g, '0')
    .replace(/I/g, '1')
    .replace(/S/g, '5')
    .replace(/T/g, '7');
};

export const generateTuffNames = async (keyword: string): Promise<string[]> => {
  // Simulate that "heavy calculation" feel
  await new Promise(resolve => setTimeout(resolve, 500));

  // Use the keyword or pick a random vocab word if empty
  const base = keyword.toUpperCase().trim().replace(/\s+/g, '_') || TUFF_VOCAB[Math.floor(Math.random() * TUFF_VOCAB.length)];
  
  const results: Set<string> = new Set();

  // Generate unique names
  let attempts = 0;
  while (results.size < 10 && attempts < 50) {
    attempts++;
    const r = Math.random();
    const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
    const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
    const extra = TUFF_VOCAB[Math.floor(Math.random() * TUFF_VOCAB.length)];
    
    let name = base;

    if (r < 0.15) {
      // Classic xX style
      name = `xX_${base}_Xx`;
    } else if (r < 0.30) {
      // Prefix style
      name = `${prefix}_${base}`;
    } else if (r < 0.45) {
      // Suffix style
      name = `${base}_${suffix}`;
    } else if (r < 0.60) {
      // Full sandwich
      name = `${prefix}_${base}_${suffix}`;
    } else if (r < 0.75) {
      // Double barrel noun
      name = `${base}_${extra}`;
    } else if (r < 0.85) {
      // Twin specific
      name = `Tw1n_${base}`;
    } else {
      // Sybau specific (Shut your mouth style - short and punchy)
      name = `${base}`;
    }

    // 40% chance to leetify the whole thing
    if (Math.random() < 0.4) {
      name = leetify(name);
    }

    results.add(name);
  }

  return Array.from(results);
};
