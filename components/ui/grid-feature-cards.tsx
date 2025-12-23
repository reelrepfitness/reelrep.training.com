import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import Svg, { Defs, Pattern, Rect, Path } from 'react-native-svg';
import { Award, Trophy, GraduationCap, Users, ShieldCheck, Zap } from 'lucide-react-native';

// --- Types ---
interface Feature {
    title: string;
    description: string;
    icon: React.ElementType;
}

// --- Data ---
const FEATURES: Feature[] = [
    {
        title: '10 שנות ניסיון',
        icon: Award,
        description: 'ניסיון מוכח ועשיר בתחום האימון והכושר.',
    },
    {
        title: 'מר ישראל',
        icon: Trophy,
        description: 'מקום שלישי, מפתח גוף לשעבר. מכיר את הבמה וההקריבה.',
    },
    {
        title: 'בוגר תואר ראשון',
        icon: GraduationCap,
        description: 'מדעי התזונה. ידע אקדמי מבוסס, לא טרנדים.',
    },
    {
        title: 'מתאים לכולם',
        icon: Users,
        description: 'ממתחילים גמורים ועד אתלטים. כל עוד עומדים בחוקים.',
    },
    {
        title: 'טכניקה מעל הכל',
        icon: ShieldCheck,
        description: 'פדנט בתנועה ובריאות. אצלי תהיו חזקים גם מחוץ למכון.',
    },
    {
        title: 'משמעת ברזל',
        icon: Zap,
        description: 'בלי איחורים, בלי ויכוחים. אתם לא באים לעבודה, אתם באים לעבוד.',
    },
];

// --- SVG Pattern ---
function GridPattern() {
    return (
        <Svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.1 }}>
            <Defs>
                <Pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    {/* Dashed lines for grid effect */}
                    <Path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.5"
                        strokeDasharray="4 4"
                    />
                </Pattern>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </Svg>
    );
}

// --- Component ---
export function GridFeatureCards() {
    return (
        <View className="w-full bg-[#1c1c1c] py-20 px-4">
            <View className="max-w-7xl mx-auto w-full">
                {/* Header */}
                <Text
                    className="text-3xl md:text-5xl font-bold text-white text-right mb-16"
                    style={{ fontFamily: 'Shorai Sans', writingDirection: 'rtl' }}
                >
                    למה Reel Rep?
                </Text>

                {/* Grid Container */}
                <View className="flex-row flex-wrap w-full border-t border-l border-white/10">
                    {FEATURES.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </View>
            </View>
        </View>
    );
}

// --- Sub-Component: Feature Card ---
function FeatureCard({ feature }: { feature: Feature }) {
    const { width } = useWindowDimensions();
    // Responsive width: 100% on mobile (<768), 50% on tablet (<1024), 33.33% on desktop
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    return (
        <View
            className="w-full md:w-1/2 lg:w-1/3 relative border-r border-b border-white/20"
            style={{
                minHeight: isMobile ? 100 : 200,
                backgroundColor: 'rgba(255, 255, 255, 0.05)', // Foggy transparent background
            }}
        >
            {/* Glassmorphism Blur Layer */}
            <View
                className="absolute inset-0"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
            />

            {/* Background Pattern */}
            <View className="absolute inset-0 overflow-hidden opacity-10">
                <GridPattern />
            </View>

            {/* Content Container */}
            <View className={`h-full flex z-10 ${isMobile ? 'flex-row-reverse items-center justify-between p-5' : 'flex-col items-end justify-start p-8'}`}>
                {/* Icon Wrapper */}
                <View className={`bg-pink/10 p-3 rounded-xl ${isMobile ? 'ml-4' : 'mb-6'}`}>
                    <feature.icon size={isMobile ? 24 : 32} color="#D81B60" strokeWidth={1.5} />
                </View>

                {/* Text Content */}
                <View className="flex-1">
                    <Text
                        className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white mb-2 text-right`}
                        style={{ fontFamily: 'Shorai Sans', writingDirection: 'rtl' }}
                    >
                        {feature.title}
                    </Text>
                    <Text
                        className="text-gray-400 text-sm leading-relaxed text-right"
                        style={{ fontFamily: 'Shorai Sans', writingDirection: 'rtl' }}
                    >
                        {feature.description}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default GridFeatureCards;
