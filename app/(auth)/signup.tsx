// app/(auth)/signup.tsx
import React, { useState, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import SignupStep1 from '../../components/signup/step1';
import SignupStep2 from '../../components/signup/step2';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const { width } = Dimensions.get('window');

export default function SignupScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const slideAnim = useRef(new Animated.Value(0)).current;

  const nextStep = () => {
    // Animate current step out to the left
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentStep(2);
      // Prepare for potential back navigation
      slideAnim.setValue(width);
      // Animate new step in from the right
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const prevStep = () => {
    // Animate current step out to the right
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentStep(1);
      // Prepare for potential forward navigation
      slideAnim.setValue(-width);
      // Animate previous step in from the left
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignupComplete = () => {
    router.push({
      pathname: '/(auth)/verification',
      params: { email: formData.email }
    });
  };

  return (
    <View className="flex-1 bg-white" style={styles.container}>
      <Animated.View style={[styles.stepContainer, { transform: [{ translateX: slideAnim }] }]}>
        {currentStep === 1 ? (
          <SignupStep1
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        ) : (
          <SignupStep2
            formData={formData}
            updateFormData={updateFormData}
            prevStep={prevStep}
            onSignupComplete={handleSignupComplete}
          />
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  stepContainer: {
    flex: 1,
    width: width,
  },
});