import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADIUS, SHADOW } from '../theme/theme';
import { DIMENSIONS, DIMENSION_CONFIG } from '../constants/karmDimensions';

export default function DimensionChart({ dimensionBreakdown = {}, theme }) {
  const dimensions = [
    {
      key: DIMENSIONS.THOUGHT,
      ...DIMENSION_CONFIG[DIMENSIONS.THOUGHT],
    },
    {
      key: DIMENSIONS.SPEECH,
      ...DIMENSION_CONFIG[DIMENSIONS.SPEECH],
    },
    {
      key: DIMENSIONS.ACTION,
      ...DIMENSION_CONFIG[DIMENSIONS.ACTION],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.borderCream }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textDark }]}>Trikaya Karmic Balance</Text>
      </View>

      <View style={styles.barsContainer}>
        {dimensions.map((dim) => {
          const stats = dimensionBreakdown[dim.key] || { good: 0, bad: 0 };
          const good = stats.good || 0;
          const bad = stats.bad || 0;
          const total = good + bad;
          const goodPct = total > 0 ? (good / total) * 100 : 0;
          const badPct = total > 0 ? (bad / total) * 100 : 0;

          return (
            <View key={dim.key} style={styles.dimensionBlock}>
              <View style={styles.labelRow}>
                <View style={styles.dimTitleWrap}>
                  <View style={[styles.iconCircle, { backgroundColor: theme.cardElevated }]}>
                    <Ionicons name={dim.icon} size={14} color={theme.textDark} />
                  </View>
                  <Text style={[styles.dimName, { color: theme.textDark }]}>{dim.label}</Text>
                  <Text style={[styles.sanskritSub, { color: theme.textDarkMuted }]}>
                    {dim.sanskrit}
                  </Text>
                </View>

                <View style={styles.pillRow}>
                  <View style={[styles.countPill, { backgroundColor: theme.goodKarmSoft }]}>
                    <Text style={[styles.countText, { color: theme.goodKarm }]}>+{good}</Text>
                  </View>
                  <View style={[styles.countPill, { backgroundColor: theme.badKarmSoft }]}>
                    <Text style={[styles.countText, { color: theme.badKarm }]}>-{bad}</Text>
                  </View>
                </View>
              </View>

              {/* Progress split bar */}
              <View style={[styles.barTrack, { backgroundColor: theme.cardElevated }]}>
                {total > 0 && (
                  <>
                    <View
                      style={[
                        styles.barFill,
                        {
                          width: `${goodPct}%`,
                          backgroundColor: theme.goodKarm,
                          borderTopLeftRadius: RADIUS.full,
                          borderBottomLeftRadius: RADIUS.full,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.barFill,
                        {
                          width: `${badPct}%`,
                          backgroundColor: theme.badKarm,
                          borderTopRightRadius: RADIUS.full,
                          borderBottomRightRadius: RADIUS.full,
                        },
                      ]}
                    />
                  </>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    padding: SPACING.md,
    marginHorizontal: SPACING.lg,
    marginBottom: 12,
    ...SHADOW.card,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  barsContainer: {
    gap: 12,
  },
  dimensionBlock: {
    gap: 4,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dimTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dimName: {
    fontSize: 13,
    fontWeight: '700',
  },
  sanskritSub: {
    fontSize: 11,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 4,
  },
  countPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  countText: {
    fontSize: 10,
    fontWeight: '700',
  },
  barTrack: {
    height: 6,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
  },
});
