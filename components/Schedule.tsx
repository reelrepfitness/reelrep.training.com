import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import ClubInfoCards from '@/components/ui/club-info-cards';
import AnimatedTabs from '@/components/ui/animated-tabs';

const WEEKLY_SCHEDULE = [
    {
        id: 'sun',
        short: 'א',
        long: 'ראשון',
        classes: [
            { time: '09:00', name: 'WOD', status: 'available' as const },
            { time: '10:10', name: 'WOD', status: 'available' as const },
            { time: '17:00', name: 'WOD', status: 'available' as const },
            { time: '18:00', name: 'WOD', status: 'available' as const },
            { time: '19:00', name: 'WOD', status: 'available' as const },
            { time: '20:00', name: 'WOD', status: 'available' as const },
        ],
    },
    {
        id: 'mon',
        short: 'ב',
        long: 'שני',
        classes: [
            { time: '09:10', name: 'WOD', status: 'available' as const },
            { time: '10:10', name: 'WOD', status: 'available' as const },
            { time: '18:00', name: 'WOD', status: 'available' as const },
            { time: '19:00', name: 'WOD', status: 'available' as const },
            { time: '20:00', name: 'WOD', status: 'available' as const },
        ],
    },
    {
        id: 'tue',
        short: 'ג',
        long: 'שלישי',
        classes: [
            { time: '09:10', name: 'WOD', status: 'available' as const },
            { time: '10:10', name: 'WOD', status: 'available' as const },
            { time: '17:00', name: 'WOD', status: 'available' as const },
            { time: '18:00', name: 'WOD', status: 'available' as const },
            { time: '19:00', name: 'WOD', status: 'available' as const },
            { time: '20:00', name: 'WOD', status: 'available' as const },
        ],
    },
    {
        id: 'wed',
        short: 'ד',
        long: 'רביעי',
        classes: [
            { time: '09:10', name: 'WOD', status: 'available' as const },
            { time: '10:10', name: 'WOD', status: 'available' as const },
        ],
    },
    {
        id: 'thu',
        short: 'ה',
        long: 'חמישי',
        classes: [
            { time: '09:10', name: 'WOD', status: 'available' as const },
            { time: '10:10', name: 'WOD', status: 'available' as const },
            { time: '17:00', name: 'WOD', status: 'available' as const },
            { time: '18:00', name: 'WOD', status: 'available' as const },
            { time: '19:00', name: 'WOD', status: 'available' as const },
            { time: '20:00', name: 'WOD', status: 'available' as const },
        ],
    },
    {
        id: 'fri',
        short: 'ו',
        long: 'שישי',
        classes: [
            { time: '09:10', name: 'WOD', status: 'available' as const },
            { time: '10:10', name: 'WOD', status: 'available' as const },
            { time: '12:10', name: 'WOD', status: 'available' as const },
        ],
    },
];

export default function Schedule() {
    const [isExpanded, setIsExpanded] = useState(false);
    const rotation = useSharedValue(0);

    const toggleAccordion = () => {
        setIsExpanded(!isExpanded);
        rotation.value = withTiming(isExpanded ? 0 : 180, { duration: 300 });
    };

    const chevronStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    return (
        <View
            className="w-full bg-white"
            style={{
                paddingTop: 80,
                paddingBottom: 80,
                paddingHorizontal: 20,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
            }}
        >
            <View className="max-w-6xl mx-auto w-full">
                {/* The Club Section - Static Cards */}
                <ClubInfoCards />

                {/* Schedule Section - Accordion */}
                <View className="mt-12">
                    {/* Accordion Header */}
                    <Pressable
                        onPress={toggleAccordion}
                        className="items-center active:opacity-70"
                    >
                        <Text style={{ fontSize: 34, fontWeight: '900', textAlign: 'center', color: '#1C1C1C' }}>
                            לוח אימונים
                        </Text>
                        <Text
                            className="text-[#D81B60] text-base mt-2"
                            style={{ writingDirection: 'rtl' }}
                        >
                            {isExpanded ? 'לסגירה לחצו כאן' : 'לצפייה לחצו כאן'}
                        </Text>
                    </Pressable>

                    {/* Accordion Content */}
                    {isExpanded && (
                        <View className="mt-8">
                            <AnimatedTabs days={WEEKLY_SCHEDULE} />
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}
