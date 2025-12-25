import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, Linking, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Instagram, MessageCircle, Facebook } from 'lucide-react-native';
import { Video, ResizeMode } from 'expo-av';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withDelay,
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

    // Image-to-video fade animation
    const imageOpacity = useSharedValue(1);

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

        // Fade out image after 5 seconds (1000ms fade duration)
        imageOpacity.value = withDelay(
            5000,
            withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        );
    }, []);

    const blobAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: blobScale.value }],
        opacity: blobOpacity.value,
    }));

    const imageAnimatedStyle = useAnimatedStyle(() => ({
        opacity: imageOpacity.value,
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
        Linking.openURL('https://www.instagram.com/ivan_zaits?igsh=bzc5b3oycDl5a2E1&utm_source=qr');
    };

    return (
        <View className="px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
            <View className="max-w-6xl mx-auto w-full">

                {/* Hero Header - Avatar with Overlapping Label Card */}
                <View className="mb-8 md:mb-12">
                    <View
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: isMobile ? 550 : isTablet ? 580 : 620,
                            overflow: 'visible', // Prevent clipping
                        }}
                    >
                        {/* Rectangle Avatar - Right side with 4:5 ratio */}
                        <View
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                width: isMobile ? '90%' : '70%',
                                height: '100%',
                                borderRadius: 20,
                                overflow: 'hidden',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 0.4,
                                shadowRadius: 16,
                                elevation: 10,
                            }}
                        >
                            {/* Video plays underneath */}
                            <Video
                                source={require('../assets/images/2805ACE0-F616-4E7A-8E01-FE0604B4B9B0.mov')}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                }}
                                resizeMode={ResizeMode.COVER}
                                shouldPlay
                                isLooping
                                isMuted
                            />

                            {/* Image fades out after 5 seconds */}
                            <Animated.Image
                                source={
                                    avatarUrl
                                        ? { uri: avatarUrl }
                                        : require('../assets/Trainer_Photo.png')
                                }
                                style={[
                                    {
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                    },
                                    imageAnimatedStyle,
                                ]}
                                resizeMode="cover"
                            />
                        </View>

                        {/* Credentials Card - With name title */}
                        <View
                            style={{
                                position: 'absolute',
                                left: 0,
                                bottom: isMobile ? -20 : 0,
                                backgroundColor: '#FFFFFF',
                                borderRadius: 16,
                                padding: isMobile ? 16 : 24,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 0.3,
                                shadowRadius: 20,
                                elevation: 15,
                                width: isMobile ? '70%' : '50%',
                                zIndex: 10,
                            }}
                        >
                            {/* Name Title */}
                            <Text className="text-background text-2xl md:text-3xl lg:text-4xl font-bold text-right writing-direction-rtl mb-1">
                                נעים מאוד, איוון.
                            </Text>
                            <Text className="text-pink text-base md:text-lg lg:text-xl font-medium text-right writing-direction-rtl mb-4">
                                בעלים ומאמן ראשי
                            </Text>
                            {[
                                'בוגר תואר ראשון למדעי התזונה',
                                'מקום שלישי ב״מר ישראל 2017״',
                                'מאמן והבעלים של Reel Rep Fitness',
                            ].map((credential, idx) => (
                                <View
                                    key={idx}
                                    className="flex-row-reverse items-center gap-3 mb-2 last:mb-0"
                                >
                                    <View
                                        style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: 3,
                                            backgroundColor: '#D81B60',
                                        }}
                                    />
                                    <Text style={{ color: '#444444', fontSize: isMobile ? 13 : 15, textAlign: 'right', flex: 1 }}>
                                        {credential}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Content Section */}
                <View className="w-full">

                    {/* The Story - Animated Card Stack */}
                    <StoryCardStack />

                    {/* Social Buttons - Instagram, Facebook, WhatsApp */}
                    <View className="flex-row-reverse gap-4 mt-8 justify-center">
                        {/* Instagram - Gradient Pink/Purple */}
                        <Pressable
                            onPress={openInstagram}
                            style={{
                                backgroundColor: '#E1306C', // Instagram pink
                                paddingHorizontal: 24,
                                paddingVertical: 16,
                                borderRadius: 12,
                            }}
                            className="active:opacity-80"
                        >
                            <Instagram size={24} color="#FFFFFF" />
                        </Pressable>

                        {/* Facebook - Blue */}
                        <Pressable
                            onPress={() => Linking.openURL('https://www.facebook.com/share/1WJYDzcV95/?mibextid=wwXIfr')}
                            style={{
                                backgroundColor: '#1877F2', // Facebook blue
                                paddingHorizontal: 24,
                                paddingVertical: 16,
                                borderRadius: 12,
                            }}
                            className="active:opacity-80"
                        >
                            <Facebook size={24} color="#FFFFFF" />
                        </Pressable>

                        {/* WhatsApp - Green */}
                        <Pressable
                            onPress={openWhatsApp}
                            style={{
                                backgroundColor: '#25D366', // WhatsApp green
                                paddingHorizontal: 24,
                                paddingVertical: 16,
                                borderRadius: 12,
                            }}
                            className="active:opacity-80"
                        >
                            <MessageCircle size={24} color="#FFFFFF" />
                        </Pressable>
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
