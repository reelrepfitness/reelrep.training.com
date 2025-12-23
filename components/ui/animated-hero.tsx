import React from "react";
import { View, Text, useWindowDimensions, Platform, Linking, Pressable } from "react-native";
import { Image } from 'expo-image';
import { MoveRight, PhoneCall } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import BackgroundGradientAnimation from "@/components/ui/background-gradient-animation";
import HeroTextRotate from "@/components/ui/hero-text-rotate";
import TypewriterEffect from "@/components/ui/typewriter-effect";


function AnimatedHero() {
    const { width, height } = useWindowDimensions();
    const isDesktop = width >= 768; // md breakpoint

    const typewriterWords = [
        { text: "אנחנו", className: "text-white" },
        { text: "מבטיחים", className: "text-white" },
        { text: "שינוי.", className: "text-pink" }, // Highlight "Change" in pink
    ];

    return (
        <BackgroundGradientAnimation theme="pink" containerStyle={{ height }}>
            <View className="w-full max-w-7xl mx-auto px-4 h-full justify-center">
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

                        {/* Divider (Drawer handle look) */}
                        <View className="w-16 h-1.5 bg-white/20 rounded-full my-2" />

                        {/* Typewriter Effect - "We don't promise magic, we promise change" */}
                        <TypewriterEffect
                            words={typewriterWords}
                            staticText="אנחנו לא מבטיחים קסמים."
                            className="my-8"
                        />
                    </View>

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
                </View>
            </View>
        </BackgroundGradientAnimation>
    );
}

export { AnimatedHero };
