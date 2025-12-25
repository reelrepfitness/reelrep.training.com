import { useState } from 'react';
import { View, Text, ScrollView, Pressable, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MapPin, Phone } from 'lucide-react-native';
import Navbar from '../components/Navbar';
// import Hero from '../components/Hero';
import { AnimatedHero } from '../components/ui/animated-hero';
import BackgroundGradientAnimation from '../components/ui/background-gradient-animation';
import FounderBio from '../components/FounderBio';
import WhyReelRepCarousel from '../components/ui/WhyReelRepCarousel';
import Testimonials from '../components/Testimonials';
import Schedule from '../components/Schedule';
import PricingSection from '../components/PricingSection';
import LeadFormSheet from '../components/LeadFormSheet';
import Footer from '../components/Footer';

export default function LandingPage() {
    const [showLeadForm, setShowLeadForm] = useState(false);

    const openWhatsApp = () => {
        Linking.openURL('https://wa.me/972528406273');
    };
    return (
        <View className="flex-1 bg-[#1C1C1C]">
            <StatusBar style="light" />

            {/* Top Navigation */}
            <Navbar />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Shared Animated Gradient Background - Spans Hero + FounderBio */}
                <View
                    style={{
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                        overflow: 'hidden',
                        marginBottom: -40,
                        backgroundColor: '#1C1C1C',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    <BackgroundGradientAnimation theme="pink">
                        {/* Hero Section */}
                        <AnimatedHero onSchedulePress={() => setShowLeadForm(true)} />

                        {/* Founder Bio - Ivan's Story (shares same animated background) */}
                        <FounderBio onContactPress={openWhatsApp} />
                    </BackgroundGradientAnimation>
                </View>

                {/* Content Container (for remaining sections) */}
                <View className="relative">

                    {/* Method & Benefits */}
                    <View className="bg-white px-4 md:px-8 lg:px-12 pt-16 pb-20" style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, marginTop: -40 }}>
                        <View className="max-w-7xl mx-auto w-full">
                            <WhyReelRepCarousel />
                        </View>
                    </View>

                    {/* Testimonials Section (with rounded top corners) */}
                    <View
                        className="bg-background px-4 md:px-8 lg:px-12 py-16"
                        style={{
                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40,
                            marginTop: -40,
                            position: 'relative',
                            zIndex: 2,
                        }}
                    >
                        {/* Section Title */}
                        <Text style={{ fontSize: 34, fontWeight: '900', textAlign: 'center', color: 'white', marginBottom: 0 }}>
                            מתאמנים מספרים
                        </Text>
                        <Testimonials />
                    </View>

                    {/* Schedule */}
                    <Schedule />

                    {/* Pricing Section - wrapped for visible rounded corners */}
                    <View style={{ backgroundColor: '#FFFFFF' }}>
                        <PricingSection />
                    </View>

                    {/* The Offer - White section under pricing */}
                    <View
                        style={{
                            backgroundColor: '#FFFFFF',
                            paddingTop: 24,
                            paddingBottom: 100,
                            paddingHorizontal: 24,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Grid Lines Background */}
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                opacity: 0.05,
                            }}
                        >
                            {/* Horizontal Lines */}
                            {[...Array(20)].map((_, i) => (
                                <View
                                    key={`h-${i}`}
                                    style={{
                                        position: 'absolute',
                                        top: i * 40,
                                        left: 0,
                                        right: 0,
                                        height: 1,
                                        backgroundColor: '#000000',
                                    }}
                                />
                            ))}
                            {/* Vertical Lines */}
                            {[...Array(12)].map((_, i) => (
                                <View
                                    key={`v-${i}`}
                                    style={{
                                        position: 'absolute',
                                        left: i * 40,
                                        top: 0,
                                        bottom: 0,
                                        width: 1,
                                        backgroundColor: '#000000',
                                    }}
                                />
                            ))}
                        </View>
                        <View className="max-w-lg mx-auto w-full">
                            {/* Offer Badge */}
                            <View className="items-center mb-6">
                                <View className="bg-pink px-5 py-2 rounded-full">
                                    <Text className="text-white text-sm font-bold">הצעה מיוחדת לחדשים</Text>
                                </View>
                            </View>

                            {/* Offer Card */}
                            <View
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: 24,
                                    padding: 32,
                                    alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.15,
                                    shadowRadius: 12,
                                    elevation: 8,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 56,
                                        fontWeight: '900',
                                        color: '#1C1C1C',
                                        marginBottom: 4,
                                    }}
                                >
                                    ₪99
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 22,
                                        fontWeight: '700',
                                        color: '#D81B60',
                                        marginBottom: 12,
                                    }}
                                >
                                    ל-3 אימונים
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: '#6B7280',
                                        textAlign: 'center',
                                        marginBottom: 24,
                                    }}
                                >
                                    הצעת היכרות למתאמנים חדשים בלבד
                                </Text>

                                <Pressable
                                    onPress={() => setShowLeadForm(true)}
                                    className="bg-[#1C1C1C] px-8 py-4 rounded-xl active:opacity-80 w-full"
                                >
                                    <Text className="text-white text-lg font-bold text-center">
                                        אני רוצה!
                                    </Text>
                                </Pressable>

                                {/* Disclaimers */}
                                <View className="mt-4 pt-4 border-t border-gray-200">
                                    <Text
                                        className="text-gray-500 text-xs text-center"
                                        style={{ writingDirection: 'rtl' }}
                                    >
                                        * תקף לשבועיים
                                    </Text>
                                    <Text
                                        className="text-gray-500 text-xs text-center mt-1"
                                        style={{ writingDirection: 'rtl' }}
                                    >
                                        * אין החזרים על כרטיסיות
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* New Section - Dark layer above footer */}
                    <View
                        style={{
                            backgroundColor: '#1C1C1C',
                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40,
                            marginTop: -40,
                            paddingTop: 60,
                            paddingBottom: 60,
                            paddingHorizontal: 24,
                            position: 'relative',
                            zIndex: 12,
                        }}
                    >
                        <View className="max-w-lg mx-auto w-full items-center">
                            <Text
                                className="text-white text-2xl font-bold text-center mb-4"
                                style={{ writingDirection: 'rtl' }}
                            >
                                מוכנים להתחיל?
                            </Text>
                            <Text
                                className="text-gray-400 text-base text-center mb-8"
                                style={{ writingDirection: 'rtl' }}
                            >
                                השאירו פרטים ונחזור אליכם בהקדם
                            </Text>
                            <Pressable
                                onPress={() => setShowLeadForm(true)}
                                className="bg-[#D81B60] h-14 px-10 rounded-full items-center justify-center active:opacity-80"
                            >
                                <Text className="text-white text-lg font-bold">
                                    השאירו פרטים
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* Footer */}
                    <Footer />
                </View>
            </ScrollView >

            {/* Lead Form Bottom Sheet */}
            <LeadFormSheet
                visible={showLeadForm}
                onClose={() => setShowLeadForm(false)}
            />
        </View >
    );
}
