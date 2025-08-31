// components/signup/Step1.tsx
import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Logo from '../../assets/images/logo.png';
import { Image } from 'react-native';

interface Step1Props {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  updateFormData: (field: string, value: string) => void;
  nextStep: () => void;
  isLoading?: boolean;
}

export default function SignupStep1({ formData, updateFormData, nextStep, isLoading = false }: Step1Props) {
  const canProceed = formData.firstName && formData.lastName && formData.email && formData.phone;

  const handleGoogleSignup = () => {
    console.log('Google signup');
  };

  const handleAppleSignup = () => {
    console.log('Apple signup');
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-white" 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#22c55e" />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Header with gradient background */}
        <LinearGradient
          colors={['#22c55e', '#16a34a']}
          className="pt-10 px-6 pb-12 h-72 rounded-b-3xl"
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
              resizeMode="contain"
            />
          </View>
          
          <View className="items-center">
            <Text className="text-white text-2xl font-bold mb-2">Create Account</Text>
            <Text className="text-white/90 text-sm">Step 1 of 2: Personal Information</Text>
          </View>
          
          {/* Progress Indicator */}
          <View className="flex-row items-center justify-center mt-6">
            <View className="w-8 h-8 rounded-full bg-white items-center justify-center shadow-sm">
              <Text className="text-green-600 text-sm font-semibold">1</Text>
            </View>
            <View className="w-16 h-1 bg-white/40 mx-2 rounded-full">
              <View className="h-1 bg-white rounded-full" style={{ width: '0%' }} />
            </View>
            <View className="w-8 h-8 rounded-full border-2 border-white/40 items-center justify-center">
              <Text className="text-white/70 text-sm font-medium">2</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Form */}
        <Animated.View 
          entering={FadeInUp.duration(800).delay(200)}
          className="px-6 -top-20"
        >
          <View className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5">
            {/* Social Login Buttons */}
        
              
              {/* Divider */}
            
            {/* Full Name Row */}
            <View className="mb-6">
              <Text className="text-gray-800 text-base font-semibold mb-4">Full Name</Text>
              <View className="flex space-x-4">
                <View className="flex-1">
                  <Text className="text-gray-600 text-sm font-medium mb-2">First name</Text>
                  <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                    <Ionicons name="person-outline" size={20} color="#6b7280" className="mr-3" />
                    <TextInput
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChangeText={(value) => updateFormData('firstName', value)}
                      className="flex-1 text-gray-900 text-base"
                      placeholderTextColor="#9ca3af"
                      autoCapitalize="words"
                    />
                  </View>
                </View>
                
                <View className="flex-1">
                  <Text className="text-gray-600 text-sm font-medium mb-2">Last name</Text>
                  <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                    <Ionicons name="people-outline" size={20} color="#6b7280" className="mr-3" />
                    <TextInput
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChangeText={(value) => updateFormData('lastName', value)}
                      className="flex-1 text-gray-900 text-base"
                      placeholderTextColor="#9ca3af"
                      autoCapitalize="words"
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Contact Information */}
            <View className="mb-1">
              <Text className="text-gray-800 text-base font-semibold mb-4">Contact Information</Text>
              
              {/* Email Input */}
              <View className="mb-5">
                <Text className="text-gray-600 text-sm font-medium mb-2">Email address</Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                  <Ionicons name="mail-outline" size={20} color="#6b7280" className="mr-3" />
                  <TextInput
                    placeholder="Enter email address"
                    value={formData.email}
                    onChangeText={(value) => updateFormData('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="flex-1 text-gray-900 text-base"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              {/* Phone Input */}
              <View className="mb-7">
                <Text className="text-gray-600 text-sm font-medium mb-2">Phone number</Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                  <Ionicons name="call-outline" size={20} color="#6b7280" className="mr-3" />
                  <TextInput
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChangeText={(value) => updateFormData('phone', value)}
                    keyboardType="phone-pad"
                    className="flex-1 text-gray-900 text-base"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>
            </View>

            {/* Next Button */}
            <TouchableOpacity
              onPress={nextStep}
              disabled={!canProceed || isLoading}
              className={`rounded-xl py-4 px-6 items-center mb-6 flex-row justify-center ${
                canProceed ? 'bg-green-600' : 'bg-gray-200'
              }`}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="white" className="mr-2" />
              ) : (
                <Ionicons name="arrow-forward-outline" size={20} color={canProceed ? "white" : "#9ca3af"} className="mr-2" />
              )}
              <Text className={`font-semibold text-base ${
                canProceed ? 'text-white' : 'text-gray-500'
              }`}>
                {isLoading ? 'Processing...' : 'Continue'}
              </Text>
            </TouchableOpacity>
            
            <Text className="text-gray-400 text-xs text-center px-4">
              By continuing, you agree to our Terms of Service and Privacy Policy. 
              Your information is securely encrypted.
            </Text>
          </View>

            <View className="flex-row items-center mb-6">
                <View className="flex-1 h-px bg-gray-200" />
                <Text className="mx-4 text-gray-500 text-xs font-medium">or continue with email</Text>
                <View className="flex-1 h-px bg-gray-200" />
              </View>



                  <View className="mb-8">
              <View className="flex-row space-x-4 mb-6">
                <TouchableOpacity
                  onPress={handleGoogleSignup}
                  className="flex-1 border border-gray-200 rounded-xl py-3.5 items-center flex-row justify-center m-3 bg-white"
                  activeOpacity={0.8}
                >
                  <Ionicons name="logo-google" size={20} color="#DB4437" className="mr-2" />
                  <Text className="text-gray-700 font-medium text-sm">Google</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={handleAppleSignup}
                  className="flex-1 border border-gray-200 rounded-xl py-3.5 items-center flex-row justify-center m-3 bg-black"
                  activeOpacity={0.8}
                >
                  <Ionicons name="logo-apple" size={20} color="white" className="mr-2" />
                  <Text className="text-white font-medium text-sm">Apple</Text>
                </TouchableOpacity>
              </View>
            </View>


          {/* Already have account section */}
          <View className="flex-row justify-center mt-8 mb-10">
            <Text className="text-gray-600 text-sm">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text className="text-green-600 font-semibold text-sm">Sign In</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}