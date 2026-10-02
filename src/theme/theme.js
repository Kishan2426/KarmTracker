export const COLORS = {
  // Meetgen Warm Dark Palette (Default)
  dark: {
    background: '#181A19', // Warm Charcoal
    card: '#232624', // Elevated dark charcoal
    cardDark: '#232624', // Elevated dark card
    cardElevated: '#2C302D', // Inner elevated container
    border: '#2E322F',
    borderLight: '#3D423E',
    borderCream: '#2E322F',
    text: '#FFFFFF', // Off-white for dark surfaces
    textDark: '#FFFFFF', // Consistent crisp typography on cards
    textSecondary: '#9A9F9A',
    textMuted: '#686D68',
    textDarkMuted: '#9A9F9A',
    primary: '#EE6838', // Vibrant Persimmon Orange
    primarySoft: 'rgba(238, 104, 56, 0.15)',
    primaryHover: '#D95829',
    gold: '#E5A93C',
    goldSoft: 'rgba(229, 169, 60, 0.16)',
    goodKarm: '#2E9D61', // Forest Jade
    goodKarmSoft: 'rgba(46, 157, 97, 0.14)',
    badKarm: '#E04848', // Warm Coral Red
    badKarmSoft: 'rgba(224, 72, 72, 0.14)',
    thought: '#805AD5',
    thoughtSoft: 'rgba(128, 90, 213, 0.14)',
    speech: '#319795',
    speechSoft: 'rgba(49, 151, 149, 0.14)',
    action: '#EE6838',
    actionSoft: 'rgba(238, 104, 56, 0.14)',
    tabBar: '#141615',
    tabBarBorder: '#232624',
    pillBg: '#282C29',
    pillActive: '#EE6838',
  },
  // Warm Sand Paper Palette
  light: {
    background: '#F6F4EC',
    card: '#FFFFFF',
    cardDark: '#EAE6DC',
    cardElevated: '#F0ECE1',
    border: '#E2DDCF',
    borderLight: '#ECE7DB',
    borderCream: '#D8D2C2',
    text: '#1A1C19',
    textDark: '#1A1C19',
    textSecondary: '#6B706A',
    textMuted: '#8F948E',
    textDarkMuted: '#8F948E',
    primary: '#EE6838',
    primarySoft: 'rgba(238, 104, 56, 0.12)',
    primaryHover: '#D95829',
    gold: '#D49226',
    goldSoft: 'rgba(212, 146, 38, 0.12)',
    goodKarm: '#23834F',
    goodKarmSoft: 'rgba(35, 131, 79, 0.12)',
    badKarm: '#CF3B3B',
    badKarmSoft: 'rgba(207, 59, 59, 0.12)',
    thought: '#6B46C1',
    thoughtSoft: 'rgba(107, 70, 193, 0.12)',
    speech: '#287775',
    speechSoft: 'rgba(40, 119, 117, 0.12)',
    action: '#EE6838',
    actionSoft: 'rgba(238, 104, 56, 0.12)',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E6E1D4',
    pillBg: '#EAE6DC',
    pillActive: '#EE6838',
  }
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  xxl: 36,
};

export const RADIUS = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  full: 999,
};

export const SHADOW = {
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  }
};
