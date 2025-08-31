import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInRight, FadeInUp } from 'react-native-reanimated';
import Button from '../../../components/common/Botton';
import { Ionicons } from '@expo/vector-icons';

// Import your local image
import TransferImage from '../../../assets/images/transfer.png'; 

export default function OnboardingSlide1() {
  const handleNext = () => {
    router.push('/(auth)/onboarding/slide2');
  };

  const handleSkip = () => {
    router.push('/(auth)/signup');
  };

  return (
    <View className="flex-1 bg-white">
        <StatusBar
              barStyle="dark-content" 
              backgroundColor="#ffffff" 
              translucent={false}
            />
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
        <View className="flex-row space-x-3">
          <View className="h-2 flex-1 mx-1 bg-green-600 rounded-full" />
          <View className="h-2 flex-1 mx-1 bg-gray-200 rounded-full" />
          <View className="h-2 flex-1 mx-1 bg-gray-200 rounded-full" />
        </View>
      </Animated.View>

      {/* Content */}
      <View className="flex-1 px-6 justify-center items-center">
        {/* Simple Image */}
        <Animated.Image 
          entering={FadeInUp.duration(800)}
          source={TransferImage}
          className="w-72 h-72 mb-8"
          resizeMode="contain"
        />

        {/* Title & Description */}
        <Animated.View entering={FadeInUp.duration(800).delay(200)}>
          <Text className="text-gray-900 text-3xl font-bold text-center mb-4 leading-10 tracking-tight">
            Send money{'\n'}
            <Text className="text-green-600">instantly</Text>
          </Text>
          <Text className="text-gray-600 text-base text-center leading-6 max-w-[300px]">
            Transfer money to anyone, anywhere in seconds. No more waiting for traditional bank transfers.
          </Text>
        </Animated.View>
      </View>

      {/* Bottom Button */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(400)}
        className="px-6 pb-8"
      >
        <Button
          title="Continue"
          onPress={handleNext}
          size="large"
          icon={() => <Ionicons name="arrow-forward" size={20} color="white" />}
        />
      </Animated.View>
    </View>
  );
}
