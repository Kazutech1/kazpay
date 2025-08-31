// src/screens/auth/SplashScreen.jsx
import React, { useEffect } from 'react';
import { View, Text, StatusBar, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../../components/common/Logo';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Animate logo entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to welcome screen after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#15803d" />
      <LinearGradient
        colors={['#16a34a', '#15803d']}
        className="flex-1 items-center justify-center px-6"
      >
        <Animated.View 
          className="items-center"
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <Logo size="xlarge" showText={true} variant="splash" />
          <Text className="text-white/90 text-base mt-4 text-center leading-6">
            Your trusted digital wallet
          </Text>
        </Animated.View>

        {/* Loading indicator */}
        <Animated.View 
          className="absolute bottom-20"
          style={{ opacity: fadeAnim }}
        >
          <View className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default SplashScreen;