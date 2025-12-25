import { useState } from 'react';
import { View, Text, Pressable, Linking, Image, Modal, ScrollView, Platform } from 'react-native';
import { Instagram, MapPin, MessageCircle, X } from 'lucide-react-native';

// Social Links
const WHATSAPP_URL = 'https://wa.me/972528406273';
const INSTAGRAM_URL = 'https://instagram.com/reelrepfitness';
const WAZE_URL = 'https://waze.com/ul?ll=32.0966,34.7896&navigate=yes';

const openLink = async (url: string) => {
    try {
        await Linking.openURL(url);
    } catch (error) {
        console.error('Failed to open URL:', url);
    }
};

// Club Terms Content
const CLUB_TERMS = `תקנון REEL REP FITNESS

1. כבוד הדדי
• כל המתאמנים והמאמנים מחויבים לנהוג בכבוד ובסובלנות אחד כלפי השני.
• אין להעליב, לקלל או להתנהג באלימות פיזית או מילולית.

2. שימוש בציוד
• יש להשתמש בציוד בצורה נכונה כדי למנוע פגיעות.
• יש להחזיר את הציוד למקום לאחר השימוש.

3. נוכחות באימונים
• יש להגיע לאימונים בזמן.
• במידה ולא ניתן להגיע או שיש עיכוב, יש להודיע מראש!

4. לבוש הולם
• יש להגיע בלבוש נוח שמתאים לפעילות ספורטיבית (נעלי ספורט, בגדים נוחים).
• אין להיכנס עם בגדים לא מתאימים.

5. בריאות ובטיחות
• יש לחתום על הצהרת בריאות.
• יש להודיע למאמן על כל מצב רפואי או פציעה לפני תחילת האימון.
• יש להודיע למאמן על כל שינוי במצב הרפואי (פציעה, הריון וכו׳) ולהציג אישור רפואי בהתאם.

6. שימוש בטלפון נייד
• יש לכבות או להנמיך את הטלפון הנייד בזמן האימון כדי לא להפריע למאמן ולאחרים.

7. אחריות אישית
• כל מתאמן אחראי על בריאותו האישית.
• יש להקשיב להנחיות המאמנים ולבצע את התרגילים בהתאם.

8. שמירה על ניקיון
• יש לשמור על ניקיון האזור שבו מתאמנים.
• יש לזרוק פסולת במקומות המיועדים לכך.

9. איוש האימון
• יש להקשיב להנחיות המאמנים.
• משתתפים שנראים לא מרוכזים או לא מתנהלים בצורה בטיחותית עלולים להתבקש לעזוב את האימון.

10. הנאה והתפתחות
• המטרה היא ליהנות מהאימון ולשפר את הכושר האישי.
• יש לשאול שאלות ולהתייעץ עם המאמנים בכל נושא שקשור לאימון.

11. תשלום מראש ומנויים
• כל מתאמן מחויב לשלם את דמי האימון מראש, לפני תחילת כל תוכנית אימונים.
• תשלום יוכל להתבצע במזומן, בכרטיס אשראי או בהעברה בנקאית, בהתאם להסכם עם המאמנים.
• כל מנוי חופשי חודשי הוא אישי ואינו ניתן להעברה.

12. מדיניות החזרות
• במידה והמתאמן אינו יכול להשתתף באימון, יש להודיע על כך לפחות 3 שעות מראש על מנת לקבל החזר מלא.
• במקרה של הודעה מאוחרת או אי הגעה, דמי האימון לא יוחזרו.
• אין החזרים על כרטיסיות.
• אין החזרים על אימונים שלא נוצלו בכרטיסייה עד תום תוקפתה.

13. תשלומים קבועים
• מתאמנים ששולחים תשלום חודשי קבוע (הוראת קבע) ייהנו מהנחה על בסיס חודשי.
• תשלומים קבועים יבוצעו עד לתאריך שנקבע מראש.
• לביטול הוראת קבע יש צורך להודיע למאמנים/קבלה על ביטול המנוי לפחות שבועיים לפני תאריך החיוב שנקבע בהוראת קבע.

14. חובות
• מתאמנים עם חובות לא יוכלו להשתתף באימונים עד להסדרת התשלום.

15. שינויי מחירים
• כל שינוי במחירים יימסר למתאמנים לפחות 30 יום מראש.
• הבעלים והמאמנים שומרים לעצמם את הזכות לעדכן מחירים בהתאם לעלויות המדויקות.

העסק רשאי לסיים את חברותו של כל חבר במקרה של הפרה של איזו מהוראות התקנון ו/או של איזו מהוראות צוות או הנהלת המועדון או החברה ו/או במקרה של הפרת משמעת חמורה ו/או התנהגות גסה, פרועה או אלימה ו/או התבטאות מילולית גסה או אלימה במועדון ו/או התנהגות שיש בה כדי לסכן את חברי המועדון את שלומם ו/או את שלמות רכושם ו/או לגרום להם נזק כלשהו וכדומה.

העסק שומר לעצמו את הזכות, לפי שיקול דעתו הבלעדי, לסרב לקבל מועמד כמנוי במועדון ו/ואו לחדש מנוי קיים.

התקנון מנוסח בלשון זכר אך פונה לנשים וגברים כאחד.`;

// Site Terms Content
const SITE_TERMS = `תקנון ותנאי שימוש – Reel Rep Fitness

1. כללי
1.1. אתר זה ("האתר") מופעל על ידי Reel Rep Fitness בבעלות איוון זייצב ("הנהלת האתר" או "העסק").
1.2. השימוש באתר ובשירותים המוצעים בו מעיד על הסכמתך לתנאים אלה. אם אינך מסכים לתנאים, נא להימנע משימוש באתר.
1.3. האתר מיועד לספק מידע על שירותי האימון, המועדון, והרשמה ליצירת קשר ראשוני.

2. הצהרת בריאות והגבלת אחריות (חשוב!)
2.1. המידע המופיע באתר, לרבות מאמרים, טיפים, סרטונים ותמונות, הינו למטרות אינפורמטיביות בלבד ואינו מהווה תחליף לייעוץ רפואי, תזונתי או מקצועי אחר.
2.2. כל פעילות גופנית שנעשית בהסתמך על תכני האתר היא על אחריות המשתמש בלבד. חובה להיוועץ ברופא לפני תחילת כל תוכנית אימונים או שינוי תזונתי.
2.3. הנהלת האתר לא תישא באחריות לכל נזק גופני, בריאותי או אחר שייגרם למשתמש או לצד שלישי כתוצאה משימוש במידע באתר או מהסתמכות עליו.
2.4. האימונים עצמם במועדון כפופים לחתימה על הצהרת בריאות פיזית נפרדת.

3. פרטיות ורישום
3.1. בעת השארת פרטים באתר (שם, טלפון, מייל), המשתמש מסכים כי הפרטים יישמרו במאגר המידע של העסק לצורך יצירת קשר, תיאום אימון ודיוור שיווקי הקשור לפעילות המועדון.
3.2. העסק מתחייב לא להעביר את פרטי המשתמשים לצד שלישי למטרות מסחריות, למעט ספקים טכניים הנדרשים לתפעול האתר (כגון מערכת הדיוור או ה-CRM).
3.3. המשתמש מצהיר כי הוא מעל גיל 18, או שיש לו אישור הורה/אפוטרופוס להשאיר פרטים.

4. קניין רוחני
4.1. כל התכנים באתר – לרבות הלוגו, העיצוב, הטקסטים, התמונות והסרטונים – הם קניינו הבלעדי של איוון זייצב ו-Reel Rep Fitness.
4.2. אין להעתיק, לשכפל, להפיץ או להשתמש בתוכן ללא אישור בכתב ומראש.

5. שונות
5.1. הנהלת האתר רשאית לשנות את התקנון בכל עת.
5.2. על תקנון זה יחולו דיני מדינת ישראל בלבד. סמכות השיפוט הבלעדית נתונה לבתי המשפט בתל אביב.`;

// Accessibility Content
const ACCESSIBILITY_CONTENT = `הצהרת נגישות

כללי
Reel Rep Fitness רואה חשיבות עליונה במתן שירות שוויוני ונגיש לכלל המתאמנים והגולשים, לרבות אנשים עם מוגבלויות. אנו משקיעים מאמצים רבים כדי להפוך את האתר לנגיש ונוח לשימוש בהתאם לתקן הישראלי (ת"י 5568) ברמה AA.

התאמות הנגישות באתר
באתר זה בוצעו ההתאמות הבאות:

• ניגודיות חזותית: האתר מעוצב בצבעים בעלי ניגודיות גבוהה (טקסט בהיר על רקע כהה ולהפך) לקריאות מיטבית.
• הגדלת טקסט: ניתן לשנות את גודל הטקסט באמצעות הדפדפן (Ctrl +).
• ניווט מקלדת: האתר תומך בניווט מלא באמצעות המקלדת.
• תמיכה בקוראי מסך: האתר נבנה בקוד סמנטי המותאם לקוראי מסך.
• טפסים נגישים: שדות הטפסים כוללים תוויות (Labels) ברורות.

סייגים
למרות מאמצנו להנגיש את כלל הדפים באתר, ייתכן ויתגלו חלקים שטרם הונגשו במלואם. אנו ממשיכים במאמצים לשפר את נגישות האתר כחלק ממחויבותנו לכלל האוכלוסייה.

יצירת קשר בנושאי נגישות
אם נתקלתם בבעיה או שיש לכם הצעה לשיפור, נשמח לשמוע מכם:

• שם רכז הנגישות: איוון זייצב
• טלפון: 0528406273
• אימייל: ivan@reelrep.com`;

// Generic Content Modal Component
const ContentModal = ({
    visible,
    onClose,
    title,
    content
}: {
    visible: boolean;
    onClose: () => void;
    title: string;
    content: string;
}) => (
    <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
    >
        <View className="flex-1 justify-end bg-black/50">
            <View
                className="bg-white rounded-t-3xl"
                style={{
                    maxHeight: '90%',
                    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
                }}
            >
                {/* Handle Bar */}
                <View className="items-center pt-3 pb-2">
                    <View className="w-10 h-1 bg-gray-300 rounded-full" />
                </View>

                {/* Close Button */}
                <Pressable
                    onPress={onClose}
                    className="absolute top-4 left-4 w-10 h-10 items-center justify-center rounded-full bg-gray-100 active:opacity-70 z-10"
                >
                    <X size={20} color="#1C1C1C" />
                </Pressable>

                {/* Header */}
                <Text
                    className="text-[#1C1C1C] text-xl font-bold text-center mt-2 mb-4"
                    style={{ writingDirection: 'rtl' }}
                >
                    {title}
                </Text>

                {/* Content */}
                <ScrollView
                    className="px-6"
                    showsVerticalScrollIndicator={true}
                >
                    <Text
                        className="text-gray-700 text-sm leading-relaxed mb-8"
                        style={{ writingDirection: 'rtl', textAlign: 'right' }}
                    >
                        {content}
                    </Text>
                </ScrollView>
            </View>
        </View>
    </Modal>
);

export default function Footer() {
    const [showClubTerms, setShowClubTerms] = useState(false);
    const [showSiteTerms, setShowSiteTerms] = useState(false);
    const [showAccessibility, setShowAccessibility] = useState(false);

    return (
        <>
            <View
                className="bg-[#2C2C2C] py-12 px-6"
                style={{ borderTopWidth: 1, borderTopColor: '#3C3C3C' }}
            >
                {/* Main Footer Content - Stacks on mobile */}
                <View className="items-center mb-8">

                    {/* Logo & Links */}
                    <View className="items-center mb-8">
                        {/* Logo */}
                        <Image
                            source={require('../assets/RB_Logo_White.png')}
                            style={{ width: 40, height: 40, marginBottom: 16 }}
                            resizeMode="contain"
                        />

                        {/* Legal Links */}
                        <View className="items-center gap-1">
                            <Pressable
                                onPress={() => setShowClubTerms(true)}
                                className="active:opacity-70"
                            >
                                <Text
                                    className="text-gray-400 text-sm"
                                    style={{ writingDirection: 'rtl' }}
                                >
                                    תקנון המועדון
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setShowSiteTerms(true)}
                                className="active:opacity-70"
                            >
                                <Text
                                    className="text-gray-400 text-sm"
                                    style={{ writingDirection: 'rtl' }}
                                >
                                    תקנון האתר
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setShowAccessibility(true)}
                                className="active:opacity-70"
                            >
                                <Text
                                    className="text-gray-400 text-sm"
                                    style={{ writingDirection: 'rtl' }}
                                >
                                    הצהרת נגישות
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => openLink('https://reelrep.plus/')}
                                className="active:opacity-70 mt-1"
                            >
                                <Image
                                    source={require('../assets/images/reelrep-plus-white.png')}
                                    style={{ height: 14, opacity: 0.8 }}
                                    resizeMode="contain"
                                />
                            </Pressable>
                        </View>
                    </View>

                    {/* Social Icons */}
                    <View className="flex-row gap-4">
                        {/* WhatsApp */}
                        <Pressable
                            onPress={() => openLink(WHATSAPP_URL)}
                            className="w-12 h-12 bg-white/10 rounded-full items-center justify-center active:bg-[#D81B60]"
                        >
                            <MessageCircle size={24} color="#FFFFFF" />
                        </Pressable>

                        {/* Instagram */}
                        <Pressable
                            onPress={() => openLink(INSTAGRAM_URL)}
                            className="w-12 h-12 bg-white/10 rounded-full items-center justify-center active:bg-[#D81B60]"
                        >
                            <Instagram size={24} color="#FFFFFF" />
                        </Pressable>

                        {/* Waze / Map */}
                        <Pressable
                            onPress={() => openLink(WAZE_URL)}
                            className="w-12 h-12 bg-white/10 rounded-full items-center justify-center active:bg-[#D81B60]"
                        >
                            <MapPin size={24} color="#FFFFFF" />
                        </Pressable>
                    </View>
                </View>

                {/* Copyright - Centered */}
                <View className="items-center">
                    <Text className="text-gray-600 text-xs text-center">
                        © 2024 Reel Rep Fitness. All rights reserved.
                    </Text>
                </View>
            </View>

            {/* Club Terms Modal */}
            <ContentModal
                visible={showClubTerms}
                onClose={() => setShowClubTerms(false)}
                title="תקנון המועדון"
                content={CLUB_TERMS}
            />

            {/* Site Terms Modal */}
            <ContentModal
                visible={showSiteTerms}
                onClose={() => setShowSiteTerms(false)}
                title="תקנון ותנאי שימוש"
                content={SITE_TERMS}
            />

            {/* Accessibility Modal */}
            <ContentModal
                visible={showAccessibility}
                onClose={() => setShowAccessibility(false)}
                title="הצהרת נגישות"
                content={ACCESSIBILITY_CONTENT}
            />
        </>
    );
}
