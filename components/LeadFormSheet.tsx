import { View, Text, TextInput, Pressable, Linking, Modal, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { User, Mail, Phone, Check, X, CheckCircle } from 'lucide-react-native';
import { useState } from 'react';
import { sendLeadFormEmail } from '../services/emailService';

// ⚠️ CRITICAL: Replace with Ivan's actual WhatsApp number (format: 972XXXXXXXXX)
const OWNER_PHONE = "972528406273";

// Custom Checkbox Component
const Checkbox = ({
    label,
    checked,
    onChange
}: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}) => (
    <Pressable
        onPress={() => onChange(!checked)}
        className="flex-row-reverse items-start gap-3 mb-4 active:opacity-70"
    >
        <View className={`w-6 h-6 rounded border mt-0.5 items-center justify-center ${checked ? 'bg-[#D81B60] border-[#D81B60]' : 'border-gray-500 bg-transparent'
            }`}>
            {checked && <Check size={14} color="white" />}
        </View>
        <Text className="text-gray-300 text-sm text-right flex-1 leading-tight" style={{ writingDirection: 'rtl' }}>
            {label}
        </Text>
    </Pressable>
);

// Success Popup Component
const SuccessPopup = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
    <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={onClose}
    >
        <Pressable
            onPress={onClose}
            className="flex-1 items-center justify-center bg-black/70"
        >
            <View
                className="bg-white rounded-3xl p-8 mx-6 items-center"
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.3,
                    shadowRadius: 20,
                    elevation: 15,
                }}
            >
                {/* Success Icon */}
                <View className="bg-[#D81B60]/10 p-4 rounded-full mb-6">
                    <CheckCircle size={48} color="#D81B60" />
                </View>

                {/* Success Message */}
                <Text
                    className="text-[#1C1C1C] text-3xl font-bold text-center mb-2"
                    style={{ writingDirection: 'rtl' }}
                >
                    וזה נשלח.
                </Text>
                <Text
                    className="text-gray-500 text-lg text-center"
                    style={{ writingDirection: 'rtl' }}
                >
                    תהיו זמינים, כבר נדבר.
                </Text>

                {/* Close Button */}
                <Pressable
                    onPress={onClose}
                    className="mt-8 bg-[#D81B60] px-8 py-3 rounded-full active:opacity-80"
                >
                    <Text className="text-white text-base font-bold">
                        סגור
                    </Text>
                </Pressable>
            </View>
        </Pressable>
    </Modal>
);

interface LeadFormSheetProps {
    visible: boolean;
    onClose: () => void;
}

export default function LeadFormSheet({ visible, onClose }: LeadFormSheetProps) {
    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isOver18, setIsOver18] = useState(false);
    const [isMindsetReady, setIsMindsetReady] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Validation
    const canSubmit = name.trim() && email.trim() && phone.trim() && isOver18 && isMindsetReady;

    // Reset form
    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setIsOver18(false);
        setIsMindsetReady(false);
    };

    // Email Submission
    const handleSubmit = async () => {
        if (!canSubmit) return;

        // Send email
        await sendLeadFormEmail({ name, email, phone });

        resetForm();
        onClose();
        // Show success popup after a short delay
        setTimeout(() => setShowSuccess(true), 500);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
    };

    return (
        <>
            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
                onRequestClose={handleClose}
            >
                <View className="flex-1 justify-end bg-black/50">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <View
                            className="bg-[#1C1C1C] rounded-t-3xl"
                            style={{
                                paddingBottom: Platform.OS === 'ios' ? 34 : 24,
                            }}
                        >
                            {/* Handle Bar */}
                            <View className="items-center pt-3 pb-2">
                                <View className="w-10 h-1 bg-gray-600 rounded-full" />
                            </View>

                            {/* Close Button */}
                            <Pressable
                                onPress={handleClose}
                                className="absolute top-4 left-4 w-10 h-10 items-center justify-center rounded-full bg-white/10 active:opacity-70 z-10"
                            >
                                <X size={20} color="#FFFFFF" />
                            </Pressable>

                            <ScrollView
                                className="px-6"
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="handled"
                            >
                                {/* Header */}
                                <View className="mb-6 mt-4">
                                    <Text
                                        className="text-white text-2xl font-bold text-center"
                                        style={{ writingDirection: 'rtl' }}
                                    >
                                        השאירו פרטים, וכבר נדבר.
                                    </Text>
                                </View>

                                {/* Form Fields */}
                                <View className="gap-4">
                                    {/* Name Input */}
                                    <View className="flex-row-reverse items-center h-14 bg-[#2C2C2C] border border-gray-700 rounded-xl px-4">
                                        <User size={20} color="#6B7280" />
                                        <TextInput
                                            className="flex-1 text-white text-base px-3"
                                            style={{ textAlign: 'right', writingDirection: 'rtl' }}
                                            placeholder="שם מלא"
                                            placeholderTextColor="#6B7280"
                                            value={name}
                                            onChangeText={setName}
                                        />
                                    </View>

                                    {/* Email Input */}
                                    <View className="flex-row-reverse items-center h-14 bg-[#2C2C2C] border border-gray-700 rounded-xl px-4">
                                        <Mail size={20} color="#6B7280" />
                                        <TextInput
                                            className="flex-1 text-white text-base px-3"
                                            style={{ textAlign: 'right', writingDirection: 'rtl' }}
                                            placeholder="אימייל"
                                            placeholderTextColor="#6B7280"
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            value={email}
                                            onChangeText={setEmail}
                                        />
                                    </View>

                                    {/* Phone Input */}
                                    <View className="flex-row-reverse items-center h-14 bg-[#2C2C2C] border border-gray-700 rounded-xl px-4">
                                        <Phone size={20} color="#6B7280" />
                                        <TextInput
                                            className="flex-1 text-white text-base px-3"
                                            style={{ textAlign: 'right', writingDirection: 'rtl' }}
                                            placeholder="מס׳ טלפון"
                                            placeholderTextColor="#6B7280"
                                            keyboardType="phone-pad"
                                            value={phone}
                                            onChangeText={setPhone}
                                        />
                                    </View>
                                </View>

                                {/* Checkboxes */}
                                <View className="mt-6">
                                    <Checkbox
                                        label="אני מאשר/ת שאני מעל גיל 18."
                                        checked={isOver18}
                                        onChange={setIsOver18}
                                    />
                                    <Checkbox
                                        label="אני בא למטרת להקשיב, ללמוד ולהתחזק."
                                        checked={isMindsetReady}
                                        onChange={setIsMindsetReady}
                                    />
                                </View>

                                {/* Submit Button */}
                                <Pressable
                                    onPress={handleSubmit}
                                    disabled={!canSubmit}
                                    className={`h-14 rounded-xl items-center justify-center mt-2 mb-4 ${canSubmit ? 'bg-[#D81B60] active:opacity-80' : 'bg-gray-600'
                                        }`}
                                >
                                    <Text className="text-white text-lg font-bold">
                                        שלח פרטים
                                    </Text>
                                </Pressable>
                            </ScrollView>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Modal>

            {/* Success Popup */}
            <SuccessPopup visible={showSuccess} onClose={handleSuccessClose} />
        </>
    );
}
