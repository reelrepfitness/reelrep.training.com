import React, { useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    withDelay,
    Easing,
    SlideInUp,
    FadeIn,
    ZoomIn,
} from 'react-native-reanimated';

interface AnimatedGradientBackgroundProps {
    colors?: string[];
    style?: any;
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
    colors = ['#D81B60', 'transparent'], // Default to Brand Pink -> Transparent
    style,
}) => {
    const { width, height } = useWindowDimensions();
    const scale = useSharedValue(1);

    useEffect(() => {
        // Breathing Loop
        scale.value = withRepeat(
            withTiming(1.2, {
                duration: 3000,
                easing: Easing.inOut(Easing.quad),
            }),
            -1,
            true // Reverse
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    // Calculate generic radius based on screen size to cover well
    const radius = Math.max(width, height) * 0.8;

    return (
        <View style={[StyleSheet.absoluteFill, { overflow: 'hidden', zIndex: -1 }, style]} pointerEvents="none">
            <Animated.View
                entering={SlideInUp.duration(1500).easing(Easing.out(Easing.quad))}
                style={[StyleSheet.absoluteFill, animatedStyle, { alignItems: 'center', justifyContent: 'flex-end' }]}
            >
                <Svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                    <Defs>
                        <RadialGradient
                            id="grad"
                            cx="50"
                            cy="100" // Bottom
                            rx="80"
                            ry="50"
                            fx="50"
                            fy="100" // Bottom
                            gradientUnits="userSpaceOnUse"
                        >
                            <Stop offset="0" stopColor={colors[0]} stopOpacity="0.4" />
                            <Stop offset="0.6" stopColor={colors[0]} stopOpacity="0.1" />
                            <Stop offset="1" stopColor="#000000" stopOpacity="0" />
                        </RadialGradient>
                    </Defs>
                    <Rect x="0" y="0" width="100" height="100" fill="url(#grad)" />
                </Svg>
            </Animated.View>
        </View>
    );
};

export default AnimatedGradientBackground;
