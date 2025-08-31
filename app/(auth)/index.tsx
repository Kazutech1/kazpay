// app/(auth)/index.tsx
import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown } from 'react-native-reanimated';
import Logo from '../../components/common/Logo';
import { Ionicons } from '@expo/vector-icons';

// Import local hero illustration (replace with your own PNG/SVG asset)
import HeroImage from '../../assets/images/hero.png';

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.push('/(auth)/onboarding/slide1');
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <View className="flex-1">
      {/* StatusBar with background color matching the gradient */}
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#22c55e" 
        translucent={false}
      />

      {/* Gradient Background */}
      <LinearGradient
        colors={['#22c55e', '#16a34a']}
        className="absolute inset-0"
      />

      {/* Floating Circles (decor) */}
      <Animated.View
        entering={FadeIn.duration(1200)}
        className="absolute top-20 -left-10 w-40 h-40 bg-white/10 rounded-full"
      />
      <Animated.View
        entering={FadeIn.duration(1400).delay(200)}
        className="absolute bottom-32 -right-12 w-52 h-52 bg-white/10 rounded-full"
      />

      {/* Content */}
      <View className="flex-1 px-6 justify-center">
        {/* Logo */}

        {/* Hero Illustration */}
        <Animated.Image
          entering={FadeInUp.duration(1000).delay(200)}
          source={HeroImage}
          className="w-72 h-72 self-center mb-10"
          resizeMode="contain"
        />

        {/* Title + Subtitle */}
        <Animated.View entering={FadeInUp.duration(800).delay(400)}>
          <Text className="text-white text-4xl font-extrabold text-center mb-4 leading-tight">
            The future of{'\n'}digital payments
          </Text>
          <Text className="text-white/80 text-base text-center leading-6 max-w-[320px] self-center">
            Fast, secure, and effortless money transfers — all in one app.
          </Text>
        </Animated.View>
      </View>

      {/* Bottom Buttons */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(600)}
        className="px-6 pb-10"
      >
        <TouchableOpacity
          onPress={handleGetStarted}
          className="bg-white rounded-full py-4 px-6 mb-4 flex-row items-center justify-center"
          activeOpacity={0.8}
        >
          <Text className="text-green-600 text-lg font-semibold mr-2">Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="#16a34a" />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={handleLogin}
          className="border border-white rounded-full py-4 px-6 flex-row items-center justify-center"
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg font-semibold mr-2">I already have an account</Text>
          <Ionicons name="log-in" size={20} color="white" />
        </TouchableOpacity>
      </Animated.View>

      {/* Footer */}
      <Animated.View 
        entering={FadeIn.duration(800).delay(800)}
        className="pb-6 px-6"
      >
        <Text className="text-white/70 text-xs text-center">
          By continuing, you agree to our{' '}
          <Text className="text-white font-medium">Terms</Text> &{' '}
          <Text className="text-white font-medium">Privacy Policy</Text>
        </Text>
      </Animated.View>
    </View>
  );
}