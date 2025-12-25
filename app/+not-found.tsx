import { Link, Stack } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <View className="flex-1 bg-[#1C1C1C] items-center justify-center p-6">
                {/* 404 Background Text */}
                <Text
                    className="text-[#2C2C2C] font-black absolute"
                    style={{ fontSize: 200, opacity: 0.3 }}
                >
                    404
                </Text>

                {/* Content */}
                <View className="items-center z-10">
                    {/* Heading */}
                    <Text
                        className="text-white text-2xl font-bold text-center mb-2"
                        style={{ writingDirection: 'rtl' }}
                    >
                        הגעת לתרגיל שלא קיים
                    </Text>

                    {/* Body */}
                    <Text
                        className="text-gray-400 text-base text-center mb-8 max-w-xs"
                        style={{ writingDirection: 'rtl' }}
                    >
                        במועדון שלנו עובדים רק על מה שעובד. העמוד הזה? הוא לא חלק מהתוכנית.
                    </Text>

                    {/* Back Button */}
                    <Link href="/" asChild>
                        <Pressable className="bg-[#D81B60] h-14 px-8 rounded-full items-center justify-center active:opacity-80">
                            <Text className="text-white text-lg font-bold">
                                חזרה לבסיס
                            </Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
        </>
    );
}
