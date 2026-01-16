const EMOTION_KEYWORDS = {
  positive: ['thanks', 'thank you', 'grateful', 'appreciate', 'happy', 'calm', 'understand'],
  negative: ['angry', 'upset', 'mad', 'furious', 'tired', 'annoyed', 'frustrated', 'sad', 'hurt'],
  anxious: ['worried', 'anxious', 'concerned', 'nervous', 'uncertain'],
};

export const detectTone = (text = '') => {
  const lower = text.toLowerCase();
  const found = Object.entries(EMOTION_KEYWORDS).find(([, words]) =>
    words.some((word) => lower.includes(word))
  );

  if (!text.trim()) return 'neutral';
  if (!found) return 'mixed';
  const [tone] = found;
  return tone;
};

export const toneKeywords = EMOTION_KEYWORDS;
