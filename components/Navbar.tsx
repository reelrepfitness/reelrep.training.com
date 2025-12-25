import React, { useState, useRef } from 'react';
import { View, Image, Platform, useWindowDimensions, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Navbar() {
    const { width } = useWindowDimensions();
    const router = useRouter();

    // Triple-tap easter egg state
    const [tapCount, setTapCount] = useState(0);
    const tapTimeout = useRef<NodeJS.Timeout | null>(null);

    // Responsive sizing based on screen width
    const isSmall = width < 768;  // Mobile
    const isMedium = width >= 768 && width < 1024;  // Tablet
    const isLarge = width >= 1024;  // Desktop

    // Logo size - smaller and refined
    const logoSize = isSmall ? 60 : isMedium ? 55 : 50;

    // Notch padding - extra top space for iPhone dynamic island
    const topPadding = isSmall ? 56 : 28;
    const bottomPadding = isSmall ? 12 : 10;

    // Handle logo tap for easter egg
    const handleLogoTap = () => {
        const newTapCount = tapCount + 1;
        setTapCount(newTapCount);

        // Clear existing timeout
        if (tapTimeout.current) {
            clearTimeout(tapTimeout.current);
        }

        // If 3 taps, navigate to rookie page
        if (newTapCount === 3) {
            setTapCount(0);
            router.push('/rookie');
            return;
        }

        // Reset tap count after 1 second
        tapTimeout.current = setTimeout(() => {
            setTapCount(0);
        }, 1000);
    };

    return (
        <View style={{ position: 'absolute', top: 0, width: '100%', zIndex: 50 }}>
            {/* Black Top Notch */}
            <View
                style={{
                    width: '100%',
                    backgroundColor: '#000000',
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    paddingTop: topPadding,
                    paddingBottom: bottomPadding,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Centered Logo - Triple-tap to open /rookie */}
                <Pressable onPress={handleLogoTap}>
                    <Image
                        source={require('../assets/RB_Logo_White.png')}
                        style={{ width: logoSize, height: logoSize }}
                        resizeMode="contain"
                    />
                </Pressable>
            </View>
        </View>
    );
}
