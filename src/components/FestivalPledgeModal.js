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
import { DIMENSIONS, DIMENSION_CONFIG, KARM_TYPES } from '../constants/karmDimensions';

export default function FestivalPledgeModal({
  visible,
  festival,
  onClose,
  onSave,
  theme,
}) {
  const [pledgeText, setPledgeText] = useState('');
  const [selectedDimension, setSelectedDimension] = useState(DIMENSIONS.ACTION);

  if (!festival) return null;

  const handleClose = () => {
    setPledgeText('');
    setSelectedDimension(DIMENSIONS.ACTION);
    onClose();
  };

  const handleSave = () => {
    if (!pledgeText.trim()) return;

    onSave({
      festivalId: festival.id,
      festivalName: festival.name,
      text: pledgeText.trim(),
      dimension: selectedDimension,
      type: KARM_TYPES.GOOD,
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
          {/* Header */}
          <View style={styles.dialogHeader}>
            <View>
              <Text style={[styles.dialogTitle, { color: theme.text }]}>
                Take Karmic Pledge
              </Text>
              <Text style={[styles.dialogSub, { color: theme.gold }]}>
                {festival.name}
              </Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={theme.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Suggested Pledges */}
          {festival.suggestedKarm?.length > 0 && (
            <View style={styles.suggestedWrap}>
              <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>
                SELECT FROM SUGGESTED OBSERVANCES
              </Text>
              {festival.suggestedKarm.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.7}
                  onPress={() => setPledgeText(item)}
                  style={[
                    styles.suggestedItem,
                    {
                      backgroundColor:
                        pledgeText === item ? theme.primarySoft : theme.cardElevated,
                      borderColor:
                        pledgeText === item ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <Ionicons
                    name="sparkles-outline"
                    size={14}
                    color={pledgeText === item ? theme.primary : theme.textMuted}
                  />
                  <Text
                    style={[
                      styles.suggestedItemText,
                      {
                        color:
                          pledgeText === item ? theme.primary : theme.textSecondary,
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Dimension Selector */}
          <Text style={[styles.fieldLabel, { color: theme.textSecondary, marginTop: SPACING.md }]}>
            DIMENSION
          </Text>
          <View style={styles.dimRow}>
            {Object.values(DIMENSION_CONFIG).map((dim) => {
              const isSelected = selectedDimension === dim.id;
              const dimColor = theme[dim.colorKey] || theme.primary;
              return (
                <TouchableOpacity
                  key={dim.id}
                  onPress={() => setSelectedDimension(dim.id)}
                  style={[
                    styles.dimBtn,
                    {
                      backgroundColor: isSelected
                        ? theme[dim.softColorKey] || theme.primarySoft
                        : theme.cardElevated,
                      borderColor: isSelected ? dimColor : theme.border,
                    },
                  ]}
                >
                  <Ionicons
                    name={dim.icon}
                    size={14}
                    color={isSelected ? dimColor : theme.textMuted}
                  />
                  <Text
                    style={[
                      styles.dimText,
                      { color: isSelected ? dimColor : theme.textSecondary, fontWeight: isSelected ? '700' : '500' },
                    ]}
                  >
                    {dim.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Custom Pledge Text Input */}
          <Text style={[styles.fieldLabel, { color: theme.textSecondary, marginTop: SPACING.md }]}>
            PLEDGE RESOLUTION
          </Text>
          <TextInput
            value={pledgeText}
            onChangeText={setPledgeText}
            placeholder="e.g. Observe silent meditation, fast on fruits, donate..."
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

          {/* Commit Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSave}
            disabled={!pledgeText.trim()}
            style={[
              styles.saveBtn,
              {
                backgroundColor: pledgeText.trim()
                  ? theme.primary
                  : theme.cardElevated,
              },
            ]}
          >
            <Text
              style={[
                styles.saveBtnText,
                { color: pledgeText.trim() ? '#FFF' : theme.textMuted },
              ]}
            >
              Commit to Pledge (संकल्प)
            </Text>
          </TouchableOpacity>
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
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.lg,
    ...SHADOW.card,
  },
  dialogHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  dialogTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  dialogSub: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
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
  suggestedWrap: {
    marginTop: 6,
    gap: 6,
  },
  suggestedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
  },
  suggestedItemText: {
    fontSize: 12,
    flex: 1,
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
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    borderWidth: 1,
  },
  dimText: {
    fontSize: 12,
  },
  input: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  saveBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: RADIUS.md,
    marginTop: SPACING.lg,
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
