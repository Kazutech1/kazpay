import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInUp, 
  FadeInDown, 
  FadeInRight,
  ZoomIn,
  SlideInDown,
  StretchInX,
  LightSpeedInRight
} from 'react-native-reanimated';
import { 
  CheckCircle, 
  Download, 
  Share, 
  Mail,
  User,
  Banknote,
  Calendar,
  Hash,
  ArrowLeft,
  Copy,
  ExternalLink
} from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TransferSuccessScreen() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  
  const amount = parseFloat(params.amount as string) || 0;
  const transactionId = params.transactionId as string;

  const handleDone = () => {
    router.replace('/(tabs)/home');
  };

  const handleNewTransfer = () => {
    router.replace('/(transfer)');
  };

  const handleCopyId = () => {
    // Copy transaction ID to clipboard
    // You would implement this with your clipboard library
    alert('Transaction ID copied to clipboard!');
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with Back Button */}
    

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Header */}
        <LinearGradient
          colors={['#22c55e', '#16a34a']}
          className="px-6 pt-8 pb-12 rounded-b-3xl items-center"
        >
          <Animated.View 
            entering={ZoomIn.duration(400)}
            className="items-center"
          >
            <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-4">
              <CheckCircle size={40} color="white" />
            </View>
            <Text className="text-white text-2xl font-bold mb-2">Transfer Successful!</Text>
            <Text className="text-white/90 text-center">
              Your payment to {params.recipientName} was completed successfully
            </Text>
          </Animated.View>
        </LinearGradient>

        {/* Amount Card */}
        <Animated.View 
          entering={FadeInUp.duration(400).delay(100)}
          className="bg-white rounded-2xl p-5 mx-4 -mt-6 shadow-sm shadow-black/5"
        >
          <Text className="text-gray-500 text-center text-sm mb-1">Amount Sent</Text>
          <Text className="text-gray-900 text-3xl font-bold text-center mb-5">${amount.toFixed(2)}</Text>
          
          <View className="flex-row justify-between">
            <TouchableOpacity className="items-center flex-1">
              <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                <Download size={20} color="#22c55e" />
              </View>
              <Text className="text-gray-700 text-xs">Receipt</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="items-center flex-1">
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                <Share size={20} color="#3b82f6" />
              </View>
              <Text className="text-gray-700 text-xs">Share</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="items-center flex-1">
              <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mb-2">
                <Mail size={20} color="#8b5cf6" />
              </View>
              <Text className="text-gray-700 text-xs">Email</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Transaction Details */}
        <Animated.View 
          entering={FadeInUp.duration(400).delay(200)}
          className="bg-white rounded-2xl p-5 mx-4 mt-4 shadow-sm shadow-black/5"
        >
          <Text className="text-gray-900 text-lg font-semibold mb-4">Transaction Details</Text>
          
          <Animated.View 
            entering={FadeInRight.duration(400).delay(250)}
            className="flex-row items-center py-3 border-b border-gray-100"
          >
            <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
              <User size={18} color="#22c55e" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-700 text-sm">Recipient</Text>
              <Text className="text-gray-900 font-medium">{params.recipientName}</Text>
            </View>
          </Animated.View>
          
          <Animated.View 
            entering={FadeInRight.duration(400).delay(300)}
            className="flex-row items-center py-3 border-b border-gray-100"
          >
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Hash size={18} color="#3b82f6" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-700 text-sm">Transaction ID</Text>
              <View className="flex-row items-center">
                <Text className="text-gray-900 font-medium mr-2">{transactionId}</Text>
                <TouchableOpacity onPress={handleCopyId}>
                  <Copy size={14} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
          
          <Animated.View 
            entering={FadeInRight.duration(400).delay(350)}
            className="flex-row items-center py-3 border-b border-gray-100"
          >
            <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mr-3">
              <Banknote size={18} color="#8b5cf6" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-700 text-sm">Amount</Text>
              <Text className="text-gray-900 font-medium">${amount.toFixed(2)}</Text>
            </View>
          </Animated.View>
          
          <Animated.View 
            entering={FadeInRight.duration(400).delay(400)}
            className="flex-row items-center py-3"
          >
            <View className="w-10 h-10 bg-amber-100 rounded-full items-center justify-center mr-3">
              <Calendar size={18} color="#f59e0b" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-700 text-sm">Date & Time</Text>
              <Text className="text-gray-900 font-medium">
                {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </Text>
            </View>
          </Animated.View>
        </Animated.View>

        {/* Next Steps */}
        <Animated.View 
          entering={FadeInUp.duration(400).delay(500)}
          className="bg-blue-50 rounded-2xl p-4 mx-4 mt-4 border border-blue-100"
        >
          <Text className="text-blue-900 text-sm font-semibold mb-2">What's Next?</Text>
          <View className="space-y-1">
            <Text className="text-blue-800 text-xs">• Funds will arrive in 1-2 business days</Text>
            <Text className="text-blue-800 text-xs">• Confirmation email sent to your address</Text>
            <Text className="text-blue-800 text-xs">• View transaction in your history</Text>
          </View>
        </Animated.View>

        {/* Support Card */}
        <Animated.View 
          entering={FadeInUp.duration(400).delay(600)}
          className="bg-gray-50 rounded-2xl p-4 mx-4 mt-4 border border-gray-200"
        >
          <Text className="text-gray-900 text-sm font-medium mb-2">Need help with this transaction?</Text>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-green-600 text-sm mr-1">Contact Support</Text>
            <ExternalLink size={14} color="#22c55e" />
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Buttons */}
      <Animated.View 
        entering={SlideInDown.duration(500)}
        className="px-4 pb-4 bg-white border-t border-gray-100 flex-row"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <TouchableOpacity
          className="flex-1 bg-white border border-gray-300 rounded-xl p-4 items-center mr-2"
          onPress={handleNewTransfer}
        >
          <Text className="text-gray-800 font-medium">New Transfer</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className="flex-1 bg-green-600 rounded-xl p-4 items-center ml-2"
          onPress={handleDone}
        >
          <Text className="text-white font-medium">Back to Home</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}