import React from 'react';
import { View, ScrollView } from 'react-native';
import AnimatedTestimonials from '@/components/ui/animated-testimonials';

/**
 * Example usage of AnimatedTestimonials component
 * with Hebrew testimonials for Reel Rep Training
 */

const testimonials = [
    {
        quote: "השיטה של ריל רפ שינתה לי את החיים. אני חזק יותר, בריא יותר ובטוח יותר בעצמי מאי פעם.",
        name: "יוסי כהן",
        designation: "ספורטאי מקצועי",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    },
    {
        quote: "אחרי שנים של אימונים רגילים, ריל רפ הראה לי מה זה באמת להתאמן נכון. התוצאות מדברות בעד עצמן.",
        name: "שרה לוי",
        designation: "מאמנת כושר",
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
    },
    {
        quote: "הגישה הפונקציונאלית והמקצועיות של ריל רפ הם ברמה אחרת לגמרי. ממליץ בחום!",
        name: "דני אברהם",
        designation: "מתאמן פרטי",
        src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop",
    },
    {
        quote: "לא האמנתי שאפשר להשיג תוצאות כאלה בגיל שלי. ריל רפ הוכיח לי שאין גבול לגיל.",
        name: "מיכל דוד",
        designation: "גיל 55",
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
    },
];

export default function TestimonialsExample() {
    return (
        <ScrollView className="flex-1 bg-background">
            <AnimatedTestimonials testimonials={testimonials} />
        </ScrollView>
    );
}
