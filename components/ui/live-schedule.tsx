import React from 'react';
import { View, Text, Platform, Linking, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';

interface LiveScheduleProps {
    url: string;
}

export default function LiveSchedule({ url }: LiveScheduleProps) {
    const isWeb = Platform.OS === 'web';

    const openExternalSchedule = () => {
        Linking.openURL(url);
    };

    return (
        <View className="w-full">
            {/* Heading */}
            <Text style={{ fontSize: 34, fontWeight: '900', textAlign: 'center', color: '#1C1C1C', marginBottom: 24, paddingBottom: 10 }}>
                לוז אימונים
            </Text>

            {/* Schedule Container */}
            <View
                className="w-full bg-white rounded-2xl overflow-hidden border border-pink/20 relative"
                style={{ height: isWeb ? 700 : 500 }}
            >
                {isWeb ? (
                    <iframe
                        src={url}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        title="Schedule"
                    />
                ) : (
                    <WebView
                        source={{ uri: url }}
                        style={{ flex: 1 }}
                        nestedScrollEnabled
                    />
                )}
            </View>

            {/* Fallback Button */}
            <Pressable
                onPress={openExternalSchedule}
                className="mt-4 items-center"
            >
                <Text className="text-gray-500 text-sm font-medium underline">
                    לא מצליח לראות? לחץ לפתיחת הלוז המלא
                </Text>
            </Pressable>
        </View>
    );
}
