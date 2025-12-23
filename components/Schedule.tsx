import React from 'react';
import { View, Text } from 'react-native';
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
    return (
        <View className="bg-background px-4 md:px-8 lg:px-12 py-20">
            <View className="max-w-6xl mx-auto w-full">
                <Text className="text-white text-3xl md:text-4xl font-bold text-center mb-12 writing-direction-rtl">
                    לוח אימונים
                </Text>

                <AnimatedTabs days={WEEKLY_SCHEDULE} />
            </View>
        </View>
    );
}
