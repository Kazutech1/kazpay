// app/(auth)/onboarding/slide3.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInRight, FadeInUp } from 'react-native-reanimated';
import Button from '../../../components/common/Botton';
import { Ionicons } from '@expo/vector-icons';

// Import your local image
import AnalyticsImage from '../../../assets/images/analytics.png';

export default function OnboardingSlide3() {
  const handleGetStarted = () => {
    router.push('/(auth)/signup');
  };

  const handleSkip = () => {
    router.push('/(auth)/signup');
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header with Skip Button */}
      <Animated.View 
        entering={FadeIn.duration(600)}
        className="pt-16 px-6 flex-row justify-between items-center"
      >
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
        >
          <Ionicons name="arrow-back" size={20} color="#4b5563" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleSkip} 
          className="py-2 px-4 rounded-lg"
        >
          <Text className="text-gray-500 font-medium">Skip</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Progress Indicator */}
      <Animated.View 
        entering={FadeInRight.duration(800).delay(200)}
        className="px-6 mb-8 mt-6"
      >
        <View className="flex-row space-x-2">
          <View className="h-2 flex-1 mx-1 bg-green-600 rounded-full" />
          <View className="h-2 flex-1 mx-1 bg-green-600 rounded-full" />
          <View className="h-2 flex-1 mx-1 bg-green-600 rounded-full" />
        </View>
      </Animated.View>

      {/* Content */}
      <View className="flex-1 px-6 justify-center items-center">
        {/* Simple Image */}
        <Animated.Image 
          entering={FadeInUp.duration(800)}
          source={AnalyticsImage}
          className="w-72 h-72 mb-8"
          resizeMode="contain"
        />

        {/* Title & Description */}
        <Animated.View entering={FadeInUp.duration(800).delay(200)}>
          <Text className="text-gray-900 text-3xl font-bold text-center mb-4 leading-10 tracking-tight">
            Smart insights{'\n'}
            <Text className="text-green-600">& budgeting</Text>
          </Text>
          <Text className="text-gray-600 text-base text-center leading-6 max-w-[300px]">
            Track your spending, set budgets, and get personalized insights to help you save better.
          </Text>
        </Animated.View>
      </View>

      {/* Bottom Button */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(400)}
        className="px-6 pb-8"
      >
        <Button
          title="Get Started"
          onPress={handleGetStarted}
          size="large"
          icon={() => <Ionicons name="rocket" size={20} color="white" />}
        />
      </Animated.View>
    </View>
  );
}
