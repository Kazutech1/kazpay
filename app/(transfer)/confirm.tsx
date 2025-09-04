import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, ScrollView, PanResponder } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInUp, 
  FadeInDown, 
  FadeInRight,
  SlideInDown,
  ZoomIn,
  StretchInX,
  LightSpeedInLeft,
  PinwheelIn,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { 
  User, 
  Banknote, 
  Shield,
  X,
  Check,
  Lock,
  Delete,
  ArrowLeft,
  Fingerprint,
  ChevronDown
} from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

export default function ConfirmTransferScreen() {
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [useBiometric, setUseBiometric] = useState(false);
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef(null);
  
  const userBalance = 2847.50;
  const amount = parseFloat(params.amount as string) || 0;
  const fee = parseFloat(params.fee as string) || 0;
  const total = parseFloat(params.total as string) || 0;
  const balanceAfter = parseFloat(params.balanceAfter as string) || 0;

  const handleConfirm = () => {
    setShowPinModal(true);
  };

  const handleBack = () => {
    router.back();
  };

  const handlePinInput = (digit) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      
      // Auto-submit when 4 digits are entered
      if (newPin.length === 4) {
        setTimeout(() => {
          handlePinSubmit(newPin);
        }, 200);
      }
    }
  };

  const handlePinDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const clearPin = () => {
    setPin('');
  };

  const handleBiometricAuth = () => {
    setIsVerifying(true);
    // Simulate biometric authentication
    setTimeout(() => {
      setIsVerifying(false);
      setShowPinModal(false);
      router.push({
        pathname: '/(transfer)/success',
        params: {
          amount: params.amount,
          recipientName: params.recipientName,
          transactionId: 'TX' + Math.random().toString(36).substr(2, 9).toUpperCase()
        }
      });
    }, 1500);
  };

  const handlePinSubmit = (pinToVerify = pin) => {
    if (pinToVerify.length !== 4) {
      Alert.alert('Error', 'Please enter a valid 4-digit PIN');
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate PIN verification
    setTimeout(() => {
      // Here you would typically verify the PIN with your backend
      // For demo purposes, we'll assume PIN "1234" is correct
      if (pinToVerify === '1234') {
        setShowPinModal(false);
        setPin('');
        setIsVerifying(false);
        
        router.push({
          pathname: '/(transfer)/success',
          params: {
            amount: params.amount,
            recipientName: params.recipientName,
            transactionId: 'TX' + Math.random().toString(36).substr(2, 9).toUpperCase()
          }
        });
      } else {
        setIsVerifying(false);
        Alert.alert('Incorrect PIN', 'Please try again', [
          { text: 'OK', onPress: clearPin }
        ]);
      }
    }, 1000);
  };

  const keypadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'delete']
  ];

  // Bottom sheet gesture handling
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -300);
    })
    .onEnd(() => {
      if (translateY.value > -150) {
        translateY.value = withSpring(0, { damping: 50 });
      } else {
        translateY.value = withSpring(-300, { damping: 50 });
      }
    });

  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <LinearGradient
          colors={['#22c55e', '#16a34a']}
          className="pb-4 px-4 pt-2"
        >
         
        </LinearGradient>

        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            entering={FadeInUp.duration(400).springify()}
            className="bg-white rounded-2xl p-6 shadow-sm shadow-black/5 mb-4"
          >
            <Text className="text-gray-900 text-2xl font-bold text-center mb-6">Confirm Transfer</Text>
            
            {/* Recipient Info */}
            <View className="flex-row items-center justify-center mb-6">
              <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mr-3">
                <User size={28} color="#22c55e" />
              </View>
              <View>
                <Text className="text-gray-900 font-medium text-center">{params.recipientName}</Text>
                <Text className="text-gray-500 text-sm text-center">
                  {params.accountNumber} • {params.bank}
                </Text>
              </View>
            </View>
            
            {/* Amount */}
            <Animated.View 
              entering={ZoomIn.duration(500)}
              className="bg-green-50 rounded-xl p-5 mb-4 border border-green-200"
            >
              <Text className="text-green-800 text-center text-sm mb-1">You're sending</Text>
              <Text className="text-green-900 text-3xl font-bold text-center">${amount.toFixed(2)}</Text>
            </Animated.View>
            
            {/* Details */}
            <View className="mb-6">
              <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                <Text className="text-gray-700">Transfer Fee</Text>
                <Text className="text-gray-900 font-medium">${fee.toFixed(2)}</Text>
              </View>
              
              <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                <Text className="text-gray-700">Total Amount</Text>
                <Text className="text-gray-900 font-bold">${total.toFixed(2)}</Text>
              </View>
              
              <View className="flex-row justify-between items-center py-3">
                <Text className="text-gray-700">Current Balance</Text>
                <Text className="text-gray-900 font-medium">${userBalance.toFixed(2)}</Text>
              </View>
              
              <View className="flex-row justify-between items-center py-3 border-t border-gray-100">
                <Text className="text-gray-900 font-medium">Balance After</Text>
                <Text className="text-gray-900 font-bold">${balanceAfter.toFixed(2)}</Text>
              </View>
            </View>
            
            {/* Note */}
            {params.note && (
              <Animated.View 
                entering={FadeInRight.duration(400)}
                className="bg-blue-50 p-3 rounded-xl mb-6 border border-blue-100"
              >
                <Text className="text-blue-900 text-sm">
                  <Text className="font-medium">Note: </Text>
                  {params.note}
                </Text>
              </Animated.View>
            )}
            
            {/* Security Info */}
            <Animated.View 
              entering={FadeInUp.duration(400).delay(200)}
              className="bg-green-50 p-3 rounded-xl flex-row items-start mb-6 border border-green-100"
            >
              <Shield size={16} color="#22c55e" className="mt-0.5 mr-2" />
              <Text className="text-green-800 text-xs flex-1">
                This transfer is protected by bank-level security encryption. Your funds are safe with us.
              </Text>
            </Animated.View>
          </Animated.View>
          
          {/* Buttons */}
          <View className="flex-row mb-8">
            <TouchableOpacity
              className="flex-1 bg-gray-200 rounded-xl p-4 items-center mr-2 active:bg-gray-300"
              onPress={handleBack}
            >
              <Text className="text-gray-800 font-medium">Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-1 bg-green-600 rounded-xl p-4 items-center ml-2 active:bg-green-700"
              onPress={handleConfirm}
            >
              <Text className="text-white font-medium">Confirm</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
        {/* Bottom Sheet PIN Modal */}
        <Modal
          visible={showPinModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowPinModal(false)}
        >
          <View className="flex-1 bg-black/50 justify-end">
            <GestureDetector gesture={gesture}>
              <Animated.View 
                style={bottomSheetStyle}
                className="bg-white rounded-t-3xl p-6"
              >
                {/* Handle bar */}
                <View className="items-center mb-4">
                  <View className="w-10 h-1 bg-gray-300 rounded-full" />
                </View>
                
                <View className="flex-row justify-between items-center mb-6">
                  <Text className="text-gray-900 text-xl font-bold">Security Verification</Text>
                  <TouchableOpacity 
                    onPress={() => setShowPinModal(false)}
                    className="p-2 rounded-full bg-gray-100"
                  >
                    <X size={20} color="#6b7280" />
                  </TouchableOpacity>
                </View>
                
                <Text className="text-gray-500 text-sm text-center mb-6">
                  Please enter your 4-digit security PIN to confirm this transfer
                </Text>
                
                {/* PIN Display */}
                <View className="flex-row justify-center mb-8">
                  {[0, 1, 2, 3].map(i => (
                    <Animated.View
                      key={i}
                      entering={StretchInX.duration(300).delay(i * 100)}
                      className={`w-16 h-16 border-2 rounded-xl items-center justify-center mx-2 ${
                        pin.length > i 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 bg-gray-50'
                      }`}
                    >
                      <Text className="text-2xl text-gray-800">
                        {pin.length > i ? '•' : ''}
                      </Text>
                    </Animated.View>
                  ))}
                </View>
                
                {/* Biometric Option */}
                <Animated.View 
                  entering={LightSpeedInLeft.duration(600)}
                  className="items-center mb-6"
                >
                  <TouchableOpacity 
                    className="flex-row items-center bg-blue-50 px-4 py-3 rounded-full border border-blue-100"
                    onPress={handleBiometricAuth}
                    disabled={isVerifying}
                  >
                    <Fingerprint size={18} color="#3b82f6" className="mr-2" />
                    <Text className="text-blue-800 font-medium">Use Fingerprint Instead</Text>
                  </TouchableOpacity>
                </Animated.View>
                
                {/* Keypad */}
                <View className="mb-6">
                  {keypadNumbers.map((row, rowIndex) => (
                    <View key={rowIndex} className="flex-row justify-center mb-4">
                      {row.map((item, colIndex) => (
                        <TouchableOpacity
                          key={colIndex}
                          className={`w-16 h-16 items-center justify-center mx-3 rounded-2xl ${
                            item === '' ? 'bg-transparent' : 'bg-gray-100 active:bg-gray-200'
                          }`}
                          onPress={() => {
                            if (item === 'delete') {
                              handlePinDelete();
                            } else if (item !== '') {
                              handlePinInput(item);
                            }
                          }}
                          disabled={isVerifying || item === ''}
                        >
                          {item === 'delete' ? (
                            <Delete size={24} color="#6b7280" />
                          ) : (
                            <Text className="text-2xl font-semibold text-gray-800">
                              {item}
                            </Text>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </View>
                
                {/* Status */}
                {isVerifying && (
                  <Animated.View 
                    entering={PinwheelIn.duration(600)}
                    className="bg-green-50 p-4 rounded-xl items-center mb-4 border border-green-200"
                  >
                    <Text className="text-green-800 font-medium">Verifying...</Text>
                  </Animated.View>
                )}
                
                {/* Additional Options */}
                <View className="flex-row justify-between items-center">
                  <TouchableOpacity onPress={clearPin} disabled={isVerifying}>
                    <Text className="text-gray-500 text-sm">Clear PIN</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity disabled={isVerifying}>
                    <Text className="text-green-600 text-sm font-medium">Forgot PIN?</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </GestureDetector>
          </View>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
}