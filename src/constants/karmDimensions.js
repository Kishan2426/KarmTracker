export const KARM_TYPES = {
  GOOD: 'good',
  BAD: 'bad',
};

export const KARM_TYPE_CONFIG = {
  [KARM_TYPES.GOOD]: {
    id: 'good',
    label: 'Good Karm',
    sanskrit: 'Punya',
    colorKey: 'goodKarm',
    softColorKey: 'goodKarmSoft',
    description: 'Virtuous deeds, selfless thoughts, uplifting words, and compassion.',
  },
  [KARM_TYPES.BAD]: {
    id: 'bad',
    label: 'Bad Karm',
    sanskrit: 'Ashubha',
    colorKey: 'badKarm',
    softColorKey: 'badKarmSoft',
    description: 'Harmful actions, anger, deceitful speech, or negative mental patterns.',
  }
};

export const DIMENSIONS = {
  THOUGHT: 'thought',
  SPEECH: 'speech',
  ACTION: 'action',
};

export const DIMENSION_CONFIG = {
  [DIMENSIONS.THOUGHT]: {
    id: 'thought',
    label: 'Thought',
    sanskrit: 'Manasa',
    icon: 'eye-outline',
    colorKey: 'thought',
    softColorKey: 'thoughtSoft',
    description: 'Mind, intentions, meditation, forgiveness, desires, and mental clarity.',
    suggestedGood: ['Meditated / Mindful Pause', 'Forgave Someone Mentally', 'Felt Genuine Gratitude', 'Wished Well for Others'],
    suggestedBad: ['Harbored Jealousy or Envy', 'Dwelled on Anger/Grudges', 'Indulged in Greed/Lust', 'Judging Others Harshly']
  },
  [DIMENSIONS.SPEECH]: {
    id: 'speech',
    label: 'Speech',
    sanskrit: 'Vacha',
    icon: 'chatbubble-ellipses-outline',
    colorKey: 'speech',
    softColorKey: 'speechSoft',
    description: 'Words, tone, truthfulness, gossip, encouragement, and respectful talk.',
    suggestedGood: ['Spoke Truth Gently', 'Encouraged or Praised Someone', 'Practiced Silence (Mauna)', 'Listened Deeply'],
    suggestedBad: ['Lied or Exaggerated', 'Engaged in Idle Gossip', 'Used Harsh/Abusive Words', 'Interrupted or Mocked Someone']
  },
  [DIMENSIONS.ACTION]: {
    id: 'action',
    label: 'Action',
    sanskrit: 'Karmana',
    icon: 'body-outline',
    colorKey: 'action',
    softColorKey: 'actionSoft',
    description: 'Physical conduct, helping hands, charity, self-care, and routine deeds.',
    suggestedGood: ['Fed Birds / Animals / Stray', 'Helped Someone in Need (Seva)', 'Exercised / Yoga / Clean Eating', 'Donated to a Worthy Cause'],
    suggestedBad: ['Harmed a Living Being', 'Mindless Procrastination / Waste', 'Broke a Promise / Duty', 'Overindulgence / Physical Neglect']
  }
};
