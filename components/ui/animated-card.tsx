import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withDelay,
    withSequence,
    Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Globe, Shield, Zap, Activity, Radio } from 'lucide-react-native';

interface AnimatedCardProps {
    title: string;
    desc: string;
}

// 1. Define FloatingIcon Sub-component
const FloatingIcon = ({ children, delay }: { children: React.ReactNode; delay: number }) => {
    const translateY = useSharedValue(0);

    useEffect(() => {
        translateY.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(-5, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
                    withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.quad) })
                ),
                -1,
                true // reverse
            )
        );
    }, [delay, translateY]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View style={animatedStyle} className="mx-2 p-3 bg-white/5 rounded-full border border-white/10">
            {children}
        </Animated.View>
    );
};

// 2. Define Beam Sub-component
const Beam = () => {
    const translateX = useSharedValue(-100); // Start off-screen (using standard logical pixels might be safer than %, but let's try % logic with a big range)

    useEffect(() => {
        // We want to animate from -100% to 100% of the parent container effectively.
        // Since the Beam view is 200% width, let's just animate a large value or use percentages if supported robustly.
        // For safer implementation in RN without knowing parent width, we can assume a large enough translation or use percentages.
        // Reanimated supports strings for translate.

        translateX.value = withRepeat(
            withTiming(100, { duration: 3000, easing: Easing.linear }),
            -1, // infinite
            false // do not reverse, just restart
        );
    }, [translateX]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: `${translateX.value}%` }],
    }));

    return (
        <Animated.View
            style={[animatedStyle, { position: 'absolute', top: 0, left: '-50%', width: '200%', height: '100%' }]}
            pointerEvents="none"
        >
            <LinearGradient
                // Transparent -> pink/cyan low opacity -> transparent
                colors={['transparent', 'rgba(236, 72, 153, 0.1)', 'rgba(6, 182, 212, 0.1)', 'transparent']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{ flex: 1 }}
            />
        </Animated.View>
    );
};

const BottomGradientOverlay = () => {
    return (
        <View className="absolute bottom-0 left-0 right-0 h-24">
            <LinearGradient
                colors={['transparent', '#2C2C2C']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
        </View>
    );
};

const IconsRow = () => {
    return (
        <View className="flex-row items-center justify-center z-10">
            <FloatingIcon delay={0}>
                <Globe size={24} color="#AFBACE" />
            </FloatingIcon>
            <FloatingIcon delay={500}>
                <Zap size={24} color="#EC4899" />
            </FloatingIcon>
            <FloatingIcon delay={200}>
                <Shield size={24} color="#06B6D4" />
            </FloatingIcon>
            <FloatingIcon delay={800}>
                <Activity size={24} color="#10B981" />
            </FloatingIcon>
            <FloatingIcon delay={300}>
                <Radio size={24} color="#F59E0B" />
            </FloatingIcon>
        </View>
    );
};

// 3. Main Component Layout
export const AnimatedCard = ({ title, desc }: AnimatedCardProps) => {
    return (
        <View className="border border-white/10 bg-[#2C2C2C] rounded-xl overflow-hidden shadow-lg shadow-black/50">
            <View className="h-60 relative overflow-hidden items-center justify-center">
                <Beam />
                <IconsRow />
                <BottomGradientOverlay />
            </View>
            <View className="p-6 items-end">
                <Text className="text-right font-bold text-white text-xl mb-2">{title}</Text>
                <Text className="text-right text-gray-400 leading-relaxed">{desc}</Text>
            </View>
        </View>
    );
};
