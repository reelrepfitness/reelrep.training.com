import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
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
    { id: 1, title: 'מר ישראל', icon: Trophy, desc: 'מקום שלישי, מפתח גוף לשעבר. מכיר את הדרך.' },
    { id: 2, title: 'מדעי התזונה', icon: GraduationCap, desc: 'בוגר תואר ראשון. ידע אקדמי מבוסס.' },
    { id: 3, title: 'מתאים לכולם', icon: Users, desc: 'ממתחילים ועד אתלטים. הגישה היא שקובעת.' },
    { id: 4, title: 'טכניקה ובריאות', icon: ShieldCheck, desc: 'פדנט בתנועה. חזקים גם מחוץ למכון.' },
    { id: 5, title: 'משמעת ברזל', icon: Zap, desc: 'בלי איחורים. באים לעבוד.' }
];

// --- Constants ---
const ICON_SIZE = 64;
const SPACING = 20;
const ITEM_SIZE = ICON_SIZE + SPACING; // 84
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

            return {
                transform: [{ scale }],
                opacity,
            };
        });

        const isActive = index === activeIndex;

        return (
            <View
                style={{
                    width: ITEM_SIZE,
                    height: 140, // Scaled back to 140 since title is gone
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
                            backgroundColor: '#2C2C2C',
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.5,
                            shadowRadius: 5,
                            elevation: 10,
                            // Margin removed
                        }
                    ]}
                >
                    <item.icon
                        size={32}
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
            className="bg-[#1C1C1C] border border-white/10 rounded-2xl overflow-hidden shadow-lg shadow-black/50 mb-8"
            onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        >
            {/* 1. Visual Area (Top) */}
            <View className="h-60 relative overflow-hidden bg-neutral-900/50 justify-center items-center">

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

                {/* Fade for bottom text area transition */}
                <View className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none">
                    <LinearGradient
                        colors={['transparent', '#1C1C1C']}
                        style={{ flex: 1 }}
                    />
                </View>
            </View>

            {/* 2. Content Area (Bottom - Title & Description) */}
            <View className="px-8 pb-8 pt-2 items-center h-[120px] justify-center bg-[#1C1C1C]">
                <Animated.View
                    key={currentFeature.id} // Key change triggers animation
                    entering={FadeIn.duration(300)}
                    exiting={FadeOut.duration(200)}
                    className="w-full"
                >
                    <Text className="text-white text-2xl font-bold mb-2 text-center writing-direction-rtl">
                        {currentFeature.title}
                    </Text>
                    <Text className="text-gray-300 text-lg leading-relaxed text-center writing-direction-rtl">
                        {currentFeature.desc}
                    </Text>
                </Animated.View>
            </View>
        </View>
    );
}
