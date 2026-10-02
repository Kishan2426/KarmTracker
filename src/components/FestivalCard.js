import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADIUS, SHADOW } from '../theme/theme';

export default function FestivalCard({
  festival,
  pledges = [],
  onOpenPledgeModal,
  onTogglePledge,
  theme,
}) {
  const isToday = festival.daysUntil === 0;
  const isUpcoming = festival.daysUntil > 0;

  const relevantPledges = pledges.filter((p) => p.festivalId === festival.id);

  // Split date into day & month string
  const [year, month, day] = (festival.date || '2026-10-02').split('-');
  const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  const dayNum = dateObj.getDate();
  const monthShort = dateObj.toLocaleDateString('en-US', { month: 'short' });

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.borderCream }]}>
      <View style={styles.topRow}>
        {/* Left Orange Date Badge like in screenshot calendar cards */}
        <View
          style={[
            styles.dateBadge,
            { backgroundColor: isToday ? theme.goodKarm : theme.primary },
          ]}
        >
          <Text style={styles.dateBadgeDay}>{dayNum}</Text>
          <Text style={styles.dateBadgeMonth}>{monthShort}</Text>
        </View>

        {/* Content details */}
        <View style={styles.contentWrap}>
          <View style={styles.nameRow}>
            <Text style={[styles.name, { color: theme.textDark }]}>{festival.name}</Text>
          </View>

          <Text style={[styles.subtitle, { color: theme.textDarkMuted }]}>
            {festival.subtitle}
          </Text>

          {festival.tithi && (
            <Text style={[styles.tithiText, { color: theme.primary }]}>
              {festival.tithi}
            </Text>
          )}
        </View>

        {/* Countdown Pill on Right */}
        <View
          style={[
            styles.countdownPill,
            {
              backgroundColor: isToday
                ? theme.goodKarmSoft
                : isUpcoming
                ? theme.cardElevated
                : theme.cardElevated,
            },
          ]}
        >
          <Text
            style={[
              styles.countdownText,
              { color: isToday ? theme.goodKarm : theme.textDark },
            ]}
          >
            {isToday ? 'TODAY' : isUpcoming ? `In ${festival.daysUntil}d` : 'Passed'}
          </Text>
        </View>
      </View>

      {/* Significance box */}
      {festival.significance && (
        <View style={[styles.significanceBox, { backgroundColor: theme.cardElevated }]}>
          <Text style={[styles.significanceText, { color: theme.textDark }]}>
            {festival.significance}
          </Text>
        </View>
      )}

      {/* Pledges list if any */}
      {relevantPledges.length > 0 && (
        <View style={styles.pledgesSection}>
          <Text style={[styles.pledgesHeading, { color: theme.textDarkMuted }]}>
            YOUR PLEDGES ({relevantPledges.filter(p => p.completed).length}/{relevantPledges.length})
          </Text>
          {relevantPledges.map((pledge) => (
            <TouchableOpacity
              key={pledge.id}
              activeOpacity={0.7}
              onPress={() => onTogglePledge(pledge.id)}
              style={[
                styles.pledgeItem,
                {
                  backgroundColor: pledge.completed ? theme.goodKarmSoft : theme.cardElevated,
                  borderColor: pledge.completed ? theme.goodKarm : theme.borderCream,
                },
              ]}
            >
              <Ionicons
                name={pledge.completed ? 'checkmark-circle' : 'ellipse-outline'}
                size={16}
                color={pledge.completed ? theme.goodKarm : theme.textDarkMuted}
              />
              <Text
                style={[
                  styles.pledgeText,
                  {
                    color: pledge.completed ? theme.goodKarm : theme.textDark,
                    textDecorationLine: pledge.completed ? 'line-through' : 'none',
                  },
                ]}
              >
                {pledge.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Footer CTA */}
      <View style={[styles.footerRow, { borderTopColor: theme.borderCream }]}>
        <View style={styles.suggestionWrap}>
          <Text style={[styles.hintLabel, { color: theme.textDarkMuted }]}>Observance:</Text>
          <Text numberOfLines={1} style={[styles.hintText, { color: theme.textDark }]}>
            {festival.suggestedKarm?.[0] || 'Meditate & practice selflessness'}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onOpenPledgeModal(festival)}
          style={[styles.pledgeActionBtn, { backgroundColor: theme.primary }]}
        >
          <Text style={styles.pledgeActionBtnText}>Take Pledge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    padding: SPACING.md,
    marginBottom: 12,
    marginHorizontal: SPACING.lg,
    ...SHADOW.card,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 10,
  },
  dateBadge: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBadgeDay: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 18,
  },
  dateBadgeMonth: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  contentWrap: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  symbolEmoji: {
    fontSize: 15,
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  tithiText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  countdownPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  countdownText: {
    fontSize: 10,
    fontWeight: '700',
  },
  significanceBox: {
    padding: 10,
    borderRadius: RADIUS.sm,
    marginBottom: 8,
  },
  significanceText: {
    fontSize: 12,
    lineHeight: 16,
  },
  pledgesSection: {
    marginBottom: 8,
    gap: 6,
  },
  pledgesHeading: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  pledgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
  },
  pledgeText: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 10,
    gap: 10,
  },
  suggestionWrap: {
    flex: 1,
  },
  hintLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  hintText: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
  },
  pledgeActionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  pledgeActionBtnText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
});
