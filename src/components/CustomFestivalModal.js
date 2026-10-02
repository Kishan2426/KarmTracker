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
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, RADIUS, SHADOW } from '../theme/theme';

export default function CustomFestivalModal({ visible, onClose, onSave, theme }) {
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [date, setDate] = useState('');
  const [tithi, setTithi] = useState('');
  const [significance, setSignificance] = useState('');

  const handleClose = () => {
    setName('');
    setSubtitle('');
    setDate('');
    setTithi('');
    setSignificance('');
    onClose();
  };

  const handleSave = () => {
    if (!name.trim() || !date.trim()) return;

    onSave({
      name: name.trim(),
      subtitle: subtitle.trim() || 'Custom Sacred Observance',
      date: date.trim(), // YYYY-MM-DD
      tithi: tithi.trim() || 'Personal Vrat',
      significance: significance.trim() || 'Self-reflection, prayer, and virtuous karm.',
      suggestedKarm: ['Perform selfless service', 'Observe mindful contemplation'],
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
        <View style={[styles.dialogCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.dialogHeader}>
            <Text style={[styles.dialogTitle, { color: theme.text }]}>
              Add Custom Festival or Vrat
            </Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={theme.textMuted} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

            {/* Name */}
            <Text style={[styles.fieldLabel, { color: theme.textSecondary, marginTop: SPACING.md }]}>
              FESTIVAL OR VRAT NAME *
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Satyanarayan Vrat, Guru Purnima..."
              placeholderTextColor={theme.textMuted}
              style={[
                styles.input,
                {
                  backgroundColor: theme.cardElevated,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
            />

            {/* Date YYYY-MM-DD */}
            <Text style={[styles.fieldLabel, { color: theme.textSecondary, marginTop: SPACING.md }]}>
              DATE (YYYY-MM-DD) *
            </Text>
            <TextInput
              value={date}
              onChangeText={setDate}
              placeholder="e.g. 2026-11-15"
              placeholderTextColor={theme.textMuted}
              style={[
                styles.input,
                {
                  backgroundColor: theme.cardElevated,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
            />

            {/* Subtitle / Tithi */}
            <Text style={[styles.fieldLabel, { color: theme.textSecondary, marginTop: SPACING.md }]}>
              TITHI / TRADITION (OPTIONAL)
            </Text>
            <TextInput
              value={tithi}
              onChangeText={setTithi}
              placeholder="e.g. Shukla Paksha Ekadashi"
              placeholderTextColor={theme.textMuted}
              style={[
                styles.input,
                {
                  backgroundColor: theme.cardElevated,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
            />

            {/* Significance */}
            <Text style={[styles.fieldLabel, { color: theme.textSecondary, marginTop: SPACING.md }]}>
              SIGNIFICANCE OR INTENTION
            </Text>
            <TextInput
              value={significance}
              onChangeText={setSignificance}
              placeholder="Spiritual meaning or vow taken..."
              placeholderTextColor={theme.textMuted}
              multiline
              numberOfLines={2}
              style={[
                styles.textArea,
                {
                  backgroundColor: theme.cardElevated,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
            />

            {/* Save */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSave}
              disabled={!name.trim() || !date.trim()}
              style={[
                styles.saveBtn,
                {
                  backgroundColor: name.trim() && date.trim() ? theme.primary : theme.cardElevated,
                },
              ]}
            >
              <Text
                style={[
                  styles.saveBtnText,
                  { color: name.trim() && date.trim() ? '#FFF' : theme.textMuted },
                ]}
              >
                Add to Calendar
              </Text>
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
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  dialogCard: {
    width: '100%',
    maxHeight: '85%',
    borderRadius: RADIUS.lg,
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
    fontSize: 17,
    fontWeight: '800',
  },
  closeBtn: {
    padding: 2,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  emojiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emojiBtn: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiText: {
    fontSize: 20,
  },
  input: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  textArea: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    minHeight: 50,
  },
  saveBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: RADIUS.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
