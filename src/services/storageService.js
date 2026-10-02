import AsyncStorage from '@react-native-async-storage/async-storage';
import { KARM_TYPES, DIMENSIONS } from '../constants/karmDimensions';

const KEYS = {
  HABITS: '@karm_habits_v1',
  HABIT_LOGS: '@karm_habit_logs_v1',
  DEEDS: '@karm_deeds_v1',
  CUSTOM_FESTIVALS: '@karm_custom_festivals_v1',
  FESTIVAL_PLEDGES: '@karm_festival_pledges_v1',
  SETTINGS: '@karm_settings_v1',
};

export const INITIAL_HABITS = [
  {
    id: 'habit-1',
    title: 'Morning Meditation & Gratitude',
    type: KARM_TYPES.GOOD,
    dimension: DIMENSIONS.THOUGHT,
    icon: 'sparkles-outline',
    createdAt: Date.now(),
  },
  {
    id: 'habit-2',
    title: 'Speak Truth & Gentle Words',
    type: KARM_TYPES.GOOD,
    dimension: DIMENSIONS.SPEECH,
    icon: 'chatbubble-ellipses-outline',
    createdAt: Date.now(),
  },
  {
    id: 'habit-3',
    title: 'Feed Animals / Seva / Help Someone',
    type: KARM_TYPES.GOOD,
    dimension: DIMENSIONS.ACTION,
    icon: 'heart-outline',
    createdAt: Date.now(),
  },
  {
    id: 'habit-4',
    title: 'Mindless Doomscrolling',
    type: KARM_TYPES.BAD,
    dimension: DIMENSIONS.ACTION,
    icon: 'phone-portrait-outline',
    createdAt: Date.now(),
  },
  {
    id: 'habit-5',
    title: 'Harsh Tone / Losing Temper',
    type: KARM_TYPES.BAD,
    dimension: DIMENSIONS.SPEECH,
    icon: 'alert-circle-outline',
    createdAt: Date.now(),
  },
];

export function getTodayDateString(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// ---------------- HABITS ----------------
export async function getHabits() {
  try {
    const raw = await AsyncStorage.getItem(KEYS.HABITS);
    if (!raw) {
      await AsyncStorage.setItem(KEYS.HABITS, JSON.stringify(INITIAL_HABITS));
      return INITIAL_HABITS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading habits', e);
    return INITIAL_HABITS;
  }
}

export async function saveHabit(habit) {
  try {
    const list = await getHabits();
    const existingIndex = list.findIndex(h => h.id === habit.id);
    let updated;
    if (existingIndex >= 0) {
      updated = [...list];
      updated[existingIndex] = { ...updated[existingIndex], ...habit };
    } else {
      updated = [{ ...habit, id: habit.id || `habit-${Date.now()}`, createdAt: Date.now() }, ...list];
    }
    await AsyncStorage.setItem(KEYS.HABITS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving habit', e);
    return [];
  }
}

export async function deleteHabit(habitId) {
  try {
    const list = await getHabits();
    const filtered = list.filter(h => h.id !== habitId);
    await AsyncStorage.setItem(KEYS.HABITS, JSON.stringify(filtered));
    return filtered;
  } catch (e) {
    console.error('Error deleting habit', e);
    return [];
  }
}

// ---------------- HABIT LOGS ----------------
export async function getHabitLogs() {
  try {
    const raw = await AsyncStorage.getItem(KEYS.HABIT_LOGS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Error reading habit logs', e);
    return {};
  }
}

export async function toggleHabitLog(habitId, dateStr = getTodayDateString()) {
  try {
    const logs = await getHabitLogs();
    const dayMap = logs[dateStr] || {};
    const currentVal = !!dayMap[habitId];
    const newDayMap = { ...dayMap, [habitId]: !currentVal };
    const updatedLogs = { ...logs, [dateStr]: newDayMap };
    await AsyncStorage.setItem(KEYS.HABIT_LOGS, JSON.stringify(updatedLogs));
    return updatedLogs;
  } catch (e) {
    console.error('Error toggling habit log', e);
    return {};
  }
}

// ---------------- KARMIC DEEDS (INSTANT LOGS) ----------------
export async function getDeeds() {
  try {
    const raw = await AsyncStorage.getItem(KEYS.DEEDS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading deeds', e);
    return [];
  }
}

export async function addDeed(deed) {
  try {
    const list = await getDeeds();
    const newDeed = {
      id: deed.id || `deed-${Date.now()}`,
      title: deed.title,
      note: deed.note || '',
      type: deed.type, // 'good' or 'bad'
      dimension: deed.dimension, // 'thought', 'speech', 'action'
      category: deed.category || 'General',
      festivalId: deed.festivalId || null,
      timestamp: deed.timestamp || Date.now(),
      dateStr: deed.dateStr || getTodayDateString(),
    };
    const updated = [newDeed, ...list];
    await AsyncStorage.setItem(KEYS.DEEDS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error adding deed', e);
    return [];
  }
}

export async function deleteDeed(deedId) {
  try {
    const list = await getDeeds();
    const filtered = list.filter(d => d.id !== deedId);
    await AsyncStorage.setItem(KEYS.DEEDS, JSON.stringify(filtered));
    return filtered;
  } catch (e) {
    console.error('Error deleting deed', e);
    return [];
  }
}

// ---------------- CUSTOM FESTIVALS ----------------
export async function getCustomFestivals() {
  try {
    const raw = await AsyncStorage.getItem(KEYS.CUSTOM_FESTIVALS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading custom festivals', e);
    return [];
  }
}

export async function saveCustomFestival(fest) {
  try {
    const list = await getCustomFestivals();
    const newFest = {
      ...fest,
      id: fest.id || `custom-fest-${Date.now()}`,
      isCustom: true,
      symbol: fest.symbol || '🪔',
    };
    const updated = [newFest, ...list];
    await AsyncStorage.setItem(KEYS.CUSTOM_FESTIVALS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving custom festival', e);
    return [];
  }
}

// ---------------- FESTIVAL PLEDGES ----------------
export async function getFestivalPledges() {
  try {
    const raw = await AsyncStorage.getItem(KEYS.FESTIVAL_PLEDGES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading pledges', e);
    return [];
  }
}

export async function saveFestivalPledge(pledge) {
  try {
    const list = await getFestivalPledges();
    const newPledge = {
      id: pledge.id || `pledge-${Date.now()}`,
      festivalId: pledge.festivalId,
      festivalName: pledge.festivalName,
      text: pledge.text,
      dimension: pledge.dimension || DIMENSIONS.ACTION,
      type: pledge.type || KARM_TYPES.GOOD,
      completed: false,
      createdAt: Date.now(),
    };
    const updated = [newPledge, ...list];
    await AsyncStorage.setItem(KEYS.FESTIVAL_PLEDGES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving festival pledge', e);
    return [];
  }
}

export async function toggleFestivalPledge(pledgeId) {
  try {
    const list = await getFestivalPledges();
    const updated = list.map(p => (p.id === pledgeId ? { ...p, completed: !p.completed } : p));
    await AsyncStorage.setItem(KEYS.FESTIVAL_PLEDGES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error toggling pledge', e);
    return [];
  }
}

export async function deleteFestivalPledge(pledgeId) {
  try {
    const list = await getFestivalPledges();
    const updated = list.filter(p => p.id !== pledgeId);
    await AsyncStorage.setItem(KEYS.FESTIVAL_PLEDGES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error deleting pledge', e);
    return [];
  }
}

// ---------------- SETTINGS ----------------
export async function getSettings() {
  try {
    const raw = await AsyncStorage.getItem(KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : { theme: 'dark', eveningReminder: false };
  } catch (e) {
    return { theme: 'dark', eveningReminder: false };
  }
}

export async function saveSettings(settings) {
  try {
    await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    return settings;
  } catch (e) {
    return settings;
  }
}

// ---------------- AGGREGATION & STATS ----------------
export async function getDaySummary(dateStr = getTodayDateString()) {
  const [habits, logs, deeds] = await Promise.all([
    getHabits(),
    getHabitLogs(),
    getDeeds(),
  ]);

  const dayLogs = logs[dateStr] || {};
  const dayDeeds = deeds.filter(d => d.dateStr === dateStr);

  let goodCount = 0;
  let badCount = 0;

  const dimensionBreakdown = {
    [DIMENSIONS.THOUGHT]: { good: 0, bad: 0 },
    [DIMENSIONS.SPEECH]: { good: 0, bad: 0 },
    [DIMENSIONS.ACTION]: { good: 0, bad: 0 },
  };

  // Process completed habits for the day
  habits.forEach(h => {
    if (dayLogs[h.id]) {
      if (h.type === KARM_TYPES.GOOD) {
        goodCount++;
        if (dimensionBreakdown[h.dimension]) {
          dimensionBreakdown[h.dimension].good++;
        }
      } else {
        badCount++;
        if (dimensionBreakdown[h.dimension]) {
          dimensionBreakdown[h.dimension].bad++;
        }
      }
    }
  });

  // Process spontaneous deeds
  dayDeeds.forEach(d => {
    if (d.type === KARM_TYPES.GOOD) {
      goodCount++;
      if (dimensionBreakdown[d.dimension]) {
        dimensionBreakdown[d.dimension].good++;
      }
    } else {
      badCount++;
      if (dimensionBreakdown[d.dimension]) {
        dimensionBreakdown[d.dimension].bad++;
      }
    }
  });

  return {
    dateStr,
    goodCount,
    badCount,
    balance: goodCount - badCount,
    totalLogged: goodCount + badCount,
    dimensionBreakdown,
    dayDeeds,
    dayLogs,
    habits,
  };
}

export async function getHabitStreaks() {
  const [habits, logs] = await Promise.all([getHabits(), getHabitLogs()]);
  const habitStreaks = {};

  const today = new Date();
  
  habits.forEach(h => {
    let currentStreak = 0;
    let checkDate = new Date(today);

    // Check backwards from today
    while (true) {
      const dateStr = getTodayDateString(checkDate);
      if (logs[dateStr] && logs[dateStr][h.id]) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        // If not completed today, give benefit of checking if yesterday was active
        if (currentStreak === 0 && dateStr === getTodayDateString(today)) {
          checkDate.setDate(checkDate.getDate() - 1);
          const yesterdayStr = getTodayDateString(checkDate);
          if (logs[yesterdayStr] && logs[yesterdayStr][h.id]) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
            continue;
          }
        }
        break;
      }
    }
    habitStreaks[h.id] = currentStreak;
  });

  return habitStreaks;
}
