import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { Carousel, CarouselItem } from '@/components/ui/carousel';
import { Image } from 'expo-image';
import { Quote } from 'lucide-react-native';

const TESTIMONIALS = [
    {
        id: 1,
        name: 'שם המתאמן',
        role: 'מתאמן מרוצה',
        content: 'כאן ייכנס הטקסט של הלקוח. ספרו על התהליך, על השינוי, ועל החוויה בסטודיו.',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop'
    },
    {
        id: 2,
        name: 'שם המתאמן',
        role: 'מתאמן מרוצה',
        content: 'מקום מצוין להמלצה נוספת. חשוב שהטקסט יהיה אותנטי וידבר אל קהל היעד.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
    },
    {
        id: 3,
        name: 'שם המתאמן',
        role: 'מתאמן מרוצה',
        content: 'המלצה שלישית לחיזוק המסר. הגיוון בסיפורים עוזר למתעניינים להתחבר.',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop'
    }
];

export default function Testimonials() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <View className="bg-backgroundLight px-4 md:px-8 lg:px-12 py-20 border-t border-pink/10">
            <View className="max-w-7xl mx-auto w-full">
                <Text className="text-white text-3xl md:text-4xl font-bold text-center mb-16 writing-direction-rtl">
                    מה אומרים המתאמנים?
                </Text>

                <Carousel
                    autoPlay={true}
                    autoPlayInterval={6000}
                    itemWidth={isMobile ? width - 64 : (width > 1200 ? width / 3.5 : width / 2.5)}
                    spacing={24}
                    showIndicators={true}
                    showArrows={!isMobile}
                    loop={true}
                >
                    {TESTIMONIALS.map((item) => (
                        <CarouselItem key={item.id} style={{
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            borderColor: 'rgba(216, 27, 96, 0.2)',
                            borderRadius: 24,
                            padding: 32,
                            height: 400
                        }}>
                            <View className="items-center h-full">
                                {/* Image */}
                                <View className="w-20 h-20 rounded-full overflow-hidden border-2 border-pink/50 mb-6">
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{ width: '100%', height: '100%' }}
                                        contentFit="cover"
                                    />
                                </View>

                                {/* Quote Icon */}
                                <View className="absolute top-0 right-0 opacity-10">
                                    <Quote size={80} color="#D81B60" />
                                </View>

                                {/* Content */}
                                <Text className="text-textGray text-lg text-center leading-relaxed mb-6 flex-1 writing-direction-rtl">
                                    "{item.content}"
                                </Text>

                                {/* Author */}
                                <View className="items-center mt-auto">
                                    <Text className="text-white text-xl font-bold mb-1">
                                        {item.name}
                                    </Text>
                                    <Text className="text-pink text-sm font-medium">
                                        {item.role}
                                    </Text>
                                </View>
                            </View>
                        </CarouselItem>
                    ))}
                </Carousel>
            </View>
        </View>
    );
}
