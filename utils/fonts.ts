/**
 * Font Utility for Web/Native Platform
 * 
 * Web uses Google Fonts (Heebo for Hebrew, Inter for Latin)
 * Native uses Shorai Sans
 */

import { Platform } from 'react-native';

// Primary font family for the app
export const fontFamily = Platform.OS === 'web'
    ? 'Heebo, Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    : 'Shorai Sans';

// Font family constant for inline usage
export const getWebFontFamily = () => fontFamily;
