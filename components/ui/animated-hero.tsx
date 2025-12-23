import React, { useEffect, useMemo, useState } from "react";
import { View, Text, useWindowDimensions, Platform, Linking, Pressable } from "react-native";
import { Image } from 'expo-image';
import Animated, { FadeInDown, FadeOutUp, Easing } from "react-native-reanimated";
import { MoveRight, PhoneCall } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

function AnimatedHero() {
    const { width, height } = useWindowDimensions();
    const isDesktop = width >= 768; // md breakpoint

    const [titleNumber, setTitleNumber] = useState(0);
    const titles = useMemo(
        () => ["כוח", "פונקציונאלי", "תנועה", "גמישות", "תזונה"],
        []
    );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (titleNumber === titles.length - 1) {
                setTitleNumber(0);
            } else {
                setTitleNumber(titleNumber + 1);
            }
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [titleNumber, titles]);

    return (
        <View className="w-full bg-background relative overflow-hidden" style={{ height }}>
            <AnimatedGradientBackground />
            <View className="w-full max-w-7xl mx-auto px-4 h-full justify-center">
                <View className="flex gap-8 items-center justify-center flex-col">
                    <View>
                        <Animated.View
                            style={{
                                transform: [{ scale: 1 }],
                            }}
                        >
                            <Pressable
                                onPress={() => {
                                    // TODO: Navigate to reel rep.plus
                                    console.log('Navigate to plus');
                                }}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 12,
                                    paddingHorizontal: isDesktop ? 48 : 32,
                                    paddingVertical: isDesktop ? 24 : 16,
                                    backgroundColor: '#1C1C1C',
                                    borderRadius: 9999,
                                    minWidth: isDesktop ? 320 : 280,
                                }}
                            >
                                <Text
                                    className="text-white font-black"
                                    style={{
                                        fontFamily: Platform.OS === 'web' ? '"Shorai Sans", "Arial Black", "Helvetica Neue", sans-serif' : 'Shorai Sans',
                                        fontWeight: '900',
                                        letterSpacing: -0.055 * (isDesktop ? 28 : 22),
                                        fontSize: isDesktop ? 28 : 22,
                                    }}
                                >
                                    reel rep<Text style={{ color: '#5ce1e6' }}>.</Text>plus
                                </Text>
                                <MoveRight size={isDesktop ? 32 : 24} color="#FFF" />
                            </Pressable>
                        </Animated.View>
                    </View>
                    <View className="flex gap-4 flex-col items-center">
                        <View className="flex-col items-center justify-center">

                            {/* Main Static Header */}
                            <Text
                                className="font-black text-white text-center mb-2"
                                style={{
                                    fontFamily: Platform.OS === 'web' ? '"Shorai Sans", "Arial Black", "Helvetica Neue", sans-serif' : 'Shorai Sans',
                                    letterSpacing: -0.055 * (isDesktop ? 90 : 50),
                                    fontWeight: '900',
                                    fontSize: isDesktop ? 90 : 50,
                                    lineHeight: isDesktop ? 90 : 80
                                }}
                            >
                                reel rep<Text className="text-pink">.</Text>training
                            </Text>

                            <View className="h-8 md:h-28 justify-center items-center overflow-hidden mb-4">
                                {/* Render only the active title with animation */}
                                <Animated.Text
                                    key={titleNumber}
                                    entering={FadeInDown.duration(800).easing(Easing.out(Easing.quad))}
                                    exiting={FadeOutUp.duration(800).easing(Easing.out(Easing.quad))}
                                    className="font-bold text-center"
                                    style={{
                                        color: '#FFFFFF',
                                        fontSize: isDesktop ? 50 : 20,
                                        lineHeight: isDesktop ? 72 : 20
                                    }}
                                >
                                    {titles[titleNumber]}
                                </Animated.Text>
                            </View>
                        </View>

                        <Text className="text-lg md:text-xl leading-relaxed text-center text-gray-400 max-w-2xl">
                            אני לא מבטיח לך קסמים, אבל אני מבטיח לך שינוי.
                        </Text>
                    </View>
                    <View className="flex flex-row gap-3">
                        <Button
                            size="lg"
                            variant="outline"
                            style={{ gap: 8 }}
                            onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=972528406273')}
                        >
                            <Text className="text-white font-medium"> יצירת קשר</Text>
                            <PhoneCall size={16} color="#D81B60" />
                        </Button>
                        <Button size="lg" style={{ gap: 8 }}>
                            <Text className="text-white font-medium"> לקביעת שיעור</Text>
                            <MoveRight size={16} color="#FFF" />
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    );
}

export { AnimatedHero };
