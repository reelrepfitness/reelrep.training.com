import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, useWindowDimensions, ScrollView, StyleSheet } from 'react-native';

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
 * AnimatedTabs Component (Safe Mode - Pure Styles)
 * Uses inline styles instead of NativeWind classes to avoid navigation context errors.
 * This completely bypasses the NativeWind/React Navigation conflict.
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
            <View style={styles.tabBar}>
                {/* Tabs - Pure inline styles, no NativeWind on interactive elements */}
                {days.map((day, index) => {
                    const isActive = activeTab === index;
                    return (
                        <TouchableWithoutFeedback
                            key={day.id}
                            onPress={() => handleTabPress(index)}
                        >
                            <View style={[
                                styles.tabButton,
                                isActive && styles.tabButtonActive
                            ]}>
                                {/* Mobile: Show short day name */}
                                {!isDesktop && (
                                    <Text style={[
                                        styles.tabText,
                                        styles.tabTextMobile,
                                        isActive ? styles.tabTextActive : styles.tabTextInactive
                                    ]}>
                                        {day.short}
                                    </Text>
                                )}

                                {/* Desktop: Show full day name */}
                                {isDesktop && (
                                    <Text style={[
                                        styles.tabText,
                                        styles.tabTextDesktop,
                                        isActive ? styles.tabTextActive : styles.tabTextInactive,
                                        { writingDirection: 'rtl' }
                                    ]}>
                                        {day.long}
                                    </Text>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </View>

            {/* Content - Static View (No Animation) */}
            {activeTab !== null && (
                <View
                    key={activeTab}
                    className="h-[700px] rounded-2xl p-6 border border-white bg-white shadow-sm overflow-hidden"
                >
                    <ScheduleDay classes={days[activeTab].classes} dayName={days[activeTab].long} dayId={days[activeTab].id} />
                </View>
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
        <View className="flex-1">
            <View className="flex flex-col gap-4">
                {classes.map((classItem, index) => (
                    <React.Fragment key={`${classItem.time}-${index}`}>
                        <View
                            className="flex flex-row items-center justify-between p-4 rounded-xl border border-gray-100 bg-white"
                        >
                            {/* Time Badge - Left */}
                            <View className="px-6 py-3 rounded-xl bg-pink/10">
                                <Text className="text-pink text-xl font-bold" style={{ fontFamily: 'Shorai Sans' }}>
                                    {classItem.time}
                                </Text>
                            </View>

                            {/* Class Info - Right side */}
                            <View className="flex-1 ml-4">
                                <Text
                                    className="text-[#1C1C1C] text-lg font-bold mb-1"
                                    style={{ fontFamily: 'Shorai Sans', writingDirection: 'rtl' }}
                                >
                                    the.WOD
                                </Text>
                                <Text
                                    className="text-gray-500 text-sm"
                                    style={{ fontFamily: 'Shorai Sans', writingDirection: 'rtl' }}
                                >
                                    אימון קבוצה
                                </Text>
                            </View>
                        </View>

                        {/* Divider after 10:10 session - Only on specific days */}
                        {classItem.time === '10:10' && ['sun', 'mon', 'tue', 'thu'].includes(dayId) && (
                            <View className="flex-row items-center gap-3 my-2">
                                <View className="flex-1 h-px bg-pink/10" />
                                <Text className="text-pink/60 text-xs font-bold" style={{ fontFamily: 'Shorai Sans' }}>
                                    ערב
                                </Text>
                                <View className="flex-1 h-px bg-pink/10" />
                            </View>
                        )}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
}

export default AnimatedTabs;

// Pure React Native styles to avoid NativeWind/Navigation context conflicts
const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row-reverse',
        padding: 4,
        borderRadius: 12,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#F3F4F6', // gray-100
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
    },
    tabButtonActive: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    tabText: {
        fontFamily: 'Shorai Sans',
        fontWeight: 'bold',
    },
    tabTextMobile: {
        fontSize: 18,
    },
    tabTextDesktop: {
        fontSize: 16,
    },
    tabTextActive: {
        color: '#D81B60', // pink
    },
    tabTextInactive: {
        color: '#6B7280', // gray-500
    },
});
