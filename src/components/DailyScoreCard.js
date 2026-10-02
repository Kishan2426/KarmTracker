import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADIUS, SHADOW } from '../theme/theme';
import { DIMENSIONS } from '../constants/karmDimensions';

export default function DailyScoreCard({ summary, theme }) {
  const { goodCount = 0, badCount = 0, balance = 0, dimensionBreakdown = {} } = summary || {};

  const total = goodCount + badCount;
  const goodRatio = total > 0 ? (goodCount / total) * 100 : 50;

  const thoughtCount =
    (dimensionBreakdown[DIMENSIONS.THOUGHT]?.good || 0) +
    (dimensionBreakdown[DIMENSIONS.THOUGHT]?.bad || 0);

  const speechCount =
    (dimensionBreakdown[DIMENSIONS.SPEECH]?.good || 0) +
    (dimensionBreakdown[DIMENSIONS.SPEECH]?.bad || 0);

  const actionCount =
    (dimensionBreakdown[DIMENSIONS.ACTION]?.good || 0) +
    (dimensionBreakdown[DIMENSIONS.ACTION]?.bad || 0);

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.borderCream }]}>
      {/* Top Header Row with status badge */}
      <View style={styles.topRow}>
        <Text style={[styles.cardTitle, { color: theme.textDark }]}>Daily Balance</Text>

        <View
          style={[
            styles.balancePill,
            {
              backgroundColor:
                balance > 0
                  ? theme.goodKarm
                  : balance < 0
                  ? theme.badKarm
                  : theme.primary,
            },
          ]}
        >
          <Text style={styles.balancePillText}>
            {balance > 0 ? `+${balance} Punya` : balance < 0 ? `${balance} Ashubha` : 'Samatva'}
          </Text>
        </View>
      </View>

      {/* Counters Display */}
      <View style={styles.countersRow}>
        <View style={[styles.counterBox, { backgroundColor: theme.cardElevated }]}>
          <Text style={[styles.counterLabel, { color: theme.textDark }]}>Good Karm</Text>
          <Text style={[styles.counterValue, { color: theme.goodKarm }]}>{goodCount}</Text>
          <Text style={[styles.counterSanskrit, { color: theme.textDarkMuted }]}>Punya</Text>
        </View>

        <View style={[styles.counterBox, { backgroundColor: theme.cardElevated }]}>
          <Text style={[styles.counterLabel, { color: theme.textDark }]}>Bad Karm</Text>
          <Text style={[styles.counterValue, { color: theme.badKarm }]}>{badCount}</Text>
          <Text style={[styles.counterSanskrit, { color: theme.textDarkMuted }]}>Ashubha</Text>
        </View>
      </View>

      {/* Ratio Progress Bar */}
      {total > 0 && (
        <View style={styles.ratioBarContainer}>
          <View style={[styles.ratioBarBg, { backgroundColor: theme.pillBg || theme.border }]}>
            <View
              style={[
                styles.goodRatioFill,
                {
                  width: `${goodRatio}%`,
                  backgroundColor: theme.goodKarm,
                },
              ]}
            />
            <View
              style={[
                styles.badRatioFill,
                {
                  width: `${100 - goodRatio}%`,
                  backgroundColor: theme.badKarm,
                },
              ]}
            />
          </View>
          <View style={styles.ratioTextRow}>
            <Text style={[styles.ratioText, { color: theme.goodKarm }]}>
              {Math.round(goodRatio)}% Virtuous
            </Text>
            <Text style={[styles.ratioText, { color: theme.badKarm }]}>
              {Math.round(100 - goodRatio)}% Inauspicious
            </Text>
          </View>
        </View>
      )}

      {/* 3 Trikaya dimensions strip */}
      <View style={[styles.dimensionStrip, { borderTopColor: theme.borderCream }]}>
        <View style={styles.dimItem}>
          <Ionicons name="eye-outline" size={13} color={theme.thought} />
          <Text style={[styles.dimText, { color: theme.textDarkMuted }]}>
            Thought: <Text style={{ color: theme.textDark, fontWeight: '700' }}>{thoughtCount}</Text>
          </Text>
        </View>

        <View style={[styles.dimDivider, { backgroundColor: theme.borderCream }]} />

        <View style={styles.dimItem}>
          <Ionicons name="chatbubble-ellipses-outline" size={13} color={theme.speech} />
          <Text style={[styles.dimText, { color: theme.textDarkMuted }]}>
            Speech: <Text style={{ color: theme.textDark, fontWeight: '700' }}>{speechCount}</Text>
          </Text>
        </View>

        <View style={[styles.dimDivider, { backgroundColor: theme.borderCream }]} />

        <View style={styles.dimItem}>
          <Ionicons name="body-outline" size={13} color={theme.action} />
          <Text style={[styles.dimText, { color: theme.textDarkMuted }]}>
            Action: <Text style={{ color: theme.textDark, fontWeight: '700' }}>{actionCount}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1.5,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
    ...SHADOW.card,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  balancePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  balancePillText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  countersRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  counterBox: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  counterLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  counterValue: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginVertical: 1,
  },
  counterSanskrit: {
    fontSize: 10,
    fontWeight: '600',
  },
  ratioBarContainer: {
    marginVertical: 4,
  },
  ratioBarBg: {
    height: 6,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  goodRatioFill: {
    height: '100%',
  },
  badRatioFill: {
    height: '100%',
  },
  ratioTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  ratioText: {
    fontSize: 10,
    fontWeight: '700',
  },
  dimensionStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    marginTop: 8,
    paddingTop: 8,
  },
  dimItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dimDivider: {
    width: 1,
    height: 12,
  },
  dimText: {
    fontSize: 11,
  },
});
