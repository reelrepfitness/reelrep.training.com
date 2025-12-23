import React from 'react';
import { View, ScrollView } from 'react-native';
import AnimatedTabs from '@/components/ui/animated-tabs';

/**
 * Example usage of AnimatedTabs component
 * with weekly schedule data for Reel Rep Training
 */

const WEEKLY_SCHEDULE = [
    {
        id: 'sun',
        short: 'א',
        long: 'ראשון',
        classes: [
            { time: '07:00', name: 'Cardio Blast', status: 'available' as const },
            { time: '08:30', name: 'Strength 101', status: 'available' as const },
            { time: '18:00', name: 'Functional Training', status: 'waitlist' as const },
            { time: '19:30', name: 'Open Gym', status: 'available' as const },
        ],
    },
    {
        id: 'mon',
        short: 'ב',
        long: 'שני',
        classes: [
            { time: '06:00', name: 'Morning Power', status: 'available' as const },
            { time: '17:00', name: 'CrossFit', status: 'available' as const },
            { time: '18:30', name: 'Pilates', status: 'full' as const },
            { time: '20:00', name: 'Boxing', status: 'waitlist' as const },
        ],
    },
    {
        id: 'tue',
        short: 'ג',
        long: 'שלישי',
        classes: [
            { time: '07:00', name: 'HIIT', status: 'available' as const },
            { time: '18:00', name: 'Strength & Conditioning', status: 'available' as const },
            { time: '19:30', name: 'Yoga Flow', status: 'available' as const },
        ],
    },
    {
        id: 'wed',
        short: 'ד',
        long: 'רביעי',
        classes: [
            { time: '06:30', name: 'Bootcamp', status: 'available' as const },
            { time: '17:30', name: 'Functional Fitness', status: 'waitlist' as const },
            { time: '19:00', name: 'Mobility & Stretch', status: 'available' as const },
        ],
    },
    {
        id: 'thu',
        short: 'ה',
        long: 'חמישי',
        classes: [
            { time: '07:00', name: 'Cardio Blast', status: 'available' as const },
            { time: '18:00', name: 'Strength Training', status: 'available' as const },
            { time: '19:30', name: 'Open Gym', status: 'available' as const },
        ],
    },
    {
        id: 'fri',
        short: 'ו',
        long: 'שישי',
        classes: [
            { time: '08:00', name: 'Weekend Warrior', status: 'available' as const },
            { time: '09:30', name: 'Recovery Session', status: 'available' as const },
        ],
    },
];

export default function ScheduleTabsExample() {
    return (
        <ScrollView className="flex-1 bg-background">
            <View className="py-20">
                <AnimatedTabs days={WEEKLY_SCHEDULE} defaultTab={0} />
            </View>
        </ScrollView>
    );
}
