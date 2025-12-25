import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, useWindowDimensions, Platform } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
    Extrapolation,
    withRepeat,
    withTiming,
    runOnJS,
    useAnimatedReaction,
    FadeIn,
    FadeOut,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Award, Trophy, GraduationCap, Users, ShieldCheck, Zap } from 'lucide-react-native';

// --- Types ---
type Feature = {
    id: number;
    title: string;
    desc: string;
    icon: any;
    uniqueKey?: string;
};

// --- Data ---
const RAW_FEATURES: Feature[] = [
    { id: 0, title: '10 שנות ניסיון', icon: Award, desc: 'ניסיון מוכח ועשיר בתחום האימון והכושר.' },
    { id: 1, title: 'מר ישראל', icon: Trophy, desc: 'מפתח גוף לשעבר, מקום שלישי לשנת 2017.\nמכיר את הדרך.' },
    { id: 2, title: 'תואר ראשון בתזונה', icon: GraduationCap, desc: 'בוגר תואר ראשון.\nידע אקדמי מבוסס.' },
    { id: 3, title: 'כושר?', icon: Users, desc: 'רמת הכושר שלכם לא מעניינת אותי.\nהגישה כן.' },
    { id: 4, title: 'טכניקה', icon: ShieldCheck, desc: 'פדנט בתנועה ובטכניקה.\nחזקים גם מחוץ למכון.' },
    { id: 5, title: 'משמעת', icon: Zap, desc: 'בלי איחורים.\nלא מתעסק עם זה.' }
];

// --- Constants ---
const ICON_SIZE = 80; // Bigger icons
const SPACING = 20;
const ITEM_SIZE = 84; // Keep same spacing (was ICON_SIZE + SPACING when ICON_SIZE was 64)
const AUTO_PLAY_INTERVAL = 4000;

export default function WhyReelRepCarousel() {
    const [containerWidth, setContainerWidth] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<Animated.FlatList<any>>(null);
    const scrollX = useSharedValue(0);

    const spacerWidth = (containerWidth - ITEM_SIZE) / 2;

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    // Real-time Index Update for instant content switching
    useAnimatedReaction(
        () => Math.round(scrollX.value / ITEM_SIZE),
        (curr, prev) => {
            if (curr !== prev) {
                runOnJS(setActiveIndex)(curr);
            }
        },
        [ITEM_SIZE]
    );

    // Auto-play logic
    useEffect(() => {
        if (containerWidth === 0) return;

        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % RAW_FEATURES.length;

            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({
                    index: nextIndex,
                    animated: true
                });
                // Explicitly update state to ensure loop progression even if onScroll is silent/throttled on Web
                setActiveIndex(nextIndex);
            }
        }, AUTO_PLAY_INTERVAL);

        return () => clearInterval(interval);
    }, [activeIndex, containerWidth]);


    const RenderItem = ({ item, index }: { item: any; index: number }) => {
        const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
        ];

        const animatedStyle = useAnimatedStyle(() => {
            const scale = interpolate(
                scrollX.value,
                inputRange,
                [0.7, 1.4, 0.7],
                Extrapolation.CLAMP
            );

            const opacity = interpolate(
                scrollX.value,
                inputRange,
                [0.15, 1, 0.15],
                Extrapolation.CLAMP
            );

            // Shadow only on active icon - subtle for 3D effect
            const shadowOpacity = interpolate(
                scrollX.value,
                inputRange,
                [0, 0.1, 0],
                Extrapolation.CLAMP
            );

            return {
                transform: [{ scale }],
                opacity,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity,
                shadowRadius: 8,
                elevation: shadowOpacity > 0.1 ? 8 : 0,
            };
        });

        return (
            <View
                style={{
                    width: ITEM_SIZE,
                    height: 140,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* Icon Container */}
                <Animated.View
                    style={[
                        animatedStyle,
                        {
                            width: ICON_SIZE,
                            height: ICON_SIZE,
                            borderRadius: ICON_SIZE / 2,
                            backgroundColor: '#FFFFFF',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }
                    ]}
                >
                    <item.icon
                        size={42}
                        color="#D81B60"
                        strokeWidth={2}
                    />
                </Animated.View>
            </View>
        );
    };

    const currentFeature = RAW_FEATURES[activeIndex % RAW_FEATURES.length] || RAW_FEATURES[0];

    return (
        <View
            style={{
                borderRadius: 24,
                overflow: 'hidden',
                marginBottom: 32,
                marginTop: 64,
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 5,
            }}
            onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        >

            {/* 1. Visual Area (Top) */}
            <View className="h-60 relative overflow-hidden justify-center items-center">

                {containerWidth > 0 ? (
                    <Animated.FlatList
                        ref={flatListRef}
                        data={RAW_FEATURES}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={ITEM_SIZE}
                        decelerationRate="fast"
                        bounces={false}
                        contentContainerStyle={{
                            paddingHorizontal: spacerWidth,
                            alignItems: 'center',
                        }}
                        onScroll={onScroll}
                        scrollEventThrottle={16}
                        style={{ flexGrow: 0 }}
                        renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
                        getItemLayout={(data, index) => ({
                            length: ITEM_SIZE,
                            offset: ITEM_SIZE * index,
                            index,
                        })}
                    />
                ) : (
                    <View style={{ height: 140 }} />
                )}
            </View>

            {/* 2. Content Area (Bottom - Title & Description) */}
            <View
                style={{
                    paddingHorizontal: 32,
                    paddingBottom: 32,
                    paddingTop: 8,
                    height: 120,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Animated.View
                    key={currentFeature.id}
                    entering={FadeIn.duration(300)}
                    exiting={FadeOut.duration(200)}
                    className="w-full"
                >
                    <Text style={{ fontSize: 34, fontWeight: '900', marginBottom: 8, textAlign: 'center', color: '#1C1C1C' }}>
                        {currentFeature.title}
                    </Text>
                    <Text style={{ fontSize: 18, textAlign: 'center', color: '#666666', lineHeight: 26 }}>
                        {currentFeature.desc}
                    </Text>
                </Animated.View>
            </View>
        </View>
    );
}
