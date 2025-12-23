import React, { useState } from 'react';
import { View, Text, Pressable, useWindowDimensions, ScrollView } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    FadeInRight,
    FadeOutLeft,
} from 'react-native-reanimated';

interface DaySchedule {
    id: string;
    short: string;
    long: string;
    classes: Array<{
        time: string;
        name: string;
        status: 'available' | 'waitlist' | 'full';
    }>;
}

interface AnimatedTabsProps {
    days: DaySchedule[];
    defaultTab?: number;
}

/**
 * AnimatedTabs Component (RTL)
 * Rewritten from scratch to fix pink pill bug
 */
export function AnimatedTabs({ days, defaultTab = 0 }: AnimatedTabsProps) {
    const [activeTab, setActiveTab] = useState<number | null>(defaultTab);
    const { width } = useWindowDimensions();
    const isDesktop = width >= 768;

    const handleTabPress = (index: number) => {
        setActiveTab(index);
    };

    return (
        <View className="w-full max-w-4xl mx-auto flex flex-col gap-6 px-4">
            {/* Tab Bar */}
            <View className="flex-row-reverse p-1 rounded-xl relative overflow-hidden" style={{ backgroundColor: '#1c1c1c' }}>
                {/* Tabs - No pink pill */}
                {days.map((day, index) => {
                    const isActive = activeTab === index;
                    return (
                        <Pressable
                            key={day.id}
                            className="flex-1 items-center justify-center py-3"
                            onPress={() => handleTabPress(index)}
                        >
                            <Text
                                className={`text-lg md:hidden font-bold ${isActive ? 'text-pink' : 'text-gray-400'}`}
                                style={{ fontFamily: 'Shorai Sans' }}
                            >
                                {day.short}
                            </Text>
                            <Text
                                className={`hidden md:flex text-base font-bold ${isActive ? 'text-pink' : 'text-gray-400'}`}
                                style={{ fontFamily: 'Shorai Sans', writingDirection: 'rtl' }}
                            >
                                {day.long}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            {/* Content - Only when tab selected */}
            {activeTab !== null && (
                <Animated.View
                    key={activeTab}
                    entering={FadeInRight.duration(300)}
                    exiting={FadeOutLeft.duration(200)}
                    className="min-h-[600px] rounded-2xl p-6 border border-pink/10"
                    style={{ backgroundColor: '#1c1c1c' }}
                >
                    <ScheduleDay classes={days[activeTab].classes} dayName={days[activeTab].long} dayId={days[activeTab].id} />
                </Animated.View>
            )}
        </View>
    );
}

function ScheduleDay({ classes, dayName, dayId }: { classes: DaySchedule['classes']; dayName: string; dayId: string }) {
    if (classes.length === 0) {
        return (
            <View className="flex items-center justify-center py-12">
                <Text
                    className="text-gray-400 text-lg text-center"
                    style={{ fontFamily: 'Shorai Sans', writingDirection: 'rtl' }}
                >
                    אין שיעורים ביום {dayName}
                </Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="flex flex-col gap-4">
                {classes.map((classItem, index) => (
                    <React.Fragment key={`${classItem.time}-${index}`}>
                        <View
                            className="flex flex-row items-center justify-between p-4 rounded-xl border border-gray-700/50"
                            style={{ backgroundColor: '#1c1c1c' }}
                        >
                            {/* Time Badge - Left */}
                            <View className="px-6 py-3 rounded-xl bg-pink">
                                <Text className="text-white text-xl font-bold" style={{ fontFamily: 'Shorai Sans' }}>
                                    {classItem.time}
                                </Text>
                            </View>

                            {/* Class Info - Right side */}
                            <View className="flex-1 ml-4">
                                <Text
                                    className="text-white text-lg font-bold mb-1"
                                    style={{ fontFamily: 'Shorai Sans', writingDirection: 'rtl' }}
                                >
                                    the.WOD
                                </Text>
                                <Text
                                    className="text-gray-400 text-sm"
                                    style={{ fontFamily: 'Shorai Sans', writingDirection: 'rtl' }}
                                >
                                    אימון קבוצה
                                </Text>
                            </View>
                        </View>

                        {/* Divider after 10:10 session - Only on specific days */}
                        {classItem.time === '10:10' && ['sun', 'mon', 'tue', 'thu'].includes(dayId) && (
                            <View className="flex-row items-center gap-3 my-2">
                                <View className="flex-1 h-px bg-pink/30" />
                                <Text className="text-pink/60 text-xs font-bold" style={{ fontFamily: 'Shorai Sans' }}>
                                    ערב
                                </Text>
                                <View className="flex-1 h-px bg-pink/30" />
                            </View>
                        )}
                    </React.Fragment>
                ))}
            </View>
        </ScrollView>
    );
}

export default AnimatedTabs;
