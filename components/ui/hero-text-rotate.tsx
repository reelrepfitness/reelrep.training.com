import React, { useEffect, useState } from 'react';
import { View, Text, Platform, useWindowDimensions } from 'react-native';
import Animated, {
    FadeInDown,
    FadeOutUp,
} from 'react-native-reanimated';

interface HeroTextRotateProps {
    staticText?: string;
    suffixes?: string[];
    interval?: number;
}

/**
 * HeroTextRotate Component
 * 
 * Displays "reel rep" with an animated rotating suffix (.fitness, .plus, .training)
 * Uses staggered character animation inspired by 21dev's TextRotate component.
 * 
 * RESPONSIVE BEHAVIOR:
 * - All screen sizes: Single horizontal line (one-liner)
 *   - Mobile: Both 48px (fixed-width container, optimized to fit screen)
 *   - Desktop/Tablet: Both 96px (fixed-width container)
 * - Fixed-width container prevents "reel rep" from shifting on all devices
 * - Entire text block stays centered and stable
 * 
 * COLOR MAPPING:
 * - .fitness → White (#FFFFFF)
 * - .plus → Cyan (#5ce1e6)
 * - .training → Pink (#D81B60)
 * 
 * RTL HANDLING:
 * - Forces LTR direction since content is English
 * - Prevents dot from appearing on wrong side on Hebrew devices
 */
export function HeroTextRotate({
    staticText = 'reel rep',
    suffixes = ['.fitness', '.plus', '.training'],
    interval = 3000,
}: HeroTextRotateProps) {
    const { width } = useWindowDimensions();
    const isDesktop = width >= 768;

    const [currentIndex, setCurrentIndex] = useState(0);

    // Rotate through suffixes
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % suffixes.length);
        }, interval);

        return () => clearTimeout(timeoutId);
    }, [currentIndex, suffixes.length, interval]);

    // Split current suffix into characters for staggered animation
    const currentSuffix = suffixes[currentIndex];
    const characters = currentSuffix.split('');

    // Color mapping for each suffix
    const getSuffixColor = () => {
        if (currentSuffix === '.fitness') return '#FFFFFF'; // White
        if (currentSuffix === '.plus') return '#5ce1e6'; // Cyan
        if (currentSuffix === '.training') return '#D81B60'; // Pink
        return '#FFFFFF'; // Default white
    };

    // Shared font family - Heebo for web (supports Hebrew), Shorai Sans for native
    const fontFamily = Platform.OS === 'web'
        ? 'Heebo, Inter, -apple-system, BlinkMacSystemFont, sans-serif'
        : 'Shorai Sans';

    // Static text style
    const staticTextStyle = {
        fontFamily,
        fontWeight: '900' as const,
        letterSpacing: isDesktop ? -12 : -6, // Even tighter letter spacing
        fontSize: isDesktop ? 96 : 150,
        lineHeight: isDesktop ? 110 : 110,
        textAlign: isDesktop ? 'center' : 'left',
        textShadowColor: 'transparent', // Remove any shadow
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 0,
    } as const;

    // Animated suffix style - keep original spacing
    const animatedTextStyle = {
        fontFamily,
        fontWeight: '900' as const,
        letterSpacing: isDesktop ? -5 : -2, // Original spacing for animated suffix
        fontSize: isDesktop ? 96 : 48,
        lineHeight: isDesktop ? 110 : 60,
    };

    // Calculate fixed width for animated suffix container (based on longest word: ".training")
    // This prevents "reel rep" from shifting when the suffix changes
    const longestSuffix = suffixes.reduce((a, b) => a.length > b.length ? a : b, '');
    const charWidth = isDesktop ? 60 : 30; // Slight adjust for mobile char width
    const suffixContainerWidth = longestSuffix.length * charWidth;

    return (
        <View
            className="flex items-center justify-center px-4 md:px-8 lg:px-12"
            style={{ direction: 'ltr' }} // Force LTR for English content
        >
            <View className={isDesktop ? "flex-row items-center" : "flex-col items-start"}>
                {/* Static Text */}
                {isDesktop ? (
                    <Text
                        className="text-white font-bold text-6xl md:text-6xl lg:text-8xl text-center"
                        style={staticTextStyle}
                    >
                        {staticText}
                    </Text>
                ) : (
                    <View className="flex-col items-start">
                        <Text
                            className="text-white font-bold text-left"
                            style={{ ...staticTextStyle, lineHeight: 130, marginBottom: -30 }}
                        >
                            reel
                        </Text>
                        <Text
                            className="text-white font-bold text-left"
                            style={{ ...staticTextStyle, lineHeight: 130, paddingBottom: 10 }}
                        >
                            rep
                        </Text>
                    </View>
                )}

                {/* Animated Suffix Container - Fixed width to prevent shifting */}
                <View
                    className="flex-row overflow-hidden"
                    style={{
                        width: suffixContainerWidth, // Fixed width on all screen sizes
                        height: isDesktop ? 110 : 60,
                        alignItems: 'center',
                        justifyContent: 'flex-start', // Always start left (relative to container)
                        marginTop: isDesktop ? 0 : -20, // Negative margin to tighten spacing on mobile
                        marginLeft: isDesktop ? 0 : 2, // Slight align correction
                    }}
                >
                    {characters.map((char, index) => (
                        <Animated.Text
                            key={`word-${currentIndex}-char-${index}`}
                            entering={FadeInDown
                                .delay(index * 50)
                                .duration(400)
                            }
                            exiting={FadeOutUp.duration(200)}
                            className="font-bold"
                            style={{
                                ...animatedTextStyle,
                                color: getSuffixColor(),
                            }}
                        >
                            {char}
                        </Animated.Text>
                    ))}
                </View>
            </View>
        </View>
    );
}

// Default export for easier importing
export default HeroTextRotate;
