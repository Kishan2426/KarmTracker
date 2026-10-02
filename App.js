import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  StatusBar as RNStatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { COLORS } from './src/theme/theme';
import Header from './src/components/Header';
import TabBar from './src/components/TabBar';

import TodayScreen from './src/screens/TodayScreen';
import FestivalsScreen from './src/screens/FestivalsScreen';
import InsightsScreen from './src/screens/InsightsScreen';

import {
  DEFAULT_FESTIVALS,
  getUpcomingFestivals,
} from './src/constants/festivalsData';

import {
  getHabits,
  saveHabit,
  deleteHabit,
  getHabitLogs,
  toggleHabitLog,
  getDeeds,
  addDeed,
  deleteDeed,
  getCustomFestivals,
  saveCustomFestival,
  getFestivalPledges,
  saveFestivalPledge,
  toggleFestivalPledge,
  getSettings,
  saveSettings,
  getDaySummary,
  getHabitStreaks,
  getTodayDateString,
} from './src/services/storageService';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('today');
  const [isDark, setIsDark] = useState(true);

  // App Data State
  const [summary, setSummary] = useState({});
  const [habits, setHabits] = useState([]);
  const [habitLogs, setHabitLogs] = useState({});
  const [streaks, setStreaks] = useState({});
  const [deeds, setDeeds] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [pledges, setPledges] = useState([]);
  const [settings, setSettings] = useState({ theme: 'dark', eveningReminder: false });

  const theme = isDark ? COLORS.dark : COLORS.light;

  // Refresh all state from local storage
  const refreshData = useCallback(async () => {
    try {
      const todayStr = getTodayDateString();
      const [
        loadedHabits,
        loadedLogs,
        loadedDeeds,
        loadedCustomFestivals,
        loadedPledges,
        loadedSettings,
        daySum,
        streakMap,
      ] = await Promise.all([
        getHabits(),
        getHabitLogs(),
        getDeeds(),
        getCustomFestivals(),
        getFestivalPledges(),
        getSettings(),
        getDaySummary(todayStr),
        getHabitStreaks(),
      ]);

      const mergedFestivals = [...DEFAULT_FESTIVALS, ...loadedCustomFestivals];
      const sortedFestivals = getUpcomingFestivals(mergedFestivals);

      setHabits(loadedHabits);
      setHabitLogs(loadedLogs[todayStr] || {});
      setDeeds(loadedDeeds.filter((d) => d.dateStr === todayStr));
      setFestivals(sortedFestivals);
      setPledges(loadedPledges);
      setSettings(loadedSettings);
      setIsDark(loadedSettings.theme !== 'light');
      setSummary(daySum);
      setStreaks(streakMap);
    } catch (e) {
      console.error('Error during data initialization:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Handlers
  const handleToggleHabit = async (habitId) => {
    await toggleHabitLog(habitId);
    await refreshData();
  };

  const handleAddDeed = async (deedData) => {
    await addDeed(deedData);
    await refreshData();
  };

  const handleDeleteDeed = async (deedId) => {
    await deleteDeed(deedId);
    await refreshData();
  };

  const handleAddHabit = async (habitData) => {
    await saveHabit(habitData);
    await refreshData();
  };

  const handleDeleteHabit = async (habitId) => {
    await deleteHabit(habitId);
    await refreshData();
  };

  const handleSavePledge = async (pledgeData) => {
    await saveFestivalPledge(pledgeData);
    await refreshData();
  };

  const handleTogglePledge = async (pledgeId) => {
    await toggleFestivalPledge(pledgeId);
    await refreshData();
  };

  const handleAddCustomFestival = async (festData) => {
    await saveCustomFestival(festData);
    await refreshData();
  };

  const handleToggleTheme = async () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    const updatedSettings = { ...settings, theme: nextDark ? 'dark' : 'light' };
    setSettings(updatedSettings);
    await saveSettings(updatedSettings);
  };

  const handleUpdateSettings = async (newSettings) => {
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: '#181A19' }]}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#EE6838" />
        <Text style={styles.loadingSanskrit}>✦ karm tracker</Text>
        <Text style={styles.loadingSubtitle}>Opening your daily reflection...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}
        edges={['top', 'left', 'right']}
      >
        <StatusBar style={isDark ? 'light' : 'dark'} />

        {/* Top Header */}
        <Header
          theme={theme}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
        />

        {/* Active Screen Tab View */}
        <View style={styles.contentArea}>
          {activeTab === 'today' && (
            <TodayScreen
              summary={summary}
              habits={habits}
              habitLogs={habitLogs}
              streaks={streaks}
              deeds={deeds}
              onToggleHabit={handleToggleHabit}
              onAddDeed={handleAddDeed}
              onDeleteDeed={handleDeleteDeed}
              onAddHabit={handleAddHabit}
              onDeleteHabit={handleDeleteHabit}
              theme={theme}
            />
          )}

          {activeTab === 'festivals' && (
            <FestivalsScreen
              festivals={festivals}
              pledges={pledges}
              onSavePledge={handleSavePledge}
              onTogglePledge={handleTogglePledge}
              onAddCustomFestival={handleAddCustomFestival}
              theme={theme}
            />
          )}

          {activeTab === 'insights' && (
            <InsightsScreen
              summary={summary}
              habits={habits}
              streaks={streaks}
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onAddHabit={handleAddHabit}
              onDeleteHabit={handleDeleteHabit}
              theme={theme}
              isDark={isDark}
              onToggleTheme={handleToggleTheme}
            />
          )}
        </View>

        {/* Floating Bottom Tab Bar */}
        <TabBar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          theme={theme}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingSanskrit: {
    color: '#FF9933',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    letterSpacing: 0.5,
  },
  loadingSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
  },
});
