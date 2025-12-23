import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { I18nManager } from 'react-native';
import '../global.css';

export default function RootLayout() {
    useEffect(() => {
        // Enable RTL layout for Hebrew text
        if (!I18nManager.isRTL) {
            I18nManager.forceRTL(true);
            // Note: On web, this won't require a restart
        }
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#1C1C1C' },
                }}
            />
        </GestureHandlerRootView>
    );
}
