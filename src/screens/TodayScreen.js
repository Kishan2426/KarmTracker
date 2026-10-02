import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DailyScoreCard from '../components/DailyScoreCard';
import HabitCard from '../components/HabitCard';
import TimelineItem from '../components/TimelineItem';
import DeedLogModal from '../components/DeedLogModal';
import HabitFormModal from '../components/HabitFormModal';
import { SPACING, RADIUS } from '../theme/theme';
import { KARM_TYPES } from '../constants/karmDimensions';

export default function TodayScreen({
  summary,
  habits,
  habitLogs,
  streaks,
  deeds,
  onToggleHabit,
  onAddDeed,
  onDeleteDeed,
  onAddHabit,
  onDeleteHabit,
  theme,
}) {
  const [habitFilter, setHabitFilter] = useState('ALL'); // 'ALL', 'GOOD', 'BAD'
  const [isDeedModalOpen, setIsDeedModalOpen] = useState(false);
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);

  // Generate 5 days for the horizontal date strip (like screenshot's < 8 DEC [ 9 DEC ] 10 DEC >)
  const today = new Date();
  const dateStripDays = [-2, -1, 0, 1, 2].map((offset) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    return {
      offset,
      dayNum: d.getDate(),
      monthShort: d.toLocaleDateString('en-US', { month: 'short' }),
      isToday: offset === 0,
    };
  });

  const filteredHabits = habits.filter((h) => {
    if (habitFilter === 'GOOD') return h.type === KARM_TYPES.GOOD;
    if (habitFilter === 'BAD') return h.type === KARM_TYPES.BAD;
    return true;
  });

  const todayDeeds = deeds || [];

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Horizontal Filter Pills like [Day] Week Month in screenshot */}
        <View style={styles.pillFilterBar}>
          <View style={[styles.pillBarContainer, { backgroundColor: theme.pillBg || theme.cardDark }]}>
            {[
              { id: 'ALL', label: 'All' },
              { id: 'GOOD', label: 'Good' },
              { id: 'BAD', label: 'Bad' },
            ].map((pill) => {
              const isActive = habitFilter === pill.id;
              return (
                <TouchableOpacity
                  key={pill.id}
                  activeOpacity={0.7}
                  onPress={() => setHabitFilter(pill.id)}
                  style={[
                    styles.pillButton,
                    isActive && { backgroundColor: theme.primary },
                  ]}
                >
                  <Text
                    style={[
                      styles.pillButtonText,
                      {
                        color: isActive ? '#FFF' : theme.textSecondary,
                        fontWeight: isActive ? '700' : '500',
                      },
                    ]}
                  >
                    {pill.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Quick search/add habit icon */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsHabitModalOpen(true)}
            style={[styles.roundAddIconBtn, { backgroundColor: theme.pillBg || theme.cardDark }]}
          >
            <Ionicons name="add" size={18} color={theme.primary} />
          </TouchableOpacity>
        </View>

        {/* Date Strip Ribbon (< 8 DEC  [ 9 DEC ]  10 DEC >) */}
        <View style={styles.dateStripWrap}>
          <View style={[styles.dateStripCard, { backgroundColor: theme.cardDark, borderColor: theme.border }]}>
            <TouchableOpacity style={styles.chevronBtn}>
              <Ionicons name="chevron-back" size={16} color={theme.textMuted} />
            </TouchableOpacity>

            <View style={styles.daysRow}>
              {dateStripDays.map((item) => (
                <View
                  key={item.offset}
                  style={[
                    styles.dayCell,
                    item.isToday && { backgroundColor: theme.card, borderColor: theme.primary, borderWidth: 1.5 },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayCellNum,
                      { color: item.isToday ? theme.textDark : theme.textMuted },
                    ]}
                  >
                    {item.dayNum}
                  </Text>
                  <Text
                    style={[
                      styles.dayCellMonth,
                      { color: item.isToday ? theme.primary : theme.textMuted },
                    ]}
                  >
                    {item.monthShort}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.chevronBtn}>
              <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Score Card (Ivory Cream Card) */}
        <DailyScoreCard summary={summary} theme={theme} />

        {/* Full-width Persimmon Primary Button (like "Join Meeting" / "Get Started" in screenshot) */}
        <View style={styles.primaryBtnWrap}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsDeedModalOpen(true)}
            style={[styles.primaryActionBtn, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.primaryActionBtnText}>Log a Karmic Deed</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Habits Section Header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionHeading, { color: theme.text }]}>Routine Habits</Text>
          <Text style={[styles.sectionSubHeading, { color: theme.textSecondary }]}>
            {filteredHabits.filter(h => habitLogs[h.id]).length} / {filteredHabits.length} completed
          </Text>
        </View>

        {/* Habit Cards (Cream Cards with Orange badge like screenshot) */}
        {filteredHabits.length > 0 ? (
          filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              isCompleted={!!habitLogs[habit.id]}
              streak={streaks[habit.id] || 0}
              onToggle={() => onToggleHabit(habit.id)}
              onDelete={() => onDeleteHabit(habit.id)}
              theme={theme}
            />
          ))
        ) : (
          <View style={[styles.emptyBox, { borderColor: theme.border }]}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No habits in this category. Tap '+' above to add.
            </Text>
          </View>
        )}

        {/* Today's Spontaneous Deeds Timeline */}
        <View style={[styles.sectionHeaderRow, { marginTop: SPACING.md }]}>
          <Text style={[styles.sectionHeading, { color: theme.text }]}>Today's Logged Deeds</Text>
          <Text style={[styles.sectionSubHeading, { color: theme.textSecondary }]}>
            {todayDeeds.length} deeds
          </Text>
        </View>

        {todayDeeds.length > 0 ? (
          todayDeeds.map((deed) => (
            <TimelineItem
              key={deed.id}
              deed={deed}
              onDelete={onDeleteDeed}
              theme={theme}
            />
          ))
        ) : (
          <View style={[styles.emptyCard, { backgroundColor: theme.cardDark, borderColor: theme.border }]}>
            <Ionicons name="sparkles-outline" size={20} color={theme.primary} />
            <Text style={[styles.emptyCardText, { color: theme.textSecondary }]}>
              No deeds logged yet today.
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsDeedModalOpen(true)}
              style={styles.emptyActionLink}
            >
              <Text style={[styles.emptyActionLinkText, { color: theme.primary }]}>
                Record your first deed →
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Modals */}
      <DeedLogModal
        visible={isDeedModalOpen}
        onClose={() => setIsDeedModalOpen(false)}
        onSave={onAddDeed}
        theme={theme}
      />

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
  },
  pillFilterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    marginVertical: SPACING.xs,
  },
  pillBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    borderRadius: RADIUS.full,
  },
  pillButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  pillButtonText: {
    fontSize: 12,
  },
  roundAddIconBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateStripWrap: {
    paddingHorizontal: SPACING.lg,
    marginVertical: SPACING.xs,
  },
  dateStripCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: RADIUS.md,
    borderWidth: 1,
  },
  chevronBtn: {
    padding: 4,
  },
  daysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayCell: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
  },
  dayCellNum: {
    fontSize: 13,
    fontWeight: '800',
  },
  dayCellMonth: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  primaryBtnWrap: {
    paddingHorizontal: SPACING.lg,
    marginVertical: SPACING.sm,
  },
  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
  },
  primaryActionBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  sectionSubHeading: {
    fontSize: 12,
  },
  emptyBox: {
    marginHorizontal: SPACING.lg,
    padding: 16,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 12,
  },
  emptyCard: {
    marginHorizontal: SPACING.lg,
    padding: 18,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    alignItems: 'center',
    gap: 4,
  },
  emptyCardEmoji: {
    color: '#EE6838',
    fontSize: 18,
  },
  emptyCardText: {
    fontSize: 13,
  },
  emptyActionLink: {
    marginTop: 4,
  },
  emptyActionLinkText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
