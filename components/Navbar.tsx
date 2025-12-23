import React from 'react';
import { View, Image, Platform, useWindowDimensions } from 'react-native';

export default function Navbar() {
    const { width } = useWindowDimensions();

    // Responsive sizing based on screen width
    const isSmall = width < 768;  // Mobile
    const isMedium = width >= 768 && width < 1024;  // Tablet
    const isLarge = width >= 1024;  // Desktop

    // Logo size - smaller and refined
    const logoSize = isSmall ? 60 : isMedium ? 55 : 50;

    // Notch padding - extra top space for iPhone dynamic island
    const topPadding = isSmall ? 56 : 28;
    const bottomPadding = isSmall ? 12 : 10;

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
                {/* Centered Logo */}
                <Image
                    source={require('../assets/RB_Logo_White.png')}
                    style={{ width: logoSize, height: logoSize }}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
}
