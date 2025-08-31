// components/signup/Step2.tsx
import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Logo from '../../assets/images/logo.png';
import { Image } from 'react-native';
import { router } from 'expo-router';

interface Step2Props {
  formData: {
    password: string;
    confirmPassword: string;
  };
  updateFormData: (field: string, value: string) => void;
  prevStep: () => void;
  onSignupComplete: () => void;
}

export default function SignupStep2({ formData, updateFormData, prevStep, onSignupComplete }: Step2Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const passwordsMatch = formData.password === formData.confirmPassword;
  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasLowerCase = /[a-z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
  const isPasswordStrong = formData.password.length >= 8 && hasUpperCase && hasLowerCase && hasNumber;
  
  const canComplete = formData.password && formData.confirmPassword && passwordsMatch && isPasswordStrong;

  const handleComplete = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSignupComplete();
    }, 2000);

    router.replace("/(tabs)/home")
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
              onPress={prevStep}
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
            <Text className="text-white text-2xl font-bold mb-2">Security Setup</Text>
            <Text className="text-white/90 text-sm">Step 2 of 2: Password Creation</Text>
          </View>
          
          {/* Progress Indicator */}
          <View className="flex-row items-center justify-center mt-6">
            <View className="w-8 h-8 rounded-full border-2 border-white/40 items-center justify-center bg-white/20">
              <Text className="text-white/70 text-sm font-medium">1</Text>
            </View>
            <View className="w-16 h-1 bg-white/40 mx-2 rounded-full">
              <View className="h-1 bg-white rounded-full" style={{ width: '100%' }} />
            </View>
            <View className="w-8 h-8 rounded-full bg-white items-center justify-center shadow-sm">
              <Text className="text-green-600 text-sm font-semibold">2</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Form */}
        <Animated.View 
          entering={FadeInUp.duration(800).delay(200)}
          className="px-6 -top-20"
        >
          <View className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5">
            {/* Security Tips */}
            <View className="mb-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <View className="flex-row items-start mb-2">
                <Ionicons name="shield-checkmark-outline" size={18} color="#22c55e" className="mr-2 mt-0.5" />
                <Text className="text-green-800 text-sm font-semibold flex-1">Security Recommendation</Text>
              </View>
              <Text className="text-green-600 text-xs">
                Use a strong, unique password with at least 8 characters including uppercase, lowercase, and numbers.
              </Text>
            </View>

            {/* Password Section */}
            <View className="mb-1">
              <Text className="text-gray-800 text-base font-semibold mb-4">Create Password</Text>
              
              {/* Password Input */}
              <View className="mb-5">
                <Text className="text-gray-600 text-sm font-medium mb-2">Password</Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                  <Ionicons name="lock-closed-outline" size={20} color="#6b7280" className="mr-3" />
                  <TextInput
                    placeholder="Create secure password"
                    value={formData.password}
                    onChangeText={(value) => updateFormData('password', value)}
                    secureTextEntry={!isPasswordVisible}
                    className="flex-1 text-gray-900 text-base"
                    placeholderTextColor="#9ca3af"
                  />
                  <TouchableOpacity 
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <Ionicons 
                      name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#6b7280" 
                    />
                  </TouchableOpacity>
                </View>
                
                {/* Password Requirements */}
                {formData.password && (
                  <View className="mt-4">
                    <Text className="text-xs text-gray-500 mb-3 font-medium">Password strength:</Text>
                    
                    <View className="flex-row items-center mb-2">
                      <Ionicons 
                        name={formData.password.length >= 8 ? "checkmark-circle" : "ellipse-outline"} 
                        size={14} 
                        color={formData.password.length >= 8 ? "#16a34a" : "#9ca3af"} 
                        className="mr-2"
                      />
                      <Text className="text-xs text-gray-600">Minimum 8 characters</Text>
                    </View>
                    
                    <View className="flex-row items-center mb-2">
                      <Ionicons 
                        name={hasUpperCase ? "checkmark-circle" : "ellipse-outline"} 
                        size={14} 
                        color={hasUpperCase ? "#16a34a" : "#9ca3af"} 
                        className="mr-2"
                      />
                      <Text className="text-xs text-gray-600">Uppercase letter</Text>
                    </View>
                    
                    <View className="flex-row items-center mb-2">
                      <Ionicons 
                        name={hasLowerCase ? "checkmark-circle" : "ellipse-outline"} 
                        size={14} 
                        color={hasLowerCase ? "#16a34a" : "#9ca3af"} 
                        className="mr-2"
                      />
                      <Text className="text-xs text-gray-600">Lowercase letter</Text>
                    </View>
                    
                    <View className="flex-row items-center mb-2">
                      <Ionicons 
                        name={hasNumber ? "checkmark-circle" : "ellipse-outline"} 
                        size={14} 
                        color={hasNumber ? "#16a34a" : "#9ca3af"} 
                        className="mr-2"
                      />
                      <Text className="text-xs text-gray-600">Number</Text>
                    </View>
                  </View>
                )}
              </View>

              {/* Confirm Password Input */}
              <View className="mb-7">
                <Text className="text-gray-600 text-sm font-medium mb-2">Confirm Password</Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50">
                  <Ionicons name="lock-closed-outline" size={20} color="#6b7280" className="mr-3" />
                  <TextInput
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChangeText={(value) => updateFormData('confirmPassword', value)}
                    secureTextEntry={!isConfirmPasswordVisible}
                    className="flex-1 text-gray-900 text-base"
                    placeholderTextColor="#9ca3af"
                  />
                  <TouchableOpacity 
                    onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                  >
                    <Ionicons 
                      name={isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#6b7280" 
                    />
                  </TouchableOpacity>
                </View>
                
                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <View className="flex-row items-center mt-3 p-2 bg-gray-50 rounded-lg">
                    <Ionicons 
                      name={passwordsMatch ? "checkmark-circle" : "close-circle"} 
                      size={16} 
                      color={passwordsMatch ? "#16a34a" : "#dc2626"} 
                      className="mr-2"
                    />
                    <Text className={`text-sm font-medium ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                      {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Complete Button */}
            <TouchableOpacity
              onPress={handleComplete}
              disabled={!canComplete || isLoading}
              className={`rounded-xl py-4 px-6 items-center mb-6 flex-row justify-center ${
                canComplete && !isLoading ? 'bg-green-600' : 'bg-gray-200'
              }`}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="white" className="mr-2" />
              ) : (
                <Ionicons 
                  name="checkmark-outline" 
                  size={20} 
                  color={canComplete && !isLoading ? "white" : "#9ca3af"} 
                  className="mr-2" 
                />
              )}
              <Text className={`font-semibold text-base ${
                canComplete && !isLoading ? 'text-white' : 'text-gray-500'
              }`}>
                {isLoading ? 'Creating Account...' : 'Complete Registration'}
              </Text>
            </TouchableOpacity>
            
            <Text className="text-gray-400 text-xs text-center px-4">
              Your password is encrypted and securely stored. We never have access to your actual password.
            </Text>
          </View>

          {/* Security Features */}
          <View className="mt-8 mb-10">
            <Text className="text-gray-700 text-sm font-semibold text-center mb-4">Security Features</Text>
            <View className="flex-row justify-around">
              <View className="items-center">
                <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="shield-checkmark" size={20} color="#16a34a" />
                </View>
                <Text className="text-gray-600 text-xs text-center">End-to-end{'\n'}Encryption</Text>
              </View>
              
              <View className="items-center">
                <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="key" size={20} color="#16a34a" />
                </View>
                <Text className="text-gray-600 text-xs text-center">Secure{'\n'}Storage</Text>
              </View>
              
              <View className="items-center">
                <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="lock-closed" size={20} color="#16a34a" />
                </View>
                <Text className="text-gray-600 text-xs text-center">Privacy{'\n'}Protection</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}