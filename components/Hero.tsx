import React from 'react';
import { View, Text, Image, Pressable, Linking, useWindowDimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WHATSAPP_PHONE = '972528406273';
const WHATSAPP_MESSAGE = 'היי, אני מעוניין/ת להתחיל לאמן';

const openWhatsApp = () => {
    Linking.openURL(`whatsapp://send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(WHATSAPP_MESSAGE)}`);
};

export default function Hero() {
    const { width, height } = useWindowDimensions();

    // Responsive breakpoints
    const isSmall = width < 768;  // Mobile
    const isMedium = width >= 768 && width < 1024;  // Tablet
    const isLarge = width >= 1024;  // Desktop

    // Responsive font sizes
    const headlineFontSize = isSmall ? 40 : isMedium ? 56 : 72;
    const subtitleFontSize = isSmall ? 16 : isMedium ? 20 : 24;
    const buttonFontSize = isSmall ? 18 : 20;

    // Responsive spacing
    const headlineMarginBottom = isSmall ? 24 : 32;
    const subtitleMarginBottom = isSmall ? 32 : 48;
    const horizontalPadding = isSmall ? 16 : isMedium ? 32 : 48;

    return (
        <View style={{ height: height, width: '100%', position: 'relative', backgroundColor: '#1C1C1C', overflow: 'hidden' }}>
            {/* Background Gradient */}
            <LinearGradient
                colors={['#1C1C1C', '#2C2C2C']}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />

            {/* Dark Overlay/Texture Effect */}
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />

            {/* Trainer Photo Element (Bottom Right - Artistic) - Only show on larger screens */}
            {!isSmall && (
                <Image
                    source={require('../assets/images/Trainer_Photo.png')}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: -50,
                        width: isLarge ? 500 : 400,
                        height: isLarge ? 600 : 480,
                        opacity: 0.2
                    }}
                    resizeMode="contain"
                />
            )}

            {/* Hero Content - Centered */}
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: horizontalPadding,
                zIndex: 10,
                maxWidth: isLarge ? 1280 : '100%',
                marginHorizontal: 'auto'
            }}>
                <Text style={{
                    color: '#FFFFFF',
                    fontSize: headlineFontSize,
                    fontWeight: '900',
                    textAlign: 'center',
                    marginBottom: headlineMarginBottom,
                    writingDirection: 'rtl',
                }}>
                    כוח. תנועה. שליטה.
                </Text>

                <Text style={{
                    color: '#D1D5DB',
                    fontSize: subtitleFontSize,
                    textAlign: 'center',
                    marginBottom: subtitleMarginBottom,
                    maxWidth: isLarge ? 672 : '100%',
                    lineHeight: subtitleFontSize * 1.5,
                    writingDirection: 'rtl',
                    fontWeight: '500'
                }}>
                    אימוני כוח פונקציונליים בקבוצות קטנות. הכוח האמיתי מתחיל בטכניקה.
                </Text>

                <Pressable
                    onPress={openWhatsApp}
                    style={{
                        backgroundColor: '#D81B60',
                        paddingHorizontal: isSmall ? 32 : 40,
                        paddingVertical: isSmall ? 16 : 20,
                        borderRadius: 9999,
                        alignItems: 'center',
                        shadowColor: '#D81B60',
                        shadowOffset: { width: 0, height: 10 },
                        shadowOpacity: 0.4,
                        shadowRadius: 20,
                        elevation: 10,
                    }}
                >
                    <Text style={{
                        color: '#FFFFFF',
                        fontSize: buttonFontSize,
                        fontWeight: '700',
                        textAlign: 'center'
                    }}>
                        קבע אימון ניסיון
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
