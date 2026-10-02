import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DimensionChart from '../components/DimensionChart';
import HabitFormModal from '../components/HabitFormModal';
import { SPACING, RADIUS, SHADOW } from '../theme/theme';
import { KARM_TYPES, DIMENSION_CONFIG } from '../constants/karmDimensions';

export default function InsightsScreen({
  summary,
  habits,
  streaks,
  settings,
  onUpdateSettings,
  onAddHabit,
  onDeleteHabit,
  theme,
  isDark,
  onToggleTheme,
}) {
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);

  const bestStreak = Object.values(streaks).reduce((max, s) => Math.max(max, s), 0);

  const handleToggleReminder = (val) => {
    onUpdateSettings({ ...settings, eveningReminder: val });
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Trikaya Dimension Chart */}
        <DimensionChart
          dimensionBreakdown={summary.dimensionBreakdown}
          theme={theme}
        />

        {/* Streaks Card */}
        <View style={[styles.card, { backgroundColor: theme.cardDark, borderColor: theme.border }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Habit Streaks</Text>

            <View style={[styles.streakBadge, { backgroundColor: theme.primary }]}>
              <Text style={styles.streakBadgeText}>Best: {bestStreak}d</Text>
            </View>
          </View>

          <View style={styles.streakList}>
            {habits.map((habit) => {
              const streak = streaks[habit.id] || 0;
              const isGood = habit.type === KARM_TYPES.GOOD;
              const dimConfig = DIMENSION_CONFIG[habit.dimension] || DIMENSION_CONFIG.action;

              return (
                <View key={habit.id} style={[styles.streakRow, { borderBottomColor: theme.border }]}>
                  <View
                    style={[
                      styles.initialsCircle,
                      { backgroundColor: isGood ? theme.goodKarmSoft : theme.badKarmSoft },
                    ]}
                  >
                    <Ionicons
                      name={isGood ? 'checkmark' : 'close'}
                      size={15}
                      color={isGood ? theme.goodKarm : theme.badKarm}
                    />
                  </View>

                  <View style={styles.streakInfo}>
                    <Text numberOfLines={1} style={[styles.streakHabitTitle, { color: theme.text }]}>
                      {habit.title}
                    </Text>
                    <Text style={[styles.streakHabitSub, { color: theme.textSecondary }]}>
                      {dimConfig.label} ({dimConfig.sanskrit.split(' ')[0]})
                    </Text>
                  </View>

                  {/* Status pill like [GOING] [PENDING] in screenshot */}
                  <View
                    style={[
                      styles.statusPill,
                      {
                        backgroundColor: streak > 0 ? theme.primarySoft : theme.pillBg,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusPillText,
                        { color: streak > 0 ? theme.primary : theme.textSecondary },
                      ]}
                    >
                      {streak > 0 ? `${streak}d active` : 'pending'}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Settings Navigation List like rightmost phone in screenshot */}
        <View style={[styles.card, { backgroundColor: theme.cardDark, borderColor: theme.border }]}>
          <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 12 }]}>
            Preferences
          </Text>

          {/* Theme Row */}
          <View style={[styles.settingItem, { borderBottomColor: theme.border }]}>
            <View style={styles.settingLeft}>
              <Ionicons
                name={isDark ? 'moon-outline' : 'sunny-outline'}
                size={18}
                color={theme.primary}
              />
              <View>
                <Text style={[styles.settingName, { color: theme.text }]}>Dark Zen Theme</Text>
                <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                  Warm charcoal & persimmon
                </Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={onToggleTheme}
              trackColor={{ false: '#767577', true: theme.primary }}
              thumbColor={isDark ? '#FFF' : '#f4f3f4'}
            />
          </View>

          {/* Evening Reflection Reminder */}
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={18} color={theme.primary} />
              <View>
                <Text style={[styles.settingName, { color: theme.text }]}>Daily Reflection</Text>
                <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                  Evening inquiry at 9:00 PM
                </Text>
              </View>
            </View>
            <Switch
              value={!!settings?.eveningReminder}
              onValueChange={handleToggleReminder}
              trackColor={{ false: '#767577', true: theme.primary }}
              thumbColor={settings?.eveningReminder ? '#FFF' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Full-width Persimmon Button like "Contact Support" in screenshot */}
        <View style={styles.bottomBtnWrap}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsHabitModalOpen(true)}
            style={[styles.fullWidthOrangeBtn, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.fullWidthOrangeBtnText}>+ Add New Routine Habit</Text>
          </TouchableOpacity>
          <Text style={[styles.footerSupportText, { color: theme.textMuted }]}>
            Karm Tracker • Offline & Private
          </Text>
        </View>
      </ScrollView>

      {/* Habit modal */}
      <HabitFormModal
        visible={isHabitModalOpen}
        onClose={() => setIsHabitModalOpen(false)}
        onSave={onAddHabit}
        theme={theme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingTop: SPACING.xs,
  },
  topHeader: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  headerSub: {
    fontSize: 13,
    marginTop: 2,
  },
  card: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.md,
    marginHorizontal: SPACING.lg,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  cardSub: {
    fontSize: 11,
    marginTop: 1,
  },
  streakBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  streakBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
  streakList: {
    marginTop: 4,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    gap: 12,
  },
  initialsCircle: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    fontSize: 13,
    fontWeight: '800',
  },
  streakInfo: {
    flex: 1,
  },
  streakHabitTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  streakHabitSub: {
    fontSize: 10,
    marginTop: 1,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingName: {
    fontSize: 13,
    fontWeight: '700',
  },
  settingDesc: {
    fontSize: 11,
    marginTop: 1,
  },
  bottomBtnWrap: {
    paddingHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
    alignItems: 'center',
    gap: 8,
  },
  fullWidthOrangeBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidthOrangeBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
  footerSupportText: {
    fontSize: 11,
  },
});
