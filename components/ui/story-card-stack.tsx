import React, { useState } from 'react';
import { View, Text, Pressable, useWindowDimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    Easing,
    runOnJS,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

// The 4 Hebrew narrative cards
const CARDS = [
    {
        id: 0,
        title: "הסיפור שלי",
        content: "2018 חוויתי את הפציעה החמורה הראשונה שלי, פריצת דיסק.\nהיום, אני חזק יותר מאיוון של לפני הפציעה.",
        highlight: "טכני לפני פיזי.",
        highlightPrefix: "איך? ",
    },
    {
        id: 1,
        title: "חוק מספר 1",
        content: "קודם לומדים לזוז נכון - אחר כך מעמיסים.\nלא משקולות כבדות כדי להרשים. עבודה חכמה כדי להתקדם.",
        highlight: "אסור אגו.",
        highlightPrefix: "",
    },
    {
        id: 2,
        title: "השיטה",
        content: "פה יש משמעת. יש טכניקה. יש תוצאות.",
        highlight: "אני מלמד אתכם להתאמן.",
        highlightPrefix: "כי אני לא מאמן אתכם, ",
    },
    {
        id: 3,
        title: "למי זה מתאים?",
        content: "אם אתם רוצים להיראות טוב בסלפי - לא חסר חדרי כושר בעיר.",
        highlight: "גוף שעובד בשבילכם ולא בוגד בכם בשום גיל",
        highlightPrefix: "אם אתם רוצים ",
        highlightSuffix: " - אתם במקום הנכון.",
    },
];

const SWIPE_THRESHOLD = 100; // Min distance to trigger throw
const THROW_DISTANCE = 500; // How far the card flies off

export default function StoryCardStack() {
    const { width } = useWindowDimensions();
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    const [currentIndex, setCurrentIndex] = useState(0);

    // Animation values for the top card (being swiped)
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const rotation = useSharedValue(0);

    // Go to next card
    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % CARDS.length);
    };

    // Reset card position after throw
    const resetCardPosition = () => {
        translateX.value = 0;
        translateY.value = 0;
        rotation.value = 0;
    };

    // Pan gesture for swiping
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY * 0.3; // Reduce vertical movement
            // Rotate based on horizontal movement (like tilting a card)
            rotation.value = interpolate(
                event.translationX,
                [-200, 0, 200],
                [-15, 0, 15],
                Extrapolation.CLAMP
            );
        })
        .onEnd((event) => {
            const shouldThrow = Math.abs(event.translationX) > SWIPE_THRESHOLD;

            if (shouldThrow) {
                // Throw the card off screen
                const direction = event.translationX > 0 ? 1 : -1;
                translateX.value = withTiming(
                    direction * THROW_DISTANCE,
                    { duration: 300, easing: Easing.out(Easing.cubic) },
                    () => {
                        runOnJS(goToNext)();
                        runOnJS(resetCardPosition)();
                    }
                );
                translateY.value = withTiming(event.translationY * 2, { duration: 300 });
                rotation.value = withTiming(direction * 30, { duration: 300 });
            } else {
                // Snap back to center
                translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
                translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
                rotation.value = withSpring(0, { damping: 20, stiffness: 300 });
            }
        });

    // Animated style for the top card
    const topCardAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { rotate: `${rotation.value}deg` },
        ],
    }));

    // Card dimensions
    const cardHeight = isMobile ? 260 : 300;
    const cardWidth = isMobile ? '100%' : isTablet ? 360 : 400;

    // Render a single card
    const renderCard = (card: typeof CARDS[0], isTop: boolean, stackIndex: number) => {
        // Stack offset (cards behind are smaller and offset)
        const scale = isTop ? 1 : 1 - stackIndex * 0.05;
        const yOffset = isTop ? 0 : stackIndex * 10;
        const opacity = isTop ? 1 : Math.max(0.3, 1 - stackIndex * 0.3);

        const cardContent = (
            <>
                {/* Card Title - BIG */}
                <Text className="text-pink font-black text-3xl md:text-4xl text-right mb-3 writing-direction-rtl">
                    {card.title}
                </Text>

                {/* Card Content */}
                <Text className="text-gray-200 text-base md:text-lg leading-relaxed text-right writing-direction-rtl mb-4">
                    {card.content}
                </Text>

                {/* Highlighted Quote */}
                {card.highlight && (
                    <View className="bg-background/50 rounded-lg p-3 mt-auto">
                        <Text className="text-white text-lg md:text-xl font-medium text-right writing-direction-rtl">
                            {card.highlightPrefix}
                            <Text className="text-pink font-bold">{card.highlight}</Text>
                            {card.highlightSuffix || ''}
                        </Text>
                    </View>
                )}
            </>
        );

        const cardStyle = {
            position: 'absolute' as const,
            top: yOffset,
            left: 0,
            right: 0,
            height: cardHeight,
            backgroundColor: '#2C2C2C',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: 'rgba(216, 27, 96, 0.2)',
            padding: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
            elevation: 10,
            transform: [{ scale }],
            opacity,
            zIndex: CARDS.length - stackIndex,
        };

        if (isTop) {
            return (
                <GestureDetector key={card.id} gesture={panGesture}>
                    <Animated.View style={[cardStyle, topCardAnimatedStyle]}>
                        {cardContent}
                    </Animated.View>
                </GestureDetector>
            );
        }

        return (
            <Animated.View key={card.id} style={cardStyle}>
                {cardContent}
            </Animated.View>
        );
    };

    // Get visible cards (current + next 2)
    const getVisibleCards = () => {
        const visibleCards = [];
        for (let i = 0; i < Math.min(3, CARDS.length); i++) {
            const cardIndex = (currentIndex + i) % CARDS.length;
            visibleCards.push({
                card: CARDS[cardIndex],
                isTop: i === 0,
                stackIndex: i,
            });
        }
        return visibleCards;
    };

    return (
        <View className="w-full">
            {/* Card Stack Container */}
            <View
                style={{
                    height: cardHeight + 40,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                <View
                    style={{
                        height: cardHeight,
                        width: cardWidth,
                        position: 'relative',
                    }}
                >
                    {/* Render cards in reverse order (bottom first) */}
                    {getVisibleCards()
                        .reverse()
                        .map(({ card, isTop, stackIndex }) =>
                            renderCard(card, isTop, stackIndex)
                        )}
                </View>
            </View>

            {/* Dot Indicators */}
            <View className="flex-row justify-center gap-2 mt-4">
                {CARDS.map((_, idx) => (
                    <Pressable
                        key={idx}
                        onPress={() => setCurrentIndex(idx)}
                        style={{
                            width: currentIndex === idx ? 24 : 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: currentIndex === idx ? '#D81B60' : 'rgba(255,255,255,0.3)',
                        }}
                    />
                ))}
            </View>
        </View>
    );
}

/**
 * INTERACTION:
 * ✅ Swipe left or right to throw the card away
 * ✅ Card rotates while dragging
 * ✅ Card flies off screen when threshold is reached
 * ✅ Snaps back if swipe is too short
 * ✅ Dot indicators for manual navigation
 * 
 * RTL COMPLIANCE:
 * ✅ All text has writing-direction-rtl
 * ✅ Text aligned right (text-right)
 * ✅ Hebrew content preserved exactly
 */
