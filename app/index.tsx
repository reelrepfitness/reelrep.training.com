import { View, Text, ScrollView, Pressable, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MapPin, Phone, Instagram, Facebook, MessageCircle } from 'lucide-react-native';
import Navbar from '../components/Navbar';
// import Hero from '../components/Hero';
import { AnimatedHero } from '../components/ui/animated-hero';
import WhyReelRepCarousel from '../components/ui/WhyReelRepCarousel';
import Testimonials from '../components/Testimonials';
import Schedule from '../components/Schedule';
import PricingSection from '../components/PricingSection';

export default function LandingPage() {
    const openWhatsApp = () => {
        Linking.openURL('https://wa.me/972528406273');
    };
    return (
        <View className="flex-1 bg-[#1C1C1C]">
            <StatusBar style="light" />

            {/* Top Navigation */}
            <Navbar />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <AnimatedHero />

                {/* Content Container (for remaining sections) */}
                <View className="relative">

                    {/* About Section */}
                    <View className="bg-backgroundLight px-4 md:px-8 lg:px-12 py-20">
                        <View className="max-w-7xl mx-auto w-full">
                            <View className="flex-col md:flex-row gap-8 lg:gap-16 items-center">
                                {/* Trainer Image */}
                                <View className="w-full md:w-1/2">
                                    <View className="bg-white/5 aspect-square rounded-2xl overflow-hidden">
                                        {/* Placeholder for Trainer_Photo.png */}
                                        <View className="w-full h-full items-center justify-center">
                                            <Text className="text-white/30 text-lg">Trainer Photo</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Bio Text */}
                                <View className="w-full md:w-1/2 writing-direction-rtl">
                                    <Text className="text-pink text-xl font-bold mb-4">
                                        נעים מאוד, איוון.
                                    </Text>

                                    <Text className="text-textGray text-base leading-relaxed">
                                        אני מגיע מעולם פיתוח הגוף (מקום שלישי מר ישראל לשנת 2017), אבל הגישה שלי היום שונה. אחרי שעברתי פריצת דיסק, הבנתי שהכוח האמיתי לא נמדד רק במשקל על המוט או בכמה גדולה היד הקדמית, אלא ביכולת תנועה, גמישות ושליטה מוחלטת בגוף.{'\n\n'}
                                        היום אני חזק יותר ממה שהייתי לפני הפציעה - בזכות עבודה חכמה. בסטודיו שלי, Room Number One זה טכניקה. קודם כל לומדים לזוז נכון, ורק אז מעמיסים. אני כאן כדי לבנות אתכם חזקים, בריאים ומוכנים לכל אתגר.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Method & Benefits */}
                    <View className="bg-background px-4 md:px-8 lg:px-12 py-20">
                        <View className="max-w-7xl mx-auto w-full">
                            <Text className="text-white text-3xl md:text-4xl font-bold text-center mb-16 writing-direction-rtl">
                                למה Reel Rep?
                            </Text>

                            <WhyReelRepCarousel />
                        </View>
                    </View>

                    {/* Expectations Section */}
                    <View className="bg-backgroundLight px-4 md:px-8 lg:px-12 py-20">
                        <View className="max-w-4xl mx-auto w-full text-center">
                            <Text className="text-white text-3xl md:text-4xl font-bold mb-8 writing-direction-rtl">
                                למי זה מתאים?
                            </Text>

                            <Text className="text-textGray text-lg leading-relaxed writing-direction-rtl">
                                אני לא מחפש את הכי חזקים, אני מחפש את הכי רציניים. הדרישה שלי פשוטה: רצון ללמוד, התמדה, והקשבה לטכניקה. מתאים לגברים ונשים מגיל 18+ שרוצים שינוי אמיתי.
                            </Text>
                        </View>
                    </View>

                    {/* Testimonials */}
                    <Testimonials />

                    {/* Schedule */}
                    <Schedule />

                    {/* Pricing Section */}
                    <PricingSection />

                    {/* The Offer */}
                    <View className="bg-background px-4 md:px-8 lg:px-12 py-20">
                        <View className="max-w-3xl mx-auto w-full">
                            <View className="bg-backgroundLight border-2 border-pink rounded-2xl p-8 md:p-12">
                                <Text className="text-white text-3xl md:text-4xl font-bold text-center mb-4 writing-direction-rtl">
                                    מתחילים בלי תירוצים.
                                </Text>

                                <Text className="text-pink text-2xl font-bold text-center mb-2 writing-direction-rtl">
                                    כרטיסיית היכרות – 3 אימונים מלאים
                                </Text>

                                <Text className="text-white text-5xl font-bold text-center mb-8">
                                    99 ₪ בלבד
                                </Text>

                                <Pressable
                                    onPress={openWhatsApp}
                                    className="bg-pink px-8 py-5 rounded-xl active:opacity-80 shadow-xl"
                                >
                                    <Text className="text-white text-xl font-bold text-center">
                                        שריינו לי מקום עכשיו
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>

                    {/* Footer */}
                    <View className="bg-backgroundLight px-4 md:px-8 lg:px-12 py-12 border-t border-pink/20">
                        <View className="max-w-7xl mx-auto w-full">
                            {/* Logo */}
                            <View className="items-center mb-6">
                                <View className="bg-white/10 px-5 py-2 rounded-lg">
                                    <Text className="text-white text-xl font-bold">RR</Text>
                                </View>
                            </View>

                            {/* Contact Info */}
                            <View className="items-center space-y-3 mb-8">
                                <View className="flex-row items-center gap-2">
                                    <MapPin size={18} color="#D81B60" />
                                    <Text className="text-textGray writing-direction-rtl">
                                        אריה דיסנצ׳יק 7, תל אביב
                                    </Text>
                                </View>

                                <View className="flex-row items-center gap-2">
                                    <Phone size={18} color="#D81B60" />
                                    <Text className="text-textGray">
                                        052-840-6273 (איוון)
                                    </Text>
                                </View>
                            </View>

                            {/* Social Links */}
                            <View className="flex-row justify-center gap-6">
                                <Pressable className="bg-pink/10 p-3 rounded-full active:opacity-80">
                                    <Instagram size={24} color="#D81B60" />
                                </Pressable>

                                <Pressable className="bg-pink/10 p-3 rounded-full active:opacity-80">
                                    <Facebook size={24} color="#D81B60" />
                                </Pressable>

                                <Pressable
                                    onPress={openWhatsApp}
                                    className="bg-pink/10 p-3 rounded-full active:opacity-80"
                                >
                                    <MessageCircle size={24} stroke="#D81B60" />
                                </Pressable>
                            </View>

                            <Text className="text-textGray/50 text-sm text-center mt-8">
                                © 2024 Reel Rep.Training. All rights reserved.
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
