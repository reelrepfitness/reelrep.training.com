/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#D81B60'; // The pink color used in the design
const tintColorDark = '#D81B60';

export const Colors = {
    light: {
        text: '#11181C',
        background: '#fff',
        tint: tintColorLight,
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: tintColorLight,
        primary: '#D81B60',
        secondary: '#E0E0E0',
        card: '#F8F9FA',
        border: '#E0E0E0',
    },
    dark: {
        text: '#ECEDEE',
        background: '#1C1C1C',
        tint: tintColorDark,
        icon: '#9BA1A6',
        tabIconDefault: '#9BA1A6',
        tabIconSelected: tintColorDark,
        primary: '#D81B60',
        secondary: '#333333',
        card: '#2A2A2A',
        border: '#444444',
    },
};
