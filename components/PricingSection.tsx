import React from 'react';
import { View, Text, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

// --- Types ---
type PricingTier = {
    id: string;
    title: string;
    price: string;
    period: string;
    buttonText: string;
    popular: boolean;
    isPremium?: boolean;
    badge?: string;
    note?: string;
    features: string[];
};

// --- Data ---
const pricingTiers: PricingTier[] = [
    {
        id: '10-sessions',
        title: "10 אימונים",
        price: "₪699",
        period: "/ חד פעמי",
        buttonText: "רכישה מהירה",
        popular: false,
        features: [
            "גישה לכל האימונים במתחם"
        ],
        note: "* תקף לחודשיים\n* אין החזרים על כרטיסיות"
    },
    {
        id: '20-sessions',
        title: "20 אימונים",
        price: "₪1099",
        period: "/ חד פעמי",
        buttonText: "רכישה מהירה",
        popular: false,
        features: [
            "גישה לכל האימונים במתחם",
            "זכות קדימה ברשימות המתנה"
        ],
        note: "* תקף ל-3 חודשים\n* אין החזרים על כרטיסיות"
    },
    {
        id: 'elite',
        title: "reel.Elite",
        price: "₪699",
        period: "/ לחודש",
        buttonText: "הצטרפות ל-Elite",
        popular: true, // Highlight this card
        badge: "הכי משתלם",
        note: "* התחייבות ל-6 חודשים",
        features: [
            "מנוי חודשי ללא הגבלה",
            "זכות קדימה ברשימות המתנה",
            "הרשמה לאימונים 24 שעות לפני כולם",
            "אפליקציית reel rep.plus בחינם"
        ],
    },
    {
        id: 'one',
        title: "reel.ONE",
        price: "ליווי אישי",
        period: "",
        buttonText: "תיאום שיחה",
        popular: false,
        isPremium: true, // VIP
        features: [
            "כל ההטבות של מנוי Elite",
            "ליווי תזונתי צמוד (1 על 1) עם איוון",
            "פגישות וביקורות מדדים (היקפים/אחוזי שומן)",
            "התאמה אישית מלאה"
        ],
    },
];

export default function PricingSection() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768; // Simple responsive check based on width

    return (
        <ScrollView
            className="w-full bg-[#1C1C1C]"
            contentContainerStyle={{ paddingVertical: 80, paddingHorizontal: 20 }}
        >
            <View className="max-w-7xl mx-auto w-full">
                {/* Header */}
                <Text className="text-white text-3xl md:text-5xl font-bold text-center mb-16 writing-direction-rtl">
                    המסלולים שלנו
                </Text>

                {/* Grid */}
                <View className="flex-row flex-wrap justify-center gap-4" style={{ direction: 'rtl' }}>
                    {pricingTiers.map((tier, index) => {
                        // Logic to make 10/20 sessions side-by-side on mobile
                        const isSessionCard = tier.id.includes('sessions');
                        // Mobile: Sessions are 48% (side by side), others are 100%. 
                        // Desktop: MD: 48%, LG: 23% (unchanged logic for large screens really, but let's be explicit)

                        // We use a gap-4 (16px). 
                        // width calc: (100% - 16px) / 2 = ~47-48%
                        const widthClass = isSessionCard ? 'w-[47%] md:w-[48%] lg:w-[23%]' : 'w-full md:w-[48%] lg:w-[23%]';

                        return (
                            <Animated.View
                                key={tier.id}
                                entering={FadeInUp.delay(index * 100).springify()}
                                className={`
                                    ${widthClass}
                                    bg-[#2C2C2C] rounded-2xl p-6 relative
                                    ${tier.popular ? 'border-2 border-[#D81B60]' : 'border border-white/10'}
                                    ${tier.isPremium ? 'border border-[#D4AF37]/50' : ''} 
                                `}
                            >
                                {/* VIP Gradient Background Overlay (Optional/Subtle) */}
                                {tier.isPremium && (
                                    <LinearGradient
                                        colors={['rgba(212, 175, 55, 0.05)', 'transparent']}
                                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 16 }}
                                    />
                                )}

                                {/* Popular Badge */}
                                {tier.popular && tier.badge && (
                                    <View className="absolute -top-4 left-0 right-0 items-center z-10">
                                        <View className="bg-[#D81B60] px-4 py-1 rounded-full">
                                            <Text className="text-white text-xs font-bold">{tier.badge}</Text>
                                        </View>
                                    </View>
                                )}

                                {/* Title & Price */}
                                <View className="items-center mb-6 pt-2">
                                    <Text className={`text-center font-bold mb-2 ${tier.isPremium ? 'text-[#D4AF37]' : 'text-white'} ${isSessionCard ? 'text-sm' : 'text-xl'}`}>
                                        {tier.title}
                                    </Text>
                                    <View className="flex-col items-center">
                                        <Text className={`font-bold text-white ${isSessionCard ? 'text-2xl' : 'text-3xl'}`}>
                                            {tier.price}
                                        </Text>
                                        {tier.period ? (
                                            <Text className="text-gray-400 text-xs">
                                                {tier.period}
                                            </Text>
                                        ) : null}
                                    </View>
                                </View>

                                {/* Button */}
                                <Pressable
                                    className={`
                                    w-full py-3 rounded-lg mb-8 items-center
                                    ${tier.popular
                                            ? 'bg-[#D81B60]'
                                            : tier.isPremium
                                                ? 'bg-transparent border border-[#D4AF37]'
                                                : 'bg-white/10 hover:bg-white/20'
                                        }
                                `}
                                >
                                    <Text className={`font-bold ${tier.isPremium ? 'text-[#D4AF37]' : 'text-white'}`}>
                                        {tier.buttonText}
                                    </Text>
                                </Pressable>

                                {/* Features */}
                                <View className={`mb-4 ${isMobile && tier.id === '20-sessions' ? 'gap-2' : 'gap-4'}`}>
                                    {tier.features.map((feature, idx) => (
                                        <View key={idx} className="flex-row justify-end items-center space-x-3 gap-3">
                                            <View>
                                                <Check size={18} color="#4ADE80" strokeWidth={3} />
                                            </View>
                                            <Text className="text-gray-300 text-sm text-left flex-1">
                                                {feature}
                                            </Text>
                                        </View>
                                    ))}
                                </View>

                                {/* Footer Note */}
                                {tier.note && (
                                    <View className="mt-auto pt-4 border-t border-white/5">
                                        <Text className="text-xs text-gray-500 text-center leading-4">
                                            {tier.note}
                                        </Text>
                                    </View>
                                )}
                            </Animated.View>
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    );
}
