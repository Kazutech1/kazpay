// app/(auth)/login.tsx
import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image, TextInput, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

// Import logo from assets
import Logo from '../../assets/images/logo.png';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to dashboard after successful login
        router.replace("/(tabs)/home");
    }, 2000);
  };

  const handleForgotPassword = () => {
    // router.push('/(auth)/forgot-password');
  };

  const handleSignUp = () => {
    router.push('/(auth)/signup');
  };

  const handleBiometric = () => {
    // Handle biometric login
    console.log('Biometric login');
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-white" 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#22c55e" />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header with gradient background */}
      <LinearGradient
  colors={['#22c55e', '#16a34a']}
  className="pt-10 px-6 pb-12 h-64 rounded-7xl"
>
  <View className="flex-row items-center justify-between mb-8">
    <TouchableOpacity 
      onPress={() => router.back()}
      className="w-10 h-10 items-center justify-center rounded-full bg-white/20"
    >
      <Ionicons name="arrow-back" size={20} color="white" />
    </TouchableOpacity>
    
    <Image
      source={Logo}
      className="w-16 h-16"
      style={{ tintColor: 'white' }}
      resizeMode="cover"
      
    />
  </View>
  

</LinearGradient>

        {/* Login Form */}
        <Animated.View 
          entering={FadeInUp.duration(800).delay(200)}
          className="px-6 -top-20"
        >
          <View className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5">
            <Text className="text-gray-900 text-2xl font-bold mb-2">
              Welcome back
            </Text>
            <Text className="text-gray-600 text-sm mb-6">
              Sign in to your account to continue
            </Text>

            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-gray-700 text-sm font-medium mb-2">Email Address</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                <Ionicons name="mail-outline" size={20} color="#6b7280" className="mr-3" />
                <TextInput
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 text-gray-900"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              {errors.email && (
                <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>
              )}
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <Text className="text-gray-700 text-sm font-medium mb-2">Password</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                <Ionicons name="lock-closed-outline" size={20} color="#6b7280" className="mr-3" />
                <TextInput
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  className="flex-1 text-gray-900"
                  placeholderTextColor="#9ca3af"
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Ionicons 
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#6b7280" 
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>
              )}
            </View>

            <TouchableOpacity 
              onPress={handleForgotPassword}
              className="self-end mb-6"
            >
              <Text className="text-green-600 font-medium text-sm">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className="bg-green-600 rounded-xl py-4 px-6 items-center mb-4 flex-row justify-center"
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="white" className="mr-2" />
              ) : (
                <Ionicons name="log-in-outline" size={20} color="white" className="mr-2" />
              )}
              <Text className="text-white font-semibold text-base">
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Biometric Login */}
            <TouchableOpacity
              onPress={handleBiometric}
              className="border border-gray-300 rounded-xl py-4 px-6 items-center mb-6 flex-row justify-center"
              activeOpacity={0.8}
            >
              <Ionicons name="finger-print-outline" size={20} color="#6b7280" className="mr-2" />
              <Text className="text-gray-700 font-medium text-base">Use Fingerprint</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="mx-4 text-gray-500 text-sm">or continue with</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Social Login */}
            <View className="flex-row justify-center space-x-4">
              <TouchableOpacity className="w-12 h-12 mx-2 bg-gray-100 rounded-xl items-center justify-center">
                <Ionicons name="logo-google" size={24} color="#db4437" />
              </TouchableOpacity>
              <TouchableOpacity className="w-12 h-12 mx-2 bg-gray-100 rounded-xl items-center justify-center">
                <Ionicons name="logo-apple" size={24} color="#000000" />
              </TouchableOpacity>
            
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Sign Up */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(400)}
        className="px-6 pb-8 pt-6 bg-gray-50"
      >
        <View className="flex-row justify-center">
          <Text className="text-gray-600 text-sm">Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text className="text-green-600 font-semibold text-sm">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}