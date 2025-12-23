import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, useWindowDimensions, Platform } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    FadeInDown,
    FadeOutUp,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { ArrowRight, ArrowLeft } from 'lucide-react-native';

interface Testimonial {
    quote: string;
    name: string;
    designation: string;
    src: string | number; // Support both URI strings and require() numbers
}

interface AnimatedTestimonialsProps {
    testimonials: Testimonial[];
    autoplay?: boolean;
}

/**
 * AnimatedTestimonials Component
 * 
 * 3D rotated image stack with staggered text reveal for social proof.
 * Fully RTL-compliant for Hebrew content.
 * 
 * FEATURES:
 * - Messy image stack with random rotations
 * - Smooth spring animations
 * - RTL layout with images above text
 * - Navigation arrows in same row as name
 * - Responsive mobile/desktop layouts
 * 
 * RTL SPECIFICS:
 * - Images at top (centered)
 * - Name & arrows in same row
 * - Icons: ArrowRight = Previous, ArrowLeft = Next
 * - Text alignment: Right-aligned
 * - Direction: RTL flow
 */
export function AnimatedTestimonials({
    testimonials,
    autoplay = false,
}: AnimatedTestimonialsProps) {
    const [active, setActive] = useState(0);
    const { width } = useWindowDimensions();
    const isDesktop = width >= 768;

    // Generate random rotations once on mount (don't recalculate on re-render)
    const randomRotations = useMemo(
        () => testimonials.map(() => Math.random() * 20 - 10), // -10 to 10 degrees
        [testimonials.length]
    );

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrevious = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <View className="max-w-sm md:max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-20 bg-background">
            <View className="flex-col gap-8">
                {/* Image Stack - At top */}
                <View
                    className="relative w-full items-center justify-center mx-auto"
                    style={{
                        height: isDesktop ? undefined : 320,
                        aspectRatio: isDesktop ? 1 : undefined, // Square on desktop
                        maxWidth: isDesktop ? 500 : undefined,
                    }}
                >
                    {testimonials.map((testimonial, index) => (
                        <ImageCard
                            key={typeof testimonial.src === 'string' ? testimonial.src : `image-${index}`}
                            testimonial={testimonial}
                            index={index}
                            active={active}
                            rotation={randomRotations[index]}
                        />
                    ))}
                </View>

                {/* Text Content - Below images */}
                <View className="flex flex-col gap-6">
                    {/* Name & Navigation Arrows in same row */}
                    <View className="flex-row-reverse items-center justify-between">
                        {/* Name & Role */}
                        <View className="flex-1">
                            <Animated.Text
                                key={`name-${active}`}
                                entering={FadeInDown.duration(400).delay(100)}
                                exiting={FadeOutUp.duration(200)}
                                className="text-2xl md:text-3xl font-bold text-white text-right"
                                style={{ writingDirection: 'rtl' }}
                            >
                                {testimonials[active].name}
                            </Animated.Text>
                            <Animated.Text
                                key={`role-${active}`}
                                entering={FadeInDown.duration(400).delay(200)}
                                exiting={FadeOutUp.duration(200)}
                                className="text-sm md:text-base text-gray-400 text-right mt-1"
                                style={{ writingDirection: 'rtl' }}
                            >
                                {testimonials[active].designation}
                            </Animated.Text>
                        </View>

                        {/* Navigation Buttons (RTL: Right = Prev, Left = Next) */}
                        <View className="flex-row-reverse gap-3">
                            {/* Previous Button (Right Arrow in RTL) */}
                            <Pressable
                                onPress={handlePrevious}
                                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink active:bg-pink/80"
                                style={({ pressed }) => ({
                                    backgroundColor: pressed ? '#D81B60' : '#2C2C2C',
                                    opacity: pressed ? 0.8 : 1,
                                })}
                            >
                                <ArrowRight size={20} color="#FFFFFF" />
                            </Pressable>

                            {/* Next Button (Left Arrow in RTL) */}
                            <Pressable
                                onPress={handleNext}
                                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink active:bg-pink/80"
                                style={({ pressed }) => ({
                                    backgroundColor: pressed ? '#D81B60' : '#2C2C2C',
                                    opacity: pressed ? 0.8 : 1,
                                })}
                            >
                                <ArrowLeft size={20} color="#FFFFFF" />
                            </Pressable>
                        </View>
                    </View>

                    {/* Quote */}
                    <Animated.Text
                        key={`quote-${active}`}
                        entering={FadeInDown.duration(400).delay(300)}
                        exiting={FadeOutUp.duration(200)}
                        className="text-lg md:text-xl text-white/90 font-normal leading-relaxed text-right"
                        style={{ writingDirection: 'rtl' }}
                    >
                        {testimonials[active].quote}
                    </Animated.Text>
                </View>
            </View>
        </View>
    );
}

/**
 * ImageCard Component
 * 
 * Individual image in the stack with rotation and scale animations.
 */
interface ImageCardProps {
    testimonial: Testimonial;
    index: number;
    active: number;
    rotation: number;
}

function ImageCard({ testimonial, index, active, rotation }: ImageCardProps) {
    const isActive = index === active;
    const offset = (index - active + 3) % 3; // Distance from active (0, 1, 2)

    const animatedStyle = useAnimatedStyle(() => {
        // Active card: centered, no rotation, full scale
        if (isActive) {
            return {
                transform: [
                    { scale: withSpring(1, { damping: 25, stiffness: 80 }) },
                    { rotate: withSpring('0deg', { damping: 25, stiffness: 80 }) },
                    { translateX: withSpring(0, { damping: 25, stiffness: 80 }) },
                    { translateY: withSpring(0, { damping: 25, stiffness: 80 }) },
                ],
                opacity: withTiming(1, { duration: 500 }),
                zIndex: 10,
            };
        }

        // Background cards: smaller, rotated, offset
        const distance = Math.abs(index - active);
        const scale = interpolate(
            distance,
            [0, 1, 2, 3],
            [1, 0.95, 0.9, 0.85],
            Extrapolation.CLAMP
        );

        const translateX = offset === 1 ? -20 : offset === 2 ? 20 : 0;
        const translateY = offset * 10;

        return {
            transform: [
                { scale: withSpring(scale, { damping: 25, stiffness: 80 }) },
                { rotate: withSpring(`${rotation}deg`, { damping: 25, stiffness: 80 }) },
                { translateX: withSpring(translateX, { damping: 25, stiffness: 80 }) },
                { translateY: withSpring(translateY, { damping: 25, stiffness: 80 }) },
            ],
            opacity: withTiming(isActive ? 1 : 0.6, { duration: 500 }),
            zIndex: 10 - distance,
        };
    });

    // Handle both URI strings and require() numbers
    const imageSource = typeof testimonial.src === 'string'
        ? { uri: testimonial.src }
        : testimonial.src;

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    width: '80%',
                    height: '100%',
                },
                animatedStyle,
            ]}
            pointerEvents={isActive ? 'auto' : 'none'}
        >
            <Image
                source={imageSource}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                }}
                contentFit="cover"
            />
        </Animated.View>
    );
}

export default AnimatedTestimonials;
