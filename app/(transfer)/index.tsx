import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  FadeInRight,
  ZoomIn,
  SlideInRight,
  SlideInDown
} from 'react-native-reanimated';
import { 
  User, 
  Search, 
  Clock, 
  Banknote, 
  ChevronRight,
  Building,
  Contact,
  ArrowLeft,
  X,
  CheckCircle
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NetworkSpinner from '@/components/Spinner';

export default function TransferScreen() {
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showBankList, setShowBankList] = useState(false);
  const insets = useSafeAreaInsets();

  const banks = [
    { id: '1', name: 'Access Bank', code: '044' },
    { id: '2', name: 'GTBank', code: '058' },
    { id: '3', name: 'First Bank', code: '011' },
    { id: '4', name: 'Zenith Bank', code: '057' },
    { id: '5', name: 'UBA', code: '033' },
  ];

  const beneficiaries = [
    { id: '1', name: 'Sarah Johnson', bank: 'GTBank', account: '0123456789' },
    { id: '2', name: 'Michael Brown', bank: 'Access Bank', account: '9876543210' },
    { id: '3', name: 'Emily Wilson', bank: 'Zenith Bank', account: '4567890123' },
  ];

  const recentTransfers = [
    { id: '1', name: 'John Doe', amount: 250, date: 'Today', status: 'Successful' },
    { id: '2', name: 'Jane Smith', amount: 500, date: 'Yesterday', status: 'Successful' },
    { id: '3', name: 'Robert Davis', amount: 1200, date: '2 days ago', status: 'Successful' },
  ];

  const filteredBanks = banks.filter(bank => 
    bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bank.code.includes(searchQuery)
  );

  const simulateNetworkCall = async (message, duration = 1500) => {
    setLoadingMessage(message);
    setIsLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve(true);
      }, duration);
    });
  };

  const handleNext = async () => {
    if (!accountNumber || !selectedBank) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    // Simulate account verification
    await simulateNetworkCall('Verifying account details...', 1000);
    
    router.push({
      pathname: '/(transfer)/amount',
      params: {
        accountNumber,
        bank: selectedBank,
        recipientName: 'John Doe'
      }
    });
  };

  const handleBeneficiarySelect = async (beneficiary) => {
    await simulateNetworkCall('Loading details...', 600);
    setAccountNumber(beneficiary.account);
    setSelectedBank(beneficiary.bank);
    setShowBankList(false);
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank.name);
    setShowBankList(false);
    setSearchQuery('');
  };

  const handleBack = () => {
    router.replace('/(tabs)/home');
  };

  const toggleBankList = () => {
    Keyboard.dismiss();
    setShowBankList(!showBankList);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with Back Button */}
      <LinearGradient
        colors={['#22c55e', '#16a34a']}
        className="pb-6 px-4 pt-2"
      >
        <View className="flex-row items-center mb-2">
          <TouchableOpacity 
            onPress={handleBack}
            className="p-2 rounded-full bg-white/20 mr-2"
          >
            <ArrowLeft size={20} color="white" />
          </TouchableOpacity>
          
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">Send Money</Text>
            <Text className="text-white/90 text-sm">Transfer funds to any bank account</Text>
          </View>
        </View>
      </LinearGradient>

     <ScrollView 
      className="flex-1 px-4"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 120 }} // 👈 add padding so content doesn't hide under button
    >
        {/* Account Number Input */}
        <Animated.View 
          entering={FadeInUp.duration(400).springify()}
          className="bg-white rounded-2xl p-5 mt-4 shadow-sm shadow-black/5"
        >
          <Text className="text-gray-900 text-lg font-semibold mb-4">Recipient Details</Text>
          
          <View className="mb-4">
            <Text className="text-gray-700 text-sm font-medium mb-2">Account Number</Text>
            <TextInput
              className="bg-gray-100 rounded-xl p-4 text-gray-900 text-base"
              placeholder="Enter 10-digit account number"
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 text-sm font-medium mb-2">Select Bank</Text>
            <TouchableOpacity
              className="bg-gray-100 rounded-xl p-4 flex-row items-center justify-between"
              onPress={toggleBankList}
            >
              <Text className={selectedBank ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                {selectedBank || 'Choose bank'}
              </Text>
              <ChevronRight size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {showBankList && (
            <Animated.View 
              entering={SlideInDown.duration(400)}
              className="mb-4 bg-gray-50 rounded-xl p-3"
            >
              <View className="flex-row items-center bg-white rounded-lg px-3 py-2 mb-2">
                <Search size={18} color="#6b7280" className="mr-2" />
                <TextInput
                  className="flex-1 text-gray-900 text-base"
                  placeholder="Search banks..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus={true}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <X size={18} color="#6b7280" />
                  </TouchableOpacity>
                )}
              </View>
              
              <ScrollView className="max-h-48">
                {filteredBanks.map((bank, index) => (
                  <Animated.View
                    key={bank.id}
                    entering={FadeInRight.duration(300).delay(index * 50)}
                  >
                    <TouchableOpacity
                      className="py-3 px-2 border-b border-gray-100 flex-row items-center"
                      onPress={() => handleBankSelect(bank)}
                    >
                      <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
                        <Building size={14} color="#22c55e" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-gray-900 font-medium">{bank.name}</Text>
                        <Text className="text-gray-500 text-xs">{bank.code}</Text>
                      </View>
                      {selectedBank === bank.name && (
                        <CheckCircle size={16} color="#22c55e" />
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </ScrollView>
            </Animated.View>
          )}
        </Animated.View>

        {/* Saved Beneficiaries */}
        <Animated.View 
          entering={FadeInUp.duration(400).delay(100).springify()}
          className="bg-white rounded-2xl p-5 mt-4 shadow-sm shadow-black/5"
        >
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-gray-900 text-lg font-semibold">Saved Beneficiaries</Text>
            <TouchableOpacity>
              <Text className="text-green-600 font-medium text-sm">View All</Text>
            </TouchableOpacity>
          </View>
          
          {beneficiaries.map((beneficiary, index) => (
            <Animated.View
              key={beneficiary.id}
              entering={SlideInRight.duration(400).delay(index * 100)}
            >
              <TouchableOpacity
                className="py-3 flex-row items-center justify-between border-b border-gray-100 last:border-b-0"
                onPress={() => handleBeneficiarySelect(beneficiary)}
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                    <Contact size={18} color="#22c55e" />
                  </View>
                  <View>
                    <Text className="text-gray-900 font-medium">{beneficiary.name}</Text>
                    <Text className="text-gray-500 text-xs">{beneficiary.bank} • {beneficiary.account}</Text>
                  </View>
                </View>
                <ChevronRight size={16} color="#6b7280" />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Recent Transfers */}
        <Animated.View 
          entering={FadeInUp.duration(400).delay(200).springify()}
          className="bg-white rounded-2xl p-5 mt-4 mb-6 shadow-sm shadow-black/5"
        >
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-gray-900 text-lg font-semibold">Recent Transfers</Text>
            <TouchableOpacity>
              <Text className="text-green-600 font-medium text-sm">View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentTransfers.map((transfer, index) => (
            <Animated.View
              key={transfer.id}
              entering={FadeInRight.duration(400).delay(index * 100)}
            >
              <View
                className="py-3 flex-row items-center justify-between border-b border-gray-100 last:border-b-0"
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3">
                    <User size={18} color="#6b7280" />
                  </View>
                  <View>
                    <Text className="text-gray-900 font-medium">{transfer.name}</Text>
                    <Text className="text-gray-500 text-xs">${transfer.amount} • {transfer.date}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <View className="flex-row items-center">
                    <Text className="text-green-600 text-xs font-medium mr-1">{transfer.status}</Text>
                    <CheckCircle size={12} color="#22c55e" />
                  </View>
                </View>
              </View>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>

      {/* Continue Button */}
{accountNumber && selectedBank && (
  <Animated.View 
    entering={SlideInDown.duration(500).springify()}
    className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200"
  >
    <TouchableOpacity
      className="rounded-xl py-4 items-center bg-green-600"
      onPress={handleNext}
      disabled={isLoading}
    >
      <Text className="text-lg font-semibold text-white">
        Continue
      </Text>
    </TouchableOpacity>
  </Animated.View>
)}


      {/* Network Spinner */}
      <NetworkSpinner 
        visible={isLoading} 
        message={loadingMessage}
        subtitle="Please wait..."
      />    
    </View>
  );
}