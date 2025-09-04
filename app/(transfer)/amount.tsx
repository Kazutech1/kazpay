import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInUp, 
  FadeInDown, 
  FadeInRight,
  SlideInDown,
  SlideInRight,
  ZoomIn,
  StretchInX
} from 'react-native-reanimated';
import { 
  User, 
  Banknote, 
  Shield,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
  CheckCircle
} from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TransferAmountScreen() {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  
  const userBalance = 2847.50;
  const transferFee = 10.00;
  const amountNum = parseFloat(amount) || 0;
  const totalAmount = amountNum + transferFee;
  const balanceAfter = userBalance - totalAmount;
  const hasInsufficientBalance = balanceAfter < 0;

  const handleNext = () => {
    if (!amount || amountNum <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    
    if (totalAmount > userBalance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }
    
    router.push({
      pathname: '/(transfer)/confirm',
      params: {
        accountNumber: params.accountNumber,
        bank: params.bank,
        recipientName: params.recipientName,
        amount: amount,
        note: note,
        fee: transferFee.toString(),
        total: totalAmount.toString(),
        balanceAfter: balanceAfter.toString()
      }
    });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#22c55e', '#16a34a']}
        className="pb-4 px-4 pt-2"
      >
        <View className="flex-row items-center mb-2">
      
          
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">Transfer Amount</Text>
            <Text className="text-white/90 text-sm">Enter transfer details</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Recipient Info */}
        <Animated.View 
          entering={FadeInUp.duration(400).springify()}
          className="bg-white rounded-2xl p-5 mx-4 mt-4 shadow-sm shadow-black/5"
        >
          <Text className="text-gray-900 text-lg font-semibold mb-4">Recipient Details</Text>
          
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mr-3">
              <User size={24} color="#22c55e" />
            </View>
            <View>
              <Text className="text-gray-900 font-medium">{params.recipientName}</Text>
              <Text className="text-gray-500 text-sm">
                {params.accountNumber} • {params.bank}
              </Text>
            </View>
            <CheckCircle size={16} color="#22c55e" className="ml-auto" />
          </View>
        </Animated.View>

        {/* Amount Input */}
        <Animated.View 
          entering={FadeInUp.duration(400).delay(100).springify()}
          className="bg-white rounded-2xl p-5 mx-4 mt-4 shadow-sm shadow-black/5"
        >
          <Text className="text-gray-900 text-lg font-semibold mb-4">Transfer Amount</Text>
          
          <View className="mb-4">
            <Text className="text-gray-700 text-sm mb-2">Amount (USD)</Text>
            <View className="flex-row items-center bg-gray-100 rounded-xl p-4">
              <Text className="text-gray-500 text-xl mr-2">$</Text>
              <TextInput
                className="flex-1 text-gray-900 text-xl font-medium"
                placeholder="0.00"
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                autoFocus={true}
              />
            </View>
          </View>
          
          <View>
            <Text className="text-gray-700 text-sm mb-2">Note (Optional)</Text>
            <TextInput
              className="bg-gray-100 rounded-xl p-4 text-gray-900"
              placeholder="Add a note for this transfer"
              value={note}
              onChangeText={setNote}
              maxLength={30}
            />
            <Text className="text-right text-xs text-gray-500 mt-1">
              {note.length}/30
            </Text>
          </View>
        </Animated.View>

        {/* Balance Info */}
        <Animated.View 
          entering={FadeInUp.duration(400).delay(200).springify()}
          className="bg-white rounded-2xl p-5 mx-4 mt-4 shadow-sm shadow-black/5"
        >
          <Text className="text-gray-900 text-lg font-semibold mb-4">Balance Information</Text>
          
          <View className="flex-row justify-between items-center py-2">
            <Text className="text-gray-700">Your Balance</Text>
            <Text className="text-gray-900 font-medium">${userBalance.toFixed(2)}</Text>
          </View>
          
          <View className="flex-row justify-between items-center py-2">
            <Text className="text-gray-700">Transfer Fee</Text>
            <Text className="text-gray-900 font-medium">${transferFee.toFixed(2)}</Text>
          </View>
          
          <View className="h-px bg-gray-100 my-2" />
          
          <View className="flex-row justify-between items-center py-2">
            <Text className="text-gray-900 font-semibold">Total Amount</Text>
            <Text className="text-gray-900 font-bold text-lg">${totalAmount.toFixed(2)}</Text>
          </View>
          
          <View className="flex-row justify-between items-center py-2">
            <Text className="text-gray-700">Balance After Transfer</Text>
            <Text className={hasInsufficientBalance ? "text-red-600 font-medium" : "text-gray-900 font-medium"}>
              ${balanceAfter.toFixed(2)}
            </Text>
          </View>
          
          {hasInsufficientBalance && (
            <Animated.View 
              entering={ZoomIn.duration(300)}
              className="bg-red-50 p-3 rounded-xl flex-row items-center mt-3 border border-red-100"
            >
              <AlertCircle size={16} color="#ef4444" className="mr-2" />
              <Text className="text-red-800 text-sm">Insufficient balance for this transfer</Text>
            </Animated.View>
          )}
        </Animated.View>

        {/* Security Info */}
        <Animated.View 
          entering={FadeInUp.duration(400).delay(300).springify()}
          className="bg-blue-50 rounded-2xl p-4 mx-4 mt-4 border border-blue-100"
        >
          <View className="flex-row items-start">
            <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Shield size={16} color="#3b82f6" />
            </View>
            <View className="flex-1">
              <Text className="text-blue-900 text-sm font-semibold mb-1">
                Secure Transaction
              </Text>
              <Text className="text-blue-800 text-xs">
                Your transfer is protected with bank-level encryption. All transactions are monitored for your safety.
              </Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Next Button */}
      <Animated.View 
        entering={SlideInDown.duration(500).springify()}
        className="px-4 pb-4 bg-white border-t border-gray-100"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <TouchableOpacity
          className={`rounded-xl p-4 items-center ${!hasInsufficientBalance && amountNum > 0 ? 'bg-green-600' : 'bg-gray-300'}`}
          onPress={handleNext}
          disabled={hasInsufficientBalance || amountNum <= 0}
        >
          <Text className="text-white text-lg font-semibold">Continue to Confirm</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}