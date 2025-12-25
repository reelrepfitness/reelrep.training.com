import React from 'react';
import { View, Text, ScrollView, Pressable, useWindowDimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

// --- Types ---
type PricingTier = {
    id: string;
    title: string;
    price: string;
    originalPrice?: string;
    period: string;
    buttonText: string;
    popular: boolean;
    isPremium?: boolean;
    badge?: string;
    badge2?: string;
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
        badge: "70₪ לאימון",
        features: [
            "גישה לכל האימונים במתחם"
        ],
        note: "* תקף לחודשיים\n* אין החזרים על כרטיסיות"
    },
    {
        id: '20-sessions',
        title: "20 אימונים",
        price: "₪1199",
        originalPrice: "₪1399",
        period: "/ חד פעמי",
        buttonText: "רכישה מהירה",
        popular: false,
        badge: "55₪ לאימון",
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
            "מנוי חודשי ללא הגבלה",
            "זכות קדימה ברשימות המתנה",
            "הרשמה לאימונים 24 שעות לפני כולם",
            "אפליקציית reel rep.plus בחינם",
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
        <View
            className="w-full bg-[#1C1C1C]"
            style={{
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                marginTop: -40,
                marginBottom: 20,
                paddingTop: 60,
                paddingBottom: 80,
                paddingHorizontal: 20,
                position: 'relative',
                zIndex: 10,
                overflow: 'hidden',
            }}
        >
            <View className="max-w-7xl mx-auto w-full">
                {/* Header */}
                {/* Header */}
                <Text style={{ fontSize: 34, fontWeight: '900', textAlign: 'center', color: '#FFFFFF', marginBottom: 48, writingDirection: 'rtl' }}>
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
                            <React.Fragment key={tier.id}>
                                {/* Divider after session cards (after 20 sessions, before Elite) */}
                                {index === 2 && (
                                    <View className="w-full h-px bg-white/10 my-8" />
                                )}

                                <Animated.View
                                    entering={FadeInUp.delay(index * 100).springify()}
                                    className={`
                                        ${widthClass}
                                        bg-[#2C2C2C] rounded-2xl ${tier.id === 'elite' || tier.id === 'one' ? 'px-4 pt-12 pb-6' : 'p-6'} relative
                                        ${tier.popular ? 'border-2 border-[#D81B60]' : 'border border-white/10'}
                                        ${tier.isPremium ? 'border border-[#D4AF37]/50' : ''} 
                                    `}
                                    style={{ overflow: 'visible' }}
                                >
                                    {/* VIP Gradient Background Overlay (Optional/Subtle) */}
                                    {tier.isPremium && (
                                        <LinearGradient
                                            colors={['rgba(212, 175, 55, 0.05)', 'transparent']}
                                            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 16 }}
                                        />
                                    )}

                                    {/* Badge - Shows for any card with badge property */}
                                    {tier.badge && (
                                        <View className={`absolute -top-4 ${tier.popular ? 'left-0 right-0 items-center' : 'right-4'} z-10`}>
                                            <View className={`${tier.popular ? 'bg-[#D81B60]' : 'bg-white'} px-4 py-1 rounded-full`}>
                                                <Text className={`${tier.popular ? 'text-white' : 'text-[#1C1C1C]'} text-xs font-bold`}>
                                                    {tier.badge}
                                                </Text>
                                            </View>
                                        </View>
                                    )}

                                    {/* Second Badge (for 20 sessions discount) */}
                                    {tier.badge2 && (
                                        <View className="absolute -top-4 left-4 z-10">
                                            <View className="bg-pink px-4 py-1 rounded-full">
                                                <Text className="text-white text-xs font-bold">
                                                    {tier.badge2}
                                                </Text>
                                            </View>
                                        </View>
                                    )}

                                    {/* Title & Price */}
                                    <View className="items-center mb-6 pt-2">
                                        <Text
                                            className={`text-center font-black mb-2 ${tier.isPremium ? 'text-[#D4AF37]' : 'text-white'} text-2xl md:text-xl`}
                                            style={{
                                                fontSize: width < 768
                                                    ? (tier.id === 'elite' || tier.id === 'one' ? 50 : 22)
                                                    : undefined,
                                                lineHeight: width < 768 && (tier.id === 'elite' || tier.id === 'one') ? 60 : undefined
                                            }}
                                        >
                                            {tier.title}
                                        </Text>
                                        <View className="flex-col items-center">
                                            {/* Current price */}
                                            <View className="flex-row items-end gap-1">
                                                {tier.price.includes('₪') ? (
                                                    <>
                                                        <Text
                                                            className={`font-bold text-white ${isSessionCard ? 'text-2xl' : 'text-3xl'}`}
                                                            style={{ fontSize: isSessionCard ? 17 : 21 }}
                                                        >
                                                            ₪
                                                        </Text>
                                                        <Text className={`font-bold text-white ${isSessionCard ? 'text-2xl' : 'text-3xl'}`}>
                                                            {tier.price.replace('₪', '')}
                                                        </Text>
                                                    </>
                                                ) : (
                                                    <Text className={`font-bold text-white ${isSessionCard ? 'text-2xl' : 'text-3xl'}`}>
                                                        {tier.price}
                                                    </Text>
                                                )}
                                            </View>
                                            {tier.period ? (
                                                <Text className="text-gray-400 text-xs">
                                                    {tier.period}
                                                </Text>
                                            ) : null}
                                        </View>

                                        {/* Button for reel.ONE */}
                                        {tier.id === 'one' && (
                                            <Pressable className="mt-4 px-6 py-3 border-2 border-[#D4AF37] rounded-xl active:opacity-70">
                                                <Text className="text-[#D4AF37] text-base font-bold text-center" style={{ fontFamily: 'Shorai Sans' }}>
                                                    לתיאום שיחה
                                                </Text>
                                            </Pressable>
                                        )}
                                    </View>

                                    {/* Features */}
                                    <View className={`mb-4 ${isMobile && tier.id === '20-sessions' ? 'gap-2' : 'gap-4'}`}>
                                        {tier.features.map((feature, idx) => {
                                            // Check if feature contains "reel rep.plus" and replace with logo
                                            const hasReelRepPlus = feature.includes('reel rep.plus');

                                            if (hasReelRepPlus) {
                                                const parts = feature.split('reel rep.plus');
                                                return (
                                                    <View key={idx} className="flex-row justify-end items-center space-x-3 gap-3">
                                                        <View>
                                                            <Check size={18} color="#4ADE80" strokeWidth={3} />
                                                        </View>
                                                        <View className="flex-1 flex-row items-center justify-start gap-1">
                                                            <Text className="text-gray-300 text-sm">
                                                                {parts[0]}
                                                            </Text>
                                                            <Image
                                                                source={require('../assets/images/reelrep-plus-white.png')}
                                                                style={{ width: 80, height: 16 }}
                                                                resizeMode="contain"
                                                            />
                                                            <Text className="text-gray-300 text-sm">
                                                                {parts[1]}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                );
                                            }

                                            return (
                                                <View key={idx} className="flex-row justify-end items-center space-x-3 gap-3">
                                                    <View>
                                                        <Check size={18} color="#4ADE80" strokeWidth={3} />
                                                    </View>
                                                    <Text className="text-gray-300 text-sm text-left flex-1">
                                                        {feature}
                                                    </Text>
                                                </View>
                                            );
                                        })}
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
                            </React.Fragment>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}
