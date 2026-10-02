import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SPACING, RADIUS } from '../theme/theme';

export default function TabBar({ activeTab, onSelectTab, theme }) {
  const insets = useSafeAreaInsets();

  // Generous bottom clearance ensuring the bar is completely above Android 3-button / gesture bar & iOS home indicator
  const bottomPadding = Math.max(insets.bottom, Platform.OS === 'android' ? 24 : 16) + 8;

  const tabs = [
    {
      id: 'today',
      label: 'Today',
      icon: 'sparkles',
      outlineIcon: 'sparkles-outline',
    },
    {
      id: 'festivals',
      label: 'Festivals',
      icon: 'flame',
      outlineIcon: 'flame-outline',
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: 'pie-chart',
      outlineIcon: 'pie-chart-outline',
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.tabBar,
          borderTopColor: theme.tabBarBorder,
          paddingBottom: bottomPadding,
        },
      ]}
    >
      <View style={styles.innerRow}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.7}
              onPress={() => onSelectTab(tab.id)}
              style={[
                styles.fatPillButton,
                isActive
                  ? [styles.activeFatPill, { backgroundColor: theme.primary }]
                  : [styles.inactiveFatPill, { backgroundColor: theme.pillBg || 'rgba(255,255,255,0.04)' }],
              ]}
            >
              <Ionicons
                name={isActive ? tab.icon : tab.outlineIcon}
                size={18}
                color={isActive ? '#FFFFFF' : theme.textSecondary}
              />
              <Text
                style={[
                  styles.pillText,
                  {
                    color: isActive ? '#FFFFFF' : theme.textSecondary,
                    fontWeight: isActive ? '800' : '600',
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    paddingTop: 10,
  },
  innerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    gap: 8,
  },
  fatPillButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
    gap: 6,
  },
  activeFatPill: {},
  inactiveFatPill: {
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pillText: {
    fontSize: 12,
    letterSpacing: -0.2,
  },
});
