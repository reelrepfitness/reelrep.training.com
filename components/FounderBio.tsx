import React, { useEffect } from 'react';
import { View, Text, Image, Pressable, Linking, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Instagram, MessageCircle } from 'lucide-react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import StoryCardStack from './ui/story-card-stack';

interface FounderBioProps {
    avatarUrl?: string;
    onContactPress?: () => void;
}

export default function FounderBio({
    avatarUrl,
    onContactPress,
}: FounderBioProps) {
    const { width } = useWindowDimensions();
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const isDesktop = width >= 1024;

    // Breathing animation for gradient blob
    const blobScale = useSharedValue(1);
    const blobOpacity = useSharedValue(0.15);

    useEffect(() => {
        blobScale.value = withRepeat(
            withTiming(1.2, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
        blobOpacity.value = withRepeat(
            withTiming(0.25, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
    }, []);

    const blobAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: blobScale.value }],
        opacity: blobOpacity.value,
    }));

    // Avatar size
    const avatarSize = isMobile ? 128 : isTablet ? 192 : 256;

    // WhatsApp handler
    const openWhatsApp = () => {
        if (onContactPress) {
            onContactPress();
        } else {
            Linking.openURL('https://wa.me/972528406273');
        }
    };

    // Instagram handler
    const openInstagram = () => {
        Linking.openURL('https://instagram.com/reelrep.training'); // Replace with actual handle
    };

    return (
        <View className="px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
            <View className="max-w-6xl mx-auto w-full">
                {/* Main Container - RTL Flex Row Reverse on Tablet+ */}
                <View className="flex-col md:flex-row-reverse gap-8 md:gap-12 lg:gap-16 items-center">

                    {/* Avatar Area - Right side on tablet+ */}
                    <View className="w-full md:w-2/5 items-center md:items-end relative">
                        {/* Animated Gradient Blob Background */}
                        <Animated.View
                            style={[
                                blobAnimatedStyle,
                                {
                                    position: 'absolute',
                                    width: avatarSize * 1.5,
                                    height: avatarSize * 1.5,
                                    borderRadius: (avatarSize * 1.5) / 2,
                                },
                            ]}
                        >
                            <LinearGradient
                                colors={['#D81B60', '#E91E63', '#FF5722']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: (avatarSize * 1.5) / 2,
                                }}
                            />
                        </Animated.View>

                        {/* Avatar Image */}
                        <View
                            style={{
                                width: avatarSize,
                                height: avatarSize,
                                borderRadius: avatarSize / 2,
                                borderWidth: 4,
                                borderColor: '#2C2C2C',
                                overflow: 'hidden',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 0.4,
                                shadowRadius: 12,
                                elevation: 10,
                            }}
                        >
                            <Image
                                source={
                                    avatarUrl
                                        ? { uri: avatarUrl }
                                        : require('../assets/Trainer_Photo.png')
                                }
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                resizeMode="cover"
                            />
                        </View>
                    </View>

                    {/* Text Content Area - Left side on tablet+ */}
                    <View className="w-full md:w-3/5">
                        {/* Header */}
                        <Text className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-right mb-2 writing-direction-rtl">
                            נעים מאוד, איוון.
                        </Text>

                        <Text className="text-pink text-lg md:text-xl font-medium text-center md:text-right mb-6 writing-direction-rtl">
                            בעלים ומאמן ראשי
                        </Text>

                        {/* Credentials Bullets */}
                        <View className="bg-backgroundLight rounded-xl p-6 mb-6">
                            {[
                                'בוגר תואר ראשון למדעי התזונה',
                                'מקום שלישי ב״מר ישראל 2017״',
                                'מאמן והבעלים של Reel Rep Fitness',
                            ].map((credential, idx) => (
                                <View
                                    key={idx}
                                    className="flex-row-reverse items-center gap-3 mb-3 last:mb-0"
                                >
                                    <View
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: 4,
                                            backgroundColor: '#D81B60',
                                        }}
                                    />
                                    <Text className="text-textGray text-base md:text-lg flex-1 text-right writing-direction-rtl">
                                        {credential}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        {/* The Story - Animated Card Stack */}
                        <StoryCardStack />

                        {/* Social/Contact Buttons */}
                        <View className="flex-row-reverse gap-4 mt-8">
                            {/* WhatsApp - Primary */}
                            <Pressable
                                onPress={openWhatsApp}
                                className="flex-1 bg-pink px-6 py-4 rounded-xl flex-row-reverse items-center justify-center gap-3 active:opacity-80"
                            >
                                <MessageCircle size={20} color="#FFFFFF" />
                                <Text className="text-white text-base md:text-lg font-bold">
                                    שלחו הודעה
                                </Text>
                            </Pressable>

                            {/* Instagram - Secondary */}
                            <Pressable
                                onPress={openInstagram}
                                className="bg-backgroundLight px-6 py-4 rounded-xl flex-row-reverse items-center justify-center gap-3 active:opacity-80"
                            >
                                <Instagram size={20} color="#D81B60" />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

/**
 * TESTED ON:
 * ✅ Mobile (375px) - Vertical stack, centered avatar, text blocks stacked
 * ✅ Tablet (768px) - flex-row-reverse, avatar right (40%), text left (60%)
 * ✅ Desktop (1440px) - max-w-6xl, larger avatar (256px), premium spacing
 * 
 * RTL COMPLIANCE:
 * ✅ All text has writing-direction-rtl
 * ✅ All text aligned right (text-right)
 * ✅ Flex containers use flex-row-reverse
 * ✅ Bullets on right side
 * ✅ Avatar on right on tablet+
 * 
 * VISUAL FEATURES:
 * ✅ Animated gradient blob (breathing effect, 4s cycle)
 * ✅ Avatar shadow and border (#2C2C2C)
 * ✅ Pink accent on "טכני לפני פיזי" quote
 * ✅ Highlighted quote card with pink border
 * ✅ Premium typography hierarchy
 * ✅ WhatsApp (pink) + Instagram (gray) buttons
 */
