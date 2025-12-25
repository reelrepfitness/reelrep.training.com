/**
 * Email Service for Form Submissions
 * Uses EmailJS to send form data directly to ivan@reelrep.com
 * Emails are sent automatically - no user action needed!
 */

import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_vq7piwa';
const EMAILJS_TEMPLATE_ID = 'template_dtvk7a4';
const EMAILJS_PUBLIC_KEY = 'CvclJAVPpGfzGGKSj';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

interface LeadFormData {
    name: string;
    email: string;
    phone: string;
}

interface RookieFormData {
    name: string;
    phone: string;
    hasInjury: boolean;
    injuryDetails?: string;
    experienceLevel: string;
    experienceDetails?: string;
}

/**
 * Send Lead Form submission via EmailJS (automatic)
 */
export const sendLeadFormEmail = async (data: LeadFormData): Promise<boolean> => {
    try {
        const message = `
🔥 ליד חדש מהאתר!
------------------
👤 שם: ${data.name}
📧 מייל: ${data.email}
📱 טלפון: ${data.phone}
🔞 18+: מאושר
🧠 מיינדסט: מאושר
        `.trim();

        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                from_name: data.name,
                message: message,
                reply_to: data.email,
            }
        );

        console.log('Lead form email sent automatically!');
        return true;
    } catch (error) {
        console.error('Failed to send lead form email:', error);
        return false;
    }
};

/**
 * Send Rookie Form submission via EmailJS (automatic)
 */
export const sendRookieFormEmail = async (data: RookieFormData): Promise<boolean> => {
    try {
        const message = `
🏋️ שאלון אימון ראשון חדש!
------------------
👤 שם: ${data.name}
📱 טלפון: ${data.phone}
⚠️ רגישויות/פציעות: ${data.hasInjury ? data.injuryDetails : 'אין'}
💪 ניסיון: ${data.experienceLevel}
${data.experienceDetails ? `📝 פרטי ניסיון: ${data.experienceDetails}` : ''}
✅ הצהרת בריאות: מאושר
        `.trim();

        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                from_name: data.name,
                message: message,
                reply_to: `${data.phone}@reelrep.training`,
            }
        );

        console.log('Rookie form email sent automatically!');
        return true;
    } catch (error) {
        console.error('Failed to send rookie form email:', error);
        return false;
    }
};
