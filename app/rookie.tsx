import { View, Text, TextInput, Pressable, ScrollView, Linking, SafeAreaView, useWindowDimensions, Image, Modal, Platform } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Check, ChevronDown, MessageCircle, Dumbbell, CheckCircle } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { sendRookieFormEmail } from '../services/emailService';

// ⚠️ CRITICAL: Replace with Ivan's actual WhatsApp number (format: 972XXXXXXXXX)
const OWNER_PHONE = "9725284067273"; // TODO: Update with real number

/**
 * RookieQuestionnaire - Hidden Route Page
 * Location: /rookie
 * Purpose: Pre-session questionnaire for new leads
 * Sends data directly to WhatsApp - no backend required
 */
export default function RookiePage() {
    const { width } = useWindowDimensions();
    const isMobile = width < 640;

    // Responsive sizing for notch (same as Navbar)
    const isSmall = width < 768;  // Mobile
    const isMedium = width >= 768 && width < 1024;  // Tablet
    const isLarge = width >= 1024;  // Desktop

    // Logo size - smaller and refined (same as Navbar)
    const logoSize = isSmall ? 60 : isMedium ? 55 : 50;

    // Notch padding - extra top space for iPhone dynamic island (same as Navbar)
    const topPadding = isSmall ? 56 : 28;
    const bottomPadding = isSmall ? 12 : 10;

    // Form State
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [hasInjury, setHasInjury] = useState<boolean | null>(null);
    const [injuryDetails, setInjuryDetails] = useState('');
    const [experience, setExperience] = useState('');
    const [experienceDetails, setExperienceDetails] = useState('');
    const [healthDeclaration, setHealthDeclaration] = useState(false);
    const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);

    // Blur tracking - show checkmarks only after leaving field
    const [nameBlurred, setNameBlurred] = useState(false);
    const [phoneBlurred, setPhoneBlurred] = useState(false);

    // Checkmark shown tracking - prevent re-entrance
    const [nameCheckShown, setNameCheckShown] = useState(false);
    const [phoneCheckShown, setPhoneCheckShown] = useState(false);
    const [experienceCheckShown, setExperienceCheckShown] = useState(false);

    // Success popup state
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    // Experience Options
    const experienceOptions = [
        { value: 'none', label: 'ללא ניסיון' },
        { value: 'beginner', label: 'מתחיל (עד שנה)' },
        { value: 'intermediate', label: 'בינוני (1-3 שנים)' },
        { value: 'advanced', label: 'מתקדם (3+ שנים)' },
    ];

    // Field Validation
    const isNameValid = name.trim().split(/\s+/).filter(word => word.length > 0).length >= 2;
    const isPhoneValid = /^05\d{8}$/.test(phone.replace(/[-\s]/g, ''));
    const isInjuryValid = hasInjury !== null && (hasInjury === false || (hasInjury === true && injuryDetails.trim().length > 0));
    const isExperienceValid = experience !== '';

    // Validation
    const isFormValid = () => {
        return (
            name.trim() !== '' &&
            phone.trim() !== '' &&
            hasInjury !== null &&
            experience !== '' &&
            healthDeclaration
        );
    };

    // Email Submission
    const sendToEmail = async () => {
        if (!isFormValid()) {
            alert('נא למלא את כל השדות החובה ולאשר את הצהרת הבריאות');
            return;
        }

        const experienceLabel = experienceOptions.find(opt => opt.value === experience)?.label || experience;

        await sendRookieFormEmail({
            name,
            phone,
            hasInjury: hasInjury === true,
            injuryDetails,
            experienceLevel: experienceLabel,
            experienceDetails,
        });
    };

    // Animated Check Component - using refs to prevent re-entrance
    const nameAnimatedRef = useRef(false);
    const phoneAnimatedRef = useRef(false);
    const experienceAnimatedRef = useRef(false);

    const AnimatedCheck = ({ isValid, hasBlurred, animatedRef }: { isValid: boolean; hasBlurred?: boolean; animatedRef: React.MutableRefObject<boolean> }) => {
        const scale = useSharedValue(animatedRef.current ? 1 : 0);
        const shouldShow = hasBlurred !== undefined ? (isValid && hasBlurred) : isValid;

        useEffect(() => {
            if (shouldShow && !animatedRef.current) {
                scale.value = withTiming(1, { duration: 150 });
                animatedRef.current = true;
            }
        }, [shouldShow]);

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }],
            opacity: scale.value,
        }));

        if (!shouldShow) return null;

        return (
            <Animated.View style={[{ position: 'absolute', left: 12, top: '50%', marginTop: -10 }, animatedStyle]}>
                <CheckCircle size={20} color="#22C55E" />
            </Animated.View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* The Notch Header */}
            <View style={{ position: 'absolute', top: 0, width: '100%', zIndex: 50 }}>
                <View
                    style={{
                        width: '100%',
                        backgroundColor: '#000000',
                        borderBottomLeftRadius: 24,
                        borderBottomRightRadius: 24,
                        paddingTop: topPadding,
                        paddingBottom: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* reel rep.training Title */}
                    <Text
                        style={{
                            fontFamily: 'Shorai Sans',
                            fontSize: isMobile ? 32 : 36,
                            fontWeight: '900',
                            letterSpacing: -1.5,
                            color: '#FFFFFF',
                            textAlign: 'center',
                            marginTop: 12,
                        }}
                    >
                        reel rep<Text style={{ color: '#D81B60' }}>.</Text>training
                    </Text>
                    <Text
                        className="text-white font-bold text-center mt-4"
                        style={{ fontFamily: 'Shorai Sans', writingDirection: 'rtl', fontSize: 22, fontWeight: '900' }}
                        numberOfLines={1}
                    >
                        שאלון לקראת האימון הראשון
                    </Text>
                    <Text
                        className="text-gray-400 text-base text-center mt-1"
                        style={{ fontFamily: 'Shorai Sans', writingDirection: 'rtl' }}
                    >
                        כמה שאלות קצרות וסיימנו
                    </Text>
                </View>
            </View>

            {/* Scrollable Form Content */}
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingTop: topPadding + 100, paddingHorizontal: 24, paddingBottom: 48 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Form Fields */}
                <View className="gap-6">
                    {/* Name & Phone Row */}
                    <View className="flex-row-reverse gap-4">
                        {/* Name Input */}
                        <View className="flex-1">
                            <Text
                                className="text-gray-700 text-base font-semibold mb-2 writing-direction-rtl text-right"
                                style={{ fontFamily: 'Shorai Sans' }}
                            >
                                שם מלא *
                            </Text>
                            <View style={{ position: 'relative' }}>
                                <TextInput
                                    className="h-14 bg-gray-100 border border-gray-300 rounded-xl px-4 pr-10 text-[#1C1C1C] text-base"
                                    style={{ fontFamily: 'Shorai Sans', textAlign: 'right', writingDirection: 'rtl' }}
                                    placeholder="הכנס שם מלא"
                                    placeholderTextColor="#9CA3AF"
                                    value={name}
                                    onChangeText={setName}
                                    onBlur={() => setNameBlurred(true)}
                                />
                                <AnimatedCheck isValid={isNameValid} hasBlurred={nameBlurred} animatedRef={nameAnimatedRef} />
                            </View>
                        </View>

                        {/* Phone Input */}
                        <View className="flex-1">
                            <Text
                                className="text-gray-700 text-base font-semibold mb-2 writing-direction-rtl text-right"
                                style={{ fontFamily: 'Shorai Sans' }}
                            >
                                טלפון *
                            </Text>
                            <View style={{ position: 'relative' }}>
                                <TextInput
                                    className="h-14 bg-gray-100 border border-gray-300 rounded-xl px-4 pr-10 text-[#1C1C1C] text-base"
                                    style={{ fontFamily: 'Shorai Sans', textAlign: 'right', writingDirection: 'rtl' }}
                                    placeholder="05X-XXXXXXX"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="phone-pad"
                                    value={phone}
                                    onChangeText={setPhone}
                                    onBlur={() => setPhoneBlurred(true)}
                                />
                                <AnimatedCheck isValid={isPhoneValid} hasBlurred={phoneBlurred} animatedRef={phoneAnimatedRef} />
                            </View>
                        </View>
                    </View>

                    {/* Divider */}
                    <View className="h-px bg-gray-200 my-2" />

                    {/* Injury Question */}
                    <View>
                        <Text
                            className="text-gray-700 text-base font-semibold mb-3 writing-direction-rtl text-right"
                            style={{ fontFamily: 'Shorai Sans' }}
                        >
                            האם יש משהו רפואי שאני אמור להכיר?{'\n'}(אם יש ספק, לרשום בכל זאת) *
                        </Text>
                        <View className="flex-row-reverse gap-4">
                            {/* Yes Option */}
                            <Pressable
                                onPress={() => setHasInjury(true)}
                                className="flex-1 flex-row-reverse items-center justify-center gap-2 h-12 bg-gray-100 border border-gray-300 rounded-xl active:opacity-70"
                            >
                                <View className={`w-5 h-5 rounded-full border-2 ${hasInjury === true ? 'border-pink bg-pink' : 'border-gray-400'} items-center justify-center`}>
                                    {hasInjury === true && <View className="w-2 h-2 rounded-full bg-white" />}
                                </View>
                                <Text className="text-[#1C1C1C] text-base" style={{ fontFamily: 'Shorai Sans' }}>
                                    כן
                                </Text>
                            </Pressable>

                            {/* No Option */}
                            <Pressable
                                onPress={() => {
                                    setHasInjury(false);
                                    setInjuryDetails('');
                                }}
                                className="flex-1 flex-row-reverse items-center justify-center gap-2 h-12 bg-gray-100 border border-gray-300 rounded-xl active:opacity-70"
                            >
                                <View className={`w-5 h-5 rounded-full border-2 ${hasInjury === false ? 'border-pink bg-pink' : 'border-gray-400'} items-center justify-center`}>
                                    {hasInjury === false && <View className="w-2 h-2 rounded-full bg-white" />}
                                </View>
                                <Text className="text-[#1C1C1C] text-base" style={{ fontFamily: 'Shorai Sans' }}>
                                    לא
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* Conditional: Injury Details (Only if Yes) */}
                    {hasInjury === true && (
                        <View>
                            <Text
                                className="text-gray-700 text-base font-semibold mb-2 writing-direction-rtl text-right"
                                style={{ fontFamily: 'Shorai Sans' }}
                            >
                                פרט על הרגישות/פציעה
                            </Text>
                            <TextInput
                                className="min-h-[100px] bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-[#1C1C1C] text-base"
                                style={{ fontFamily: 'Shorai Sans', textAlign: 'right', writingDirection: 'rtl', textAlignVertical: 'top' }}
                                placeholder="תאר בקצרה..."
                                placeholderTextColor="#9CA3AF"
                                multiline
                                numberOfLines={4}
                                value={injuryDetails}
                                onChangeText={setInjuryDetails}
                            />
                        </View>
                    )}

                    {/* Divider */}
                    <View className="h-px bg-gray-200 my-2" />

                    {/* Experience Dropdown */}
                    <View>
                        <Text
                            className="text-gray-700 text-base font-semibold mb-2 writing-direction-rtl text-right"
                            style={{ fontFamily: 'Shorai Sans' }}
                        >
                            ניסיון באימונים *
                        </Text>
                        <View style={{ position: 'relative' }}>
                            <Pressable
                                onPress={() => setShowExperienceDropdown(!showExperienceDropdown)}
                                className="h-14 bg-white border border-gray-300 rounded-xl px-4 pl-10 flex-row items-center justify-between active:opacity-70"
                            >
                                <Text
                                    className={`text-base ${experience ? 'text-[#1C1C1C]' : 'text-gray-400'}`}
                                    style={{ fontFamily: 'Shorai Sans', writingDirection: 'rtl' }}
                                >
                                    {experience ? experienceOptions.find(opt => opt.value === experience)?.label : 'בחר מהרשימה'}
                                </Text>
                                <ChevronDown size={20} color="#6B7280" />
                            </Pressable>
                            <AnimatedCheck isValid={isExperienceValid} animatedRef={experienceAnimatedRef} />
                        </View>

                        {/* Dropdown Options */}
                        {showExperienceDropdown && (
                            <View className="mt-2 bg-white border border-gray-300 rounded-xl overflow-hidden">
                                {experienceOptions.map((option, index) => (
                                    <Pressable
                                        key={option.value}
                                        onPress={() => {
                                            setExperience(option.value);
                                            setShowExperienceDropdown(false);
                                        }}
                                        className={`h-12 px-4 flex-row-reverse items-center justify-between active:opacity-70 ${index !== experienceOptions.length - 1 ? 'border-b border-gray-300' : ''}`}
                                    >
                                        <Text
                                            className="text-[#1C1C1C] text-base"
                                            style={{ fontFamily: 'Shorai Sans', writingDirection: 'rtl' }}
                                        >
                                            {option.label}
                                        </Text>
                                        {experience === option.value && (
                                            <Check size={18} color="#D81B60" />
                                        )}
                                    </Pressable>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Conditional: Experience Details (Only if not 'none') */}
                    {experience !== '' && experience !== 'none' && (
                        <View>
                            <Text
                                className="text-gray-700 text-base font-semibold mb-2 writing-direction-rtl text-right"
                                style={{ fontFamily: 'Shorai Sans' }}
                            >
                                וואלה? במה עוסקים?
                            </Text>
                            <TextInput
                                className="min-h-[80px] bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-[#1C1C1C] text-base"
                                style={{ fontFamily: 'Shorai Sans', textAlign: 'right', writingDirection: 'rtl', textAlignVertical: 'top' }}
                                placeholder="ספר לנו קצת..."
                                placeholderTextColor="#9CA3AF"
                                multiline
                                numberOfLines={3}
                                value={experienceDetails}
                                onChangeText={setExperienceDetails}
                            />
                        </View>
                    )}

                    {/* Divider */}
                    <View className="h-px bg-gray-200 my-2" />

                    {/* Health Declaration Checkbox */}
                    <View>
                        <Pressable
                            onPress={() => setHealthDeclaration(!healthDeclaration)}
                            className="flex-row-reverse items-start gap-3 active:opacity-70"
                        >
                            <View className={`w-6 h-6 rounded border-2 ${healthDeclaration ? 'border-pink bg-pink' : 'border-gray-400'} items-center justify-center mt-0.5`}>
                                {healthDeclaration && <Check size={16} color="#FFFFFF" />}
                            </View>
                            <Text
                                className="flex-1 text-gray-600 text-sm leading-relaxed writing-direction-rtl text-right"
                                style={{ fontFamily: 'Shorai Sans' }}
                            >
                                אני מצהיר/ה שמצבי הבריאותי תקין ומאפשר לי להשתתף באימון. *
                            </Text>
                        </Pressable>
                    </View>

                    {/* Submit Button */}
                    <Pressable
                        onPress={() => {
                            if (isFormValid()) {
                                sendToEmail();
                                setShowSuccessPopup(true);
                            }
                        }}
                        disabled={!isFormValid()}
                        className={`h-14 rounded-xl items-center justify-center mt-4 ${isFormValid() ? 'bg-pink active:opacity-80' : 'bg-gray-300'}`}
                    >
                        <Text
                            className={`text-lg font-bold ${isFormValid() ? 'text-white' : 'text-gray-500'}`}
                            style={{ fontFamily: 'Shorai Sans' }}
                        >
                            שלח
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>

            {/* Success Popup Modal */}
            <Modal
                visible={showSuccessPopup}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setShowSuccessPopup(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/70 px-6">
                    <View
                        className="bg-[#1C1C1C] rounded-3xl p-8 w-full max-w-sm items-center"
                        style={{ paddingBottom: Platform.OS === 'ios' ? 32 : 24 }}
                    >
                        {/* Success Title */}
                        <Text
                            className="text-white text-3xl font-bold text-center mb-4"
                            style={{ fontFamily: 'Shorai Sans', writingDirection: 'rtl' }}
                        >
                            מצויין!
                        </Text>

                        {/* Subtitle */}
                        <Text
                            className="text-gray-400 text-base text-center mb-2"
                            style={{ fontFamily: 'Shorai Sans', writingDirection: 'rtl' }}
                        >
                            אנחנו כבר עוברים על זה.
                        </Text>
                        <Text
                            className="text-gray-400 text-base text-center mb-6"
                            style={{ fontFamily: 'Shorai Sans', writingDirection: 'rtl' }}
                        >
                            בינתיים יצא לך לשמוע על אפליקציית התזונה שלנו?
                        </Text>

                        {/* App Logo */}
                        <Image
                            source={require('../assets/images/reelrep-plus-white.png')}
                            style={{ height: 30, marginBottom: 24 }}
                            resizeMode="contain"
                        />

                        {/* Buttons */}
                        <View className="w-full gap-3">
                            <Pressable
                                onPress={() => {
                                    Linking.openURL('https://reelrep.plus/');
                                    setShowSuccessPopup(false);
                                }}
                                className="h-14 bg-pink rounded-xl items-center justify-center active:opacity-80"
                            >
                                <Text
                                    className="text-white text-lg font-bold"
                                    style={{ fontFamily: 'Shorai Sans' }}
                                >
                                    עכשיו תראו לי
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setShowSuccessPopup(false)}
                                className="h-14 bg-white/10 rounded-xl items-center justify-center active:opacity-70"
                            >
                                <Text
                                    className="text-gray-400 text-lg font-bold"
                                    style={{ fontFamily: 'Shorai Sans' }}
                                >
                                    לא מעוניין
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
