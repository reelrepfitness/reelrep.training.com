import { View, Text, TextInput, Pressable, Linking } from 'react-native';
import { User, Mail, Phone, Check } from 'lucide-react-native';
import { useState } from 'react';

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

export default function LeadForm() {
    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isOver18, setIsOver18] = useState(false);
    const [isMindsetReady, setIsMindsetReady] = useState(false);

    // Validation
    const canSubmit = name.trim() && email.trim() && phone.trim() && isOver18 && isMindsetReady;

    // WhatsApp Submission
    const handleSubmit = () => {
        if (!canSubmit) return;

        const text = `
*ליד חדש מהאתר!* 🔥
------------------
👤 *שם:* ${name}
📧 *מייל:* ${email}
📱 *טלפון:* ${phone}
🔞 *18+:* מאושר
🧠 *מיינדסט:* מאושר
        `.trim();

        const url = `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(text)}`;
        Linking.openURL(url);
    };

    return (
        <View className="w-full">
            {/* Header */}
            <View className="mb-6">
                <Text
                    className="text-white text-2xl font-bold text-center"
                    style={{ writingDirection: 'rtl' }}
                >
                    השאירו פרטים, וכבר נדבר.
                </Text>
            </View>

            {/* Form Container */}
            <View className="p-2">
                {/* Form Fields */}
                <View className="gap-5">
                    {/* Name Input */}
                    <View className="flex-row-reverse items-center h-14 bg-[#1C1C1C] border border-gray-700 rounded-xl px-4">
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
                    <View className="flex-row-reverse items-center h-14 bg-[#1C1C1C] border border-gray-700 rounded-xl px-4">
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
                    <View className="flex-row-reverse items-center h-14 bg-[#1C1C1C] border border-gray-700 rounded-xl px-4">
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
                    className={`h-14 rounded-xl items-center justify-center mt-4 ${canSubmit ? 'bg-[#D81B60] active:opacity-80' : 'bg-gray-600'
                        }`}
                >
                    <Text className="text-white text-lg font-bold">
                        שלח פרטים
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
