import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADIUS } from '../theme/theme';
import { KARM_TYPES, DIMENSION_CONFIG } from '../constants/karmDimensions';

export default function TimelineItem({ deed, onDelete, theme }) {
  const isGood = deed.type === KARM_TYPES.GOOD;
  const dimConfig = DIMENSION_CONFIG[deed.dimension] || DIMENSION_CONFIG.action;

  const timeFormatted = deed.timestamp
    ? new Date(deed.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.cardDark,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.leftRow}>
        {/* Orange / Emerald Mini Badge */}
        <View
          style={[
            styles.iconBadge,
            { backgroundColor: isGood ? theme.goodKarm : theme.badKarm },
          ]}
        >
          <Ionicons name={dimConfig.icon} size={15} color="#FFF" />
        </View>

        <View style={styles.textWrap}>
          <View style={styles.headerRow}>
            <Text style={[styles.typeText, { color: isGood ? theme.goodKarm : theme.badKarm }]}>
              {isGood ? 'Good Karm' : 'Bad Karm'}
            </Text>
            <Text style={[styles.timeText, { color: theme.textMuted }]}>
              {timeFormatted}
            </Text>
          </View>

          <Text style={[styles.title, { color: theme.text }]}>{deed.title}</Text>

          {deed.note ? (
            <Text style={[styles.noteText, { color: theme.textSecondary }]}>
              "{deed.note}"
            </Text>
          ) : null}
        </View>
      </View>

      {onDelete && (
        <TouchableOpacity
          onPress={() => onDelete(deed.id)}
          style={styles.deleteBtn}
          activeOpacity={0.6}
        >
          <Ionicons name="close" size={16} color={theme.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    padding: 12,
    marginBottom: 8,
    marginHorizontal: SPACING.lg,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  textWrap: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  timeText: {
    fontSize: 10,
    fontWeight: '500',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  noteText: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 3,
    lineHeight: 16,
  },
  deleteBtn: {
    padding: 6,
    marginLeft: 6,
  },
});
