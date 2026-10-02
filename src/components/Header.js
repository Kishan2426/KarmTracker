import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADIUS } from '../theme/theme';

export default function Header({ theme, isDark, onToggleTheme }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.brandRow}>
        <View style={[styles.brandDot, { backgroundColor: theme.primary }]} />
        <Text style={[styles.brandName, { color: theme.text }]}>karm tracker</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onToggleTheme}
        style={[styles.themeBtn, { backgroundColor: theme.pillBg || theme.cardDark }]}
      >
        <Ionicons
          name={isDark ? 'sunny-outline' : 'moon-outline'}
          size={16}
          color={theme.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.full,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  themeBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
