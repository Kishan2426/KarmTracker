import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADIUS, SHADOW } from '../theme/theme';
import { KARM_TYPES, DIMENSION_CONFIG } from '../constants/karmDimensions';

export default function HabitCard({
  habit,
  isCompleted,
  streak = 0,
  onToggle,
  onDelete,
  theme,
}) {
  const isGood = habit.type === KARM_TYPES.GOOD;
  const dimConfig = DIMENSION_CONFIG[habit.dimension] || DIMENSION_CONFIG.action;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card, // Ivory Cream Card
          borderColor: isCompleted ? (isGood ? theme.goodKarm : theme.badKarm) : theme.borderCream,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onToggle}
        style={styles.touchArea}
      >
        {/* Orange / Badge on Left (like the '10 AM' badge in screenshot) */}
        <View
          style={[
            styles.badgeLeft,
            {
              backgroundColor: isCompleted
                ? (isGood ? theme.goodKarm : theme.badKarm)
                : (isGood ? theme.primary : '#333735'),
            },
          ]}
        >
          {isCompleted ? (
            <Ionicons name="checkmark" size={18} color="#FFF" />
          ) : (
            <>
              <Ionicons name={dimConfig.icon} size={15} color="#FFF" />
              <Text style={styles.badgeLeftSub}>
                {isGood ? 'PUNYA' : 'BREAK'}
              </Text>
            </>
          )}
        </View>

        {/* Content Details (Dark Charcoal typography on Cream card) */}
        <View style={styles.contentWrap}>
          <Text
            numberOfLines={1}
            style={[
              styles.habitTitle,
              {
                color: theme.textDark,
                textDecorationLine: isCompleted ? 'line-through' : 'none',
                opacity: isCompleted ? 0.6 : 1,
              },
            ]}
          >
            {habit.title}
          </Text>

          <View style={styles.metaRow}>
            {/* Dimension pill */}
            <View style={[styles.miniStatusPill, { backgroundColor: theme.cardElevated }]}>
              <Text style={[styles.miniStatusText, { color: theme.textDarkMuted }]}>
                {dimConfig.label} ({dimConfig.sanskrit.split(' ')[0]})
              </Text>
            </View>

            {/* Streak pill if > 0 */}
            {streak > 0 && (
              <View style={[styles.miniStatusPill, { backgroundColor: theme.goldSoft }]}>
                <Text style={[styles.miniStatusText, { color: theme.gold, fontWeight: '700' }]}>
                  {streak}d streak
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Right Toggle / Chevron */}
        <View style={styles.rightAction}>
          <View
            style={[
              styles.checkCircle,
              {
                borderColor: isCompleted
                  ? (isGood ? theme.goodKarm : theme.badKarm)
                  : theme.borderLight || theme.border,
                backgroundColor: isCompleted
                  ? (isGood ? theme.goodKarm : theme.badKarm)
                  : 'transparent',
              },
            ]}
          >
            {isCompleted && <Ionicons name="checkmark" size={13} color="#FFF" />}
          </View>
        </View>
      </TouchableOpacity>

      {/* Delete button */}
      {onDelete && (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onDelete}
          style={styles.deleteBtn}
        >
          <Ionicons name="close" size={15} color={theme.textDarkMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    marginBottom: 10,
    marginHorizontal: SPACING.lg,
    ...SHADOW.subtle,
  },
  touchArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badgeLeft: {
    width: 46,
    height: 46,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeLeftSub: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: '800',
    marginTop: 2,
    letterSpacing: 0.4,
  },
  contentWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  habitTitle: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  miniStatusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  miniStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  rightAction: {
    paddingLeft: 4,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtn: {
    padding: 6,
    marginLeft: 4,
  },
});
