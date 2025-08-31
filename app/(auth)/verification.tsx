// src/screens/auth/VerificationScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import Button from '../../components/common/Botton';
import Logo from '../../components/common/Logo';

const VerificationScreen = ({ navigation, route }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  const { email } = route.params || { email: 'user@example.com' };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits entered
    if (newCode.every(digit => digit !== '') && text) {
      handleVerify(newCode);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (codeArray = code) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Dashboard');
    }, 1500);
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    // Simulate resend
    console.log('Resending code');
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View className="pt-16 px-6 mb-8">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center mb-6"
        >
          <Text className="text-gray-600 text-xl">←</Text>
        </TouchableOpacity>
        
        <Logo size="medium" showText={true} />
      </View>

      {/* Content */}
      <View className="flex-1 px-6">
        {/* Verification Icon */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-green-100 rounded-2xl items-center justify-center mb-6">
            <View className="w-10 h-10 bg-green-600 rounded-xl items-center justify-center">
              <Text className="text-white text-lg">📧</Text>
            </View>
          </View>
          
          <Text className="text-gray-900 text-3xl font-bold text-center mb-3 tracking-tight">
            Verify your email
          </Text>
          <Text className="text-gray-600 text-base text-center leading-6">
            We sent a 6-digit code to{'\n'}
            <Text className="font-semibold">{email}</Text>
          </Text>
        </View>

        {/* Code Input */}
        <View className="mb-8">
          <Text className="text-gray-700 font-medium mb-4 text-center">
            Enter verification code
          </Text>
          <View className="flex-row justify-between px-4">
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => inputRefs.current[index] = ref}
                className={`w-12 h-14 border-2 rounded-xl text-center text-xl font-bold ${
                  digit ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}
                value={digit}
                onChangeText={(text) => handleCodeChange(text.replace(/[^0-9]/g, ''), index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus={true}
              />
            ))}
          </View>
        </View>

        {/* Resend */}
        <View className="items-center mb-8">
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text className="text-green-600 font-semibold">
                Resend Code
              </Text>
            </TouchableOpacity>
          ) : (
            <Text className="text-gray-500">
              Resend code in {timer}s
            </Text>
          )}
        </View>

        {/* Verify Button */}
        <Button
          title="Verify & Continue"
          onPress={() => handleVerify()}
          loading={isLoading}
          disabled={code.some(digit => digit === '')}
          size="large"
        />

        {/* Change Email */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="items-center mt-6"
        >
          <Text className="text-gray-500 text-sm">
            Wrong email? Change it
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerificationScreen;