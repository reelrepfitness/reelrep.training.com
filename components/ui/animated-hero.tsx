import React, { useEffect } from "react";
import { View, Text, useWindowDimensions, Platform, Linking, Pressable } from "react-native";
import { Image } from 'expo-image';
import { MoveRight, PhoneCall } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import HeroTextRotate from "@/components/ui/hero-text-rotate";
import TypewriterEffect from "@/components/ui/typewriter-effect";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';


function AnimatedHero() {
    const { width, height } = useWindowDimensions();
    const isDesktop = width >= 768; // md breakpoint

    const typewriterWords = [
        { text: "אנחנו", className: "text-white" },
        { text: "מבטיחים", className: "text-white" },
        { text: "שינוי.", className: "text-pink" }, // Highlight "Change" in pink
    ];

    // Breathing animation for scroll indicator
    const breatheScale = useSharedValue(1);
    const breatheOpacity = useSharedValue(0.4);

    useEffect(() => {
        breatheScale.value = withRepeat(
            withTiming(1.3, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
            -1, // Infinite
            true // Reverse
        );
        breatheOpacity.value = withRepeat(
            withTiming(0.8, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
    }, []);

    const breatheStyle = useAnimatedStyle(() => ({
        transform: [{ scaleX: breatheScale.value }],
        opacity: breatheOpacity.value,
    }));

    return (
        <View className="w-full min-h-screen max-w-7xl mx-auto px-4 justify-center pt-56 md:pt-32 pb-12">
            <View className="flex gap-8 items-center justify-center flex-col">
                <View className="flex gap-4 flex-col items-center">
                    <View className="flex-col items-center justify-center">

                        {/* Hero Text Rotate - Replaces static header + animated Hebrew words */}
                        <HeroTextRotate
                            staticText="reel rep"
                            suffixes={['.fitness', '.plus', '.training']}
                            interval={3000}
                        />
                    </View>

                    {/* Lower Section - Divider + Typewriter + Buttons */}
                    <View className="flex-col items-center gap-8">
                        {/* Divider (hidden but keeps spacing) */}
                        <View className="w-16 h-1.5 bg-transparent rounded-full mt-24 mb-2" />

                        {/* Typewriter Effect - "We don't promise magic, we promise change" */}
                        <TypewriterEffect
                            words={typewriterWords}
                            staticText="אנחנו לא מבטיחים קסמים."
                            className="my-8"
                        />

                        {/* CTA Buttons */}
                        <View className="flex flex-row-reverse gap-3">
                            {/* Primary Button - Schedule Training */}
                            <Button
                                size="lg"
                                style={{ gap: 8 }}
                            >
                                <Text className="text-white font-medium">לקביעת אימון</Text>
                                <MoveRight size={16} color="#FFF" />
                            </Button>

                            {/* Secondary Button - Contact */}
                            <Button
                                size="lg"
                                variant="outline"
                                style={{ gap: 8 }}
                                onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=972528406273')}
                            >
                                <Text className="text-white font-medium">ליצירת קשר</Text>
                                <PhoneCall size={16} color="#D81B60" />
                            </Button>
                        </View>

                        {/* Breathing Line - Scroll Indicator */}
                        <Animated.View
                            style={[breatheStyle, { marginTop: 40 }]}
                            className="items-center"
                        >
                            <View
                                style={{
                                    width: 60,
                                    height: 3,
                                    borderRadius: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                }}
                            />
                        </Animated.View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export { AnimatedHero };

