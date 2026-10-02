import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADIUS, SHADOW } from '../theme/theme';
import {
  KARM_TYPES,
  DIMENSIONS,
  DIMENSION_CONFIG,
} from '../constants/karmDimensions';

export default function DeedLogModal({ visible, onClose, onSave, theme }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [selectedType, setSelectedType] = useState(KARM_TYPES.GOOD);
  const [selectedDimension, setSelectedDimension] = useState(DIMENSIONS.ACTION);

  const resetForm = () => {
    setTitle('');
    setNote('');
    setSelectedType(KARM_TYPES.GOOD);
    setSelectedDimension(DIMENSIONS.ACTION);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      note: note.trim(),
      type: selectedType,
      dimension: selectedDimension,
    });

    handleClose();
  };

  const currentDimConfig = DIMENSION_CONFIG[selectedDimension];
  const suggestedChips =
    selectedType === KARM_TYPES.GOOD
      ? currentDimConfig.suggestedGood
      : currentDimConfig.suggestedBad;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalOverlay}
      >
        <View style={[styles.modalSheet, { backgroundColor: theme.cardDark, borderColor: theme.border }]}>
          {/* Header */}
          <View style={styles.sheetHeader}>
            <Text style={[styles.sheetTitle, { color: theme.text }]}>Log Karmic Deed</Text>
            <TouchableOpacity onPress={handleClose} style={[styles.closeCircleBtn, { backgroundColor: theme.pillBg }]}>
              <Ionicons name="close" size={18} color={theme.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Step 1: Good or Bad Karm pills */}
            <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>
              NATURE OF DEED
            </Text>
            <View style={styles.typeSelectorRow}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSelectedType(KARM_TYPES.GOOD)}
                style={[
                  styles.typeButton,
                  {
                    backgroundColor:
                      selectedType === KARM_TYPES.GOOD ? theme.goodKarm : theme.pillBg,
                  },
                ]}
              >
                <Text style={styles.typeBtnTitle}>Good Karm (Punya)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSelectedType(KARM_TYPES.BAD)}
                style={[
                  styles.typeButton,
                  {
                    backgroundColor:
                      selectedType === KARM_TYPES.BAD ? theme.badKarm : theme.pillBg,
                  },
                ]}
              >
                <Text style={styles.typeBtnTitle}>Bad Karm (Ashubha)</Text>
              </TouchableOpacity>
            </View>

            {/* Step 2: Dimension Selector */}
            <Text style={[styles.sectionLabel, { color: theme.textSecondary, marginTop: SPACING.md }]}>
              DIMENSION
            </Text>
            <View style={styles.dimensionRow}>
              {Object.values(DIMENSION_CONFIG).map((dim) => {
                const isSelected = selectedDimension === dim.id;
                return (
                  <TouchableOpacity
                    key={dim.id}
                    activeOpacity={0.7}
                    onPress={() => setSelectedDimension(dim.id)}
                    style={[
                      styles.dimTab,
                      {
                        backgroundColor: isSelected ? theme.primary : theme.pillBg,
                      },
                    ]}
                  >
                    <Ionicons
                      name={dim.icon}
                      size={15}
                      color={isSelected ? '#FFF' : theme.textSecondary}
                    />
                    <Text
                      style={[
                        styles.dimTabLabel,
                        { color: isSelected ? '#FFF' : theme.textSecondary },
                      ]}
                    >
                      {dim.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Quick Inspiration Chips */}
            <Text style={[styles.sectionLabel, { color: theme.textSecondary, marginTop: SPACING.md }]}>
              QUICK INSPIRATIONS
            </Text>
            <View style={styles.chipWrap}>
              {suggestedChips.map((chip, idx) => (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.7}
                  onPress={() => setTitle(chip)}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: title === chip ? theme.primarySoft : theme.pillBg,
                      borderColor: title === chip ? theme.primary : 'transparent',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      { color: title === chip ? theme.primary : theme.textSecondary },
                    ]}
                  >
                    {chip}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Step 3: Title Input */}
            <Text style={[styles.sectionLabel, { color: theme.textSecondary, marginTop: SPACING.md }]}>
              DEED DESCRIPTION
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Forgave someone silently, fed stray animals..."
              placeholderTextColor={theme.textMuted}
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.pillBg,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
            />

            {/* Step 4: Optional Reflection Note */}
            <Text style={[styles.sectionLabel, { color: theme.textSecondary, marginTop: SPACING.sm }]}>
              PERSONAL REFLECTION (OPTIONAL)
            </Text>
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Mindful lessons or context..."
              placeholderTextColor={theme.textMuted}
              multiline
              numberOfLines={2}
              style={[
                styles.textArea,
                {
                  backgroundColor: theme.pillBg,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
            />

            {/* Full-width Persimmon Primary Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSave}
              disabled={!title.trim()}
              style={[
                styles.saveBtn,
                {
                  backgroundColor: title.trim() ? theme.primary : theme.pillBg,
                  opacity: title.trim() ? 1 : 0.6,
                },
              ]}
            >
              <Text style={styles.saveBtnText}>Record Karm Entry</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    borderTopWidth: 1,
    maxHeight: '88%',
    paddingBottom: Platform.OS === 'ios' ? 36 : 20,
    ...SHADOW.card,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sheetSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  closeCircleBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: SPACING.xs,
  },
  typeSelectorRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
  },
  typeEmoji: {
    fontSize: 16,
  },
  typeBtnTitle: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  dimensionRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  dimTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    gap: 6,
  },
  dimTabLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  textInput: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  textArea: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  saveBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: RADIUS.full,
    marginTop: SPACING.lg,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
