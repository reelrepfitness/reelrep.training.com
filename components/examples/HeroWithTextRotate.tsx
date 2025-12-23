import React from 'react';
import { View, Text, Pressable, Linking, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeroTextRotate from '@/components/ui/hero-text-rotate';
import { MoveRight, PhoneCall } from 'lucide-react-native';

/**
 * EXAMPLE: Hero Section with HeroTextRotate Component
 * 
 * This demonstrates how to integrate the HeroTextRotate component
 * into a full hero section with background, CTA buttons, and subtitle.
 */

const WHATSAPP_PHONE = '972528406273';
const WHATSAPP_MESSAGE = 'היי, אני מעוניין/ת להתחיל לאמן';

const openWhatsApp = () => {
    Linking.openURL(`whatsapp://send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(WHATSAPP_MESSAGE)}`);
};

export default function HeroWithTextRotate() {
    const { width, height } = useWindowDimensions();
    const isDesktop = width >= 768;

    return (
        <View style={{ height, width: '100%', backgroundColor: '#1C1C1C' }}>
            {/* Background Gradient */}
            <LinearGradient
                colors={['#1C1C1C', '#2C2C2C']}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />

            {/* Content Container */}
            <View className="flex-1 items-center justify-center px-4 md:px-8 lg:px-12">
                <View className="flex gap-8 items-center justify-center max-w-7xl">

                    {/* Hero Text Rotate Component */}
                    <HeroTextRotate
                        staticText="reel rep"
                        suffixes={['.fitness', '.plus', '.training']}
                        interval={3000}
                    />

                    {/* Subtitle (Hebrew - RTL) */}
                    <Text
                        className="text-lg md:text-xl leading-relaxed text-center text-gray-400 max-w-2xl writing-direction-rtl"
                        style={{ textAlign: 'center' }}
                    >
                        אני לא מבטיח לך קסמים, אבל אני מבטיח לך שינוי.
                    </Text>

                    {/* CTA Buttons */}
                    <View className="flex-row-reverse gap-3">
                        <Pressable
                            onPress={openWhatsApp}
                            className="bg-pink px-6 py-4 rounded-full active:opacity-80"
                            style={{
                                flexDirection: 'row-reverse',
                                alignItems: 'center',
                                gap: 8,
                            }}
                        >
                            <PhoneCall size={20} color="#FFF" />
                            <Text className="text-white font-bold text-lg">
                                יצירת קשר
                            </Text>
                        </Pressable>

                        <Pressable
                            className="bg-white/10 px-6 py-4 rounded-full active:opacity-80 border border-white/20"
                            style={{
                                flexDirection: 'row-reverse',
                                alignItems: 'center',
                                gap: 8,
                            }}
                        >
                            <MoveRight size={20} color="#FFF" />
                            <Text className="text-white font-bold text-lg">
                                לקביעת שיעור
                            </Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        </View>
    );
}

/**
 * USAGE NOTES:
 * 
 * 1. Import the component:
 *    import HeroTextRotate from '@/components/ui/hero-text-rotate';
 * 
 * 2. Use with default props:
 *    <HeroTextRotate />
 * 
 * 3. Customize:
 *    <HeroTextRotate 
 *      staticText="your brand"
 *      suffixes={['.one', '.two', '.three']}
 *      interval={2500}
 *    />
 * 
 * 4. The component handles:
 *    ✅ Responsive layout (stacked on mobile, horizontal on desktop)
 *    ✅ LTR direction forcing (for English content)
 *    ✅ Staggered character animation
 *    ✅ Proper font sizing and spacing
 * 
 * 5. Integration with existing Hero:
 *    - Replace the static "reel rep.training" text in AnimatedHero
 *    - Or use this component in a new hero section
 *    - Maintains the same visual hierarchy
 */
