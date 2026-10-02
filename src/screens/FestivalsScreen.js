import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FestivalCard from '../components/FestivalCard';
import FestivalPledgeModal from '../components/FestivalPledgeModal';
import CustomFestivalModal from '../components/CustomFestivalModal';
import { SPACING, RADIUS } from '../theme/theme';

export default function FestivalsScreen({
  festivals,
  pledges,
  onSavePledge,
  onTogglePledge,
  onAddCustomFestival,
  theme,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('UPCOMING'); // 'UPCOMING', 'ALL', 'PLEDGED'
  const [selectedFestivalForPledge, setSelectedFestivalForPledge] = useState(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentMonthName = today.toLocaleDateString('en-US', { month: 'short' });

  const filteredList = festivals.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.subtitle && f.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (f.tithi && f.tithi.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterType === 'UPCOMING') {
      // Keep only this month's festivals that are today or upcoming
      const [fYear, fMonth] = (f.date || '').split('-').map(Number);
      const isThisMonth = fYear === currentYear && (fMonth - 1) === currentMonth;
      return isThisMonth && f.daysUntil >= 0;
    }

    if (filterType === 'PLEDGED') {
      return pledges.some((p) => p.festivalId === f.id);
    }

    // 'ALL' returns all festivals in the annual calendar
    return true;
  });

  const totalActivePledges = pledges.filter((p) => !p.completed).length;

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Filter Bar with Meetgen pill buttons */}
        <View style={styles.topFilterBar}>
          <View style={[styles.pillBarContainer, { backgroundColor: theme.pillBg || theme.cardDark }]}>
            {[
              { id: 'UPCOMING', label: `This Month (${currentMonthName})` },
              { id: 'ALL', label: 'All Calendar' },
              { id: 'PLEDGED', label: `Pledges (${totalActivePledges})` },
            ].map((pill) => {
              const isActive = filterType === pill.id;
              return (
                <TouchableOpacity
                  key={pill.id}
                  activeOpacity={0.7}
                  onPress={() => setFilterType(pill.id)}
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

          {/* Add custom festival circular button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsCustomModalOpen(true)}
            style={[styles.addCustomCircleBtn, { backgroundColor: theme.primary }]}
          >
            <Ionicons name="add" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Search Input Bar */}
        <View style={styles.searchBarWrap}>
          <View style={[styles.searchBar, { backgroundColor: theme.cardDark, borderColor: theme.border }]}>
            <Ionicons name="search" size={17} color={theme.textMuted} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search sacred festivals & vrats..."
              placeholderTextColor={theme.textMuted}
              style={[styles.searchInput, { color: theme.text }]}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={16} color={theme.textMuted} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* Festival Cards List */}
        {filteredList.length > 0 ? (
          filteredList.map((festival) => (
            <FestivalCard
              key={festival.id}
              festival={festival}
              pledges={pledges}
              onOpenPledgeModal={(fest) => setSelectedFestivalForPledge(fest)}
              onTogglePledge={onTogglePledge}
              theme={theme}
            />
          ))
        ) : (
          <View style={[styles.emptyBox, { borderColor: theme.border }]}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No observances found matching your query.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Pledge Modal */}
      <FestivalPledgeModal
        visible={!!selectedFestivalForPledge}
        festival={selectedFestivalForPledge}
        onClose={() => setSelectedFestivalForPledge(null)}
        onSave={onSavePledge}
        theme={theme}
      />

      {/* Custom Festival Modal */}
      <CustomFestivalModal
        visible={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onSave={onAddCustomFestival}
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
  topFilterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xs,
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
  addCustomCircleBtn: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarWrap: {
    paddingHorizontal: SPACING.lg,
    marginVertical: SPACING.xs,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
  },
  emptyBox: {
    marginHorizontal: SPACING.lg,
    padding: 24,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  emptyText: {
    fontSize: 13,
  },
});
