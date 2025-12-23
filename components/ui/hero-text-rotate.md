# HeroTextRotate Component

## Overview

A React Native component that displays animated rotating text with staggered character animations, inspired by 21dev's `TextRotate` component. Built specifically for the Reel Rep Training brand.

## Features

- ✅ **Staggered Character Animation**: Each character animates in with a 50ms delay
- ✅ **Responsive Layout**: Stacked on mobile, horizontal on tablet/desktop
- ✅ **LTR Direction Forcing**: Prevents dot misplacement on Hebrew devices
- ✅ **Customizable**: Static text, suffixes, and interval can be configured
- ✅ **Smooth Animations**: Uses react-native-reanimated for 60fps performance

## File Location

```
/components/ui/hero-text-rotate.tsx
```

## Usage

### Basic Usage

```typescript
import HeroTextRotate from '@/components/ui/hero-text-rotate';

export default function MyHero() {
  return <HeroTextRotate />;
}
```

### Custom Configuration

```typescript
<HeroTextRotate 
  staticText="reel rep"
  suffixes={['.fitness', '.plus', '.training']}
  interval={3000}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `staticText` | `string` | `"reel rep"` | The static part of the text (white) |
| `suffixes` | `string[]` | `['.fitness', '.plus', '.training']` | Array of rotating suffixes (pink) |
| `interval` | `number` | `3000` | Milliseconds between rotations |

## Responsive Behavior

### Mobile (375px-639px)

```
┌───────────────────────┐
│                       │
│      reel rep         │  ← Static (White)
│      .fitness         │  ← Animated (Pink)
│                       │
└───────────────────────┘
```

- **Layout**: Stacked vertically (`flex-col`)
- **Font Size**: `48px` (text-5xl)
- **Letter Spacing**: `-2px`
- **Container Height**: `60px` for animated suffix

### Tablet/Desktop (640px+)

```
┌───────────────────────────────────────────────┐
│                                               │
│         reel rep.fitness                      │
│                                               │
└───────────────────────────────────────────────┘
```

- **Layout**: Horizontal (`flex-row`)
- **Font Size**: `96px` (text-8xl)
- **Letter Spacing**: `-5px`
- **Container Height**: `110px` for animated suffix

## Animation Details

### Enter Animation
- **Effect**: `FadeInDown`
- **Delay**: `index * 50ms` (staggered)
- **Spring**: `damping(12)` for smooth bounce

### Exit Animation
- **Effect**: `FadeOutUp`
- **Duration**: `150ms` (quick fade)

### Character Rendering
Each character is rendered as a separate `Animated.Text` component with a unique key:

```typescript
key={`word-${currentIndex}-char-${index}`}
```

This ensures proper re-render and animation triggering when the word changes.

## RTL Handling

⚠️ **CRITICAL**: This component forces LTR direction because the content is English.

```typescript
<View style={{ direction: 'ltr' }}>
  {/* Content */}
</View>
```

Without this, the dot (`.`) would appear on the wrong side on Hebrew devices:
- ❌ Wrong: `fitness.` (dot on right)
- ✅ Correct: `.fitness` (dot on left)

## Styling

### Font
- **Family**: `Shorai Sans` (with fallbacks for web)
- **Weight**: `900` (Black/Heavy)

### Colors
- **Static Text**: `#FFFFFF` (White)
- **Animated Suffix**: `#D81B60` (Pink - including the dot)

### Spacing
- **Padding**: Responsive (`px-4 md:px-8 lg:px-12`)
- **Letter Spacing**: Tight (`-2px` mobile, `-5px` desktop)

## Integration Example

See `/components/examples/HeroWithTextRotate.tsx` for a complete hero section example.

### Quick Integration into Existing Hero

Replace the static header in `AnimatedHero` (lines 77-88):

```typescript
// Before
<Text style={{ ... }}>
  reel rep<Text className="text-pink">.</Text>training
</Text>

// After
<HeroTextRotate />
```

## Testing Checklist

- [x] Mobile (375px) - Stacked layout works
- [x] Tablet (768px) - Horizontal layout works
- [x] Desktop (1440px) - Large text renders correctly
- [x] LTR direction forced
- [x] Dot stays with animated suffix
- [x] Staggered animation timing correct
- [x] Smooth transitions between words
- [x] No TypeScript errors

## Technical Notes

### Why Not Use Framer Motion?
The original 21dev component uses Framer Motion, which is web-only. We use `react-native-reanimated` for cross-platform support.

### Why Force LTR?
React Native's `I18nManager.forceRTL()` is unreliable on web. Since the content is English, we hardcode LTR to prevent layout issues.

### Performance
- Uses `react-native-reanimated` for 60fps animations
- Minimal re-renders (only when `currentIndex` changes)
- Efficient character splitting (done once per rotation)

## Troubleshooting

### Dot appears on wrong side
**Solution**: Ensure `style={{ direction: 'ltr' }}` is applied to the container.

### Animation doesn't trigger
**Solution**: Check that the `key` prop includes both word index and character index.

### Text too small/large
**Solution**: Adjust breakpoints in `useWindowDimensions()` or modify font sizes in `textStyle`.

### Characters don't stagger
**Solution**: Verify the `delay(index * 50)` is applied in the `entering` animation.

## Future Enhancements

- [ ] Add pause on hover (web only)
- [ ] Support for custom colors per suffix
- [ ] Configurable animation timing
- [ ] Support for RTL content (if needed)
- [ ] Add accessibility labels

## Credits

- **Inspired by**: 21dev TextRotate component
- **Built for**: Reel Rep Training
- **Tech Stack**: React Native + Reanimated + NativeWind
