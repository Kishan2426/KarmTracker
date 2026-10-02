import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
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

export default function HabitFormModal({ visible, onClose, onSave, theme }) {
  const [title, setTitle] = useState('');
  const [selectedType, setSelectedType] = useState(KARM_TYPES.GOOD);
  const [selectedDimension, setSelectedDimension] = useState(DIMENSIONS.ACTION);

  const handleClose = () => {
    setTitle('');
    setSelectedType(KARM_TYPES.GOOD);
    setSelectedDimension(DIMENSIONS.ACTION);
    onClose();
  };

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      type: selectedType,
      dimension: selectedDimension,
    });
    handleClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalOverlay}
      >
        <View style={[styles.dialogCard, { backgroundColor: theme.cardDark, borderColor: theme.border }]}>
          {/* Header */}
          <View style={styles.dialogHeader}>
            <Text style={[styles.dialogTitle, { color: theme.text }]}>Add Daily Habit</Text>
            <TouchableOpacity onPress={handleClose} style={[styles.closeBtn, { backgroundColor: theme.pillBg }]}>
              <Ionicons name="close" size={18} color={theme.text} />
            </TouchableOpacity>
          </View>

          {/* Habit Nature */}
          <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>
            NATURE OF HABIT
          </Text>
          <View style={styles.typeRow}>
            <TouchableOpacity
              onPress={() => setSelectedType(KARM_TYPES.GOOD)}
              style={[
                styles.typeBtn,
                {
                  backgroundColor:
                    selectedType === KARM_TYPES.GOOD ? theme.goodKarm : theme.pillBg,
                },
              ]}
            >
              <Text style={styles.btnText}>Good Karm</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedType(KARM_TYPES.BAD)}
              style={[
                styles.typeBtn,
                {
                  backgroundColor:
                    selectedType === KARM_TYPES.BAD ? theme.badKarm : theme.pillBg,
                },
              ]}
            >
              <Text style={styles.btnText}>Bad to Break</Text>
            </TouchableOpacity>
          </View>

          {/* Dimension */}
          <Text style={[styles.fieldLabel, { color: theme.textSecondary, marginTop: SPACING.md }]}>
            DIMENSION
          </Text>
          <View style={styles.dimRow}>
            {Object.values(DIMENSION_CONFIG).map((dim) => {
              const isSelected = selectedDimension === dim.id;
              return (
                <TouchableOpacity
                  key={dim.id}
                  onPress={() => setSelectedDimension(dim.id)}
                  style={[
                    styles.dimBtn,
                    {
                      backgroundColor: isSelected ? theme.primary : theme.pillBg,
                    },
                  ]}
                >
                  <Ionicons
                    name={dim.icon}
                    size={14}
                    color={isSelected ? '#FFF' : theme.textSecondary}
                  />
                  <Text
                    style={[
                      styles.dimText,
                      { color: isSelected ? '#FFF' : theme.textSecondary },
                    ]}
                  >
                    {dim.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Title */}
          <Text style={[styles.fieldLabel, { color: theme.textSecondary, marginTop: SPACING.md }]}>
            HABIT NAME
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. 15 min Pranayama, Speak truthful words..."
            placeholderTextColor={theme.textMuted}
            style={[
              styles.input,
              {
                backgroundColor: theme.pillBg,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
          />

          {/* Save Button */}
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
            <Text style={styles.saveBtnText}>Create Habit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  dialogCard: {
    width: '100%',
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: SPACING.lg,
    ...SHADOW.card,
  },
  dialogHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  typeRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
  },
  btnEmoji: {
    fontSize: 14,
  },
  btnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  dimRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  dimBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
  },
  dimText: {
    fontSize: 12,
    fontWeight: '700',
  },
  input: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
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
