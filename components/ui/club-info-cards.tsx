import React from 'react';
import { View, Text } from 'react-native';
import { Users, MapPin } from 'lucide-react-native';

export default function ClubInfoCards() {
    return (
        <View className="mb-20">
            {/* Section Title */}
            <Text style={{ fontSize: 34, fontWeight: '900', textAlign: 'center', color: '#1C1C1C', marginBottom: 48 }}>
                המועדון
            </Text>

            {/* Cards Container */}
            <View className="max-w-4xl mx-auto w-full px-4">
                <View className="flex-row-reverse gap-4">

                    {/* Card 1: How? */}
                    <View className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <View className="items-end mb-4">
                            <View className="bg-pink/10 p-3 rounded-full mb-4">
                                <Users size={32} color="#D81B60" />
                            </View>
                            <Text className="text-2xl font-bold text-[#1C1C1C] text-right mb-2">
                                אימוני קבוצה
                            </Text>
                            <Text className="text-xl font-bold text-pink text-right mb-4">
                                עד 8 מתאמנים בקבוצה
                            </Text>
                        </View>

                        <View className="space-y-2">
                        </View>
                    </View>

                    {/* Card 2: Where? */}
                    <View className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <View className="items-end mb-4">
                            <View className="bg-pink/10 p-3 rounded-full mb-4">
                                <MapPin size={32} color="#D81B60" />
                            </View>
                            <Text className="text-2xl font-bold text-[#1C1C1C] text-right mb-2">
                                צפון תל אביב
                            </Text>
                            <Text className="text-xl font-bold text-pink text-right mb-4">
                                אריה דיסנצ׳יק 7
                            </Text>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    );
}
