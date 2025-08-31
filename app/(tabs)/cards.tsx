// app/(tabs)/cards.tsx
import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Animated as RNAnimated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { 
  CreditCard, 
  Plus, 
  Eye, 
  EyeOff, 
  Lock, 
  Settings,
  Smartphone,
  Globe,
  ShoppingBag,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  BarChart3,
  Zap,
  Shield,
  RotateCcw,
  Bell
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48; // Account for padding
const CARD_HEIGHT = CARD_WIDTH * 0.6; // Maintain card aspect ratio

export default function CardsScreen() {
  const [cardNumberVisible, setCardNumberVisible] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const insets = useSafeAreaInsets();
  const scrollX = useRef(new RNAnimated.Value(0)).current;

  const cards = [
    {
      id: 1,
      type: 'Virtual',
      number: '•••• •••• •••• 4729',
      balance: 1250.00,
      gradient: ['#22c55e', '#16a34a'],
      textColor: 'white',
      expiry: '09/25',
      holder: 'John Doe',
      cvv: '•••'
    },
    {
      id: 2,
      type: 'Physical',
      number: '•••• •••• •••• 8963',
      balance: 890.50,
      gradient: ['#1f2937', '#374151'],
      textColor: 'white',
      expiry: '12/26',
      holder: 'John Doe',
      cvv: '•••'
    },
    {
      id: 3,
      type: 'Business',
      number: '•••• •••• •••• 1287',
      balance: 3450.75,
      gradient: ['#6366f1', '#4f46e5'],
      textColor: 'white',
      expiry: '03/27',
      holder: 'John Doe',
      cvv: '•••'
    }
  ];

  const cardFeatures = [
    { icon: Lock, title: 'Freeze Card', subtitle: 'Temporarily disable your card', color: '#ef4444' },
    { icon: Zap, title: 'Quick Pay', subtitle: 'Send money instantly', color: '#f59e0b' },
    { icon: BarChart3, title: 'Spending', subtitle: 'View analytics & reports', color: '#3b82f6' },
    { icon: Shield, title: 'Security', subtitle: 'Manage security settings', color: '#8b5cf6' },
  ];

  const transactions = [
    { id: 1, merchant: 'Amazon', amount: -89.99, date: 'Today', card: '••4729', category: 'Shopping', icon: '🛒' },
    { id: 2, merchant: 'Starbucks', amount: -12.50, date: 'Yesterday', card: '••8963', category: 'Food', icon: '☕' },
    { id: 3, merchant: 'Gas Station', amount: -45.00, date: '2 days ago', card: '••4729', category: 'Transport', icon: '⛽' },
    { id: 4, merchant: 'Salary Deposit', amount: 2500.00, date: '3 days ago', card: '••1287', category: 'Income', icon: '💵' },
  ];

  const spendingBreakdown = [
    { category: 'Shopping', amount: 320, color: '#ef4444', percentage: 35 },
    { category: 'Food & Dining', amount: 280, color: '#f59e0b', percentage: 30 },
    { category: 'Entertainment', amount: 150, color: '#8b5cf6', percentage: 16 },
    { category: 'Transportation', amount: 120, color: '#3b82f6', percentage: 13 },
    { category: 'Other', amount: 50, color: '#6b7280', percentage: 6 },
  ];

  const handleCardScroll = RNAnimated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleScrollEnd = (e: any) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setActiveCardIndex(pageNum);
  };

  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
    >
      {/* Header */}
      <LinearGradient
        colors={['#22c55e', '#16a34a']}
        className="px-6 pt-16 pb-8 h-35 rounded-b-3xl"
      >
        <Animated.View entering={FadeInDown.duration(800)}>
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-white text-2xl font-bold">My Cards</Text>
              <Text className="text-white/80 text-base mt-1">
                {cards.length} cards • ${cards.reduce((total, card) => total + card.balance, 0).toFixed(2)} total
              </Text>
            </View>
            <View className="flex-row">
              <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
                <Bell size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                <Settings size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>

      {/* Cards Carousel with Pagination */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(200)}
        className="px-6 -mt-10 mb-6"
      >
        <View>
          <RNAnimated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleCardScroll}
            onMomentumScrollEnd={handleScrollEnd}
            className="mb-4"
          >
            {cards.map((card, index) => (
              <View 
                key={card.id}
                style={{ width: CARD_WIDTH, marginRight: index === cards.length - 1 ? 0 : 16 }}
                className="relative"
              >
                <LinearGradient
                  colors={card.gradient}
                  className="rounded-3xl p-6"
                  style={{ height: CARD_HEIGHT }}
                >
                  <View className="flex-row justify-between items-start mb-6">
                    <View>
                      <Text className={`text-${card.textColor}/80 text-sm mb-1`}>
                        {card.type} Card
                      </Text>
                      <Text className={`text-${card.textColor} text-2xl font-bold`}>
                        ${card.balance.toFixed(2)}
                      </Text>
                    </View>
                    <View className="items-end">
                      <CreditCard size={24} color={card.textColor} />
                      <Text className={`text-${card.textColor}/80 text-xs mt-2`}>
                        {cardNumberVisible ? '1234 5678 9012 4729' : card.number}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-1 justify-end">
                    <View className="flex-row justify-between items-end">
                      <View>
                        <Text className={`text-${card.textColor}/80 text-xs mb-1`}>
                          CARD HOLDER
                        </Text>
                        <Text className={`text-${card.textColor} text-sm font-medium`}>
                          {card.holder}
                        </Text>
                      </View>
                      <View>
                        <Text className={`text-${card.textColor}/80 text-xs mb-1`}>
                          EXPIRES
                        </Text>
                        <Text className={`text-${card.textColor} text-sm font-medium`}>
                          {card.expiry}
                        </Text>
                      </View>
                      <View>
                        <Text className={`text-${card.textColor}/80 text-xs mb-1`}>
                          CVV
                        </Text>
                        <Text className={`text-${card.textColor} text-sm font-medium`}>
                          {cardNumberVisible ? '123' : card.cvv}
                        </Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>

                <TouchableOpacity 
                  className="absolute top-4 right-4 bg-white/20 p-2 rounded-full"
                  onPress={() => setCardNumberVisible(!cardNumberVisible)}
                >
                  {cardNumberVisible ? (
                    <EyeOff size={16} color="white" />
                  ) : (
                    <Eye size={16} color="white" />
                  )}
                </TouchableOpacity>
              </View>
            ))}
            
            {/* Add New Card */}
            <TouchableOpacity 
              className="bg-white rounded-3xl border-2 border-dashed border-gray-300 items-center justify-center"
              style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
              activeOpacity={0.7}
            >
              <View className="w-14 h-14 bg-green-100 rounded-full items-center justify-center mb-3">
                <Plus size={24} color="#22c55e" />
              </View>
              <Text className="text-gray-700 text-base font-medium">
                Add New Card
              </Text>
            </TouchableOpacity>
          </RNAnimated.ScrollView>

          {/* Pagination Indicators */}
          <View className="flex-row justify-center items-center mb-6">
            {cards.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === activeCardIndex ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </View>
        </View>
      </Animated.View>

      {/* Quick Actions */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(400)}
        className="px-6 mb-6"
      >
        <Text className="text-gray-900 text-lg font-bold mb-4">Quick Actions</Text>
        <View className="bg-white rounded-2xl p-5 shadow-lg shadow-black/5">
          <View className="flex-row flex-wrap justify-between">
            {cardFeatures.map((action, index) => (
              <TouchableOpacity 
                key={index}
                className="w-1/2 mb-4 items-center"
                activeOpacity={0.7}
              >
                <View 
                  className="w-14 h-14 rounded-2xl items-center justify-center mb-2"
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  <action.icon size={20} color={action.color} />
                </View>
                <Text className="text-gray-900 text-sm font-medium text-center mb-1">
                  {action.title}
                </Text>
                <Text className="text-gray-500 text-xs text-center">
                  {action.subtitle}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.View>

      {/* Spending Overview */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(600)}
        className="px-6 mb-6"
      >
        <View className="bg-white rounded-2xl p-5 shadow-lg shadow-black/5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-900 text-lg font-bold">Spending Overview</Text>
            <TouchableOpacity>
              <Text className="text-green-600 text-sm font-semibold">Details</Text>
            </TouchableOpacity>
          </View>
          
          <View className="mb-4">
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-700 text-sm">$920 of $2,500</Text>
              <Text className="text-gray-500 text-sm">37%</Text>
            </View>
            <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <View className="h-full bg-green-500 rounded-full" style={{ width: '37%' }} />
            </View>
          </View>
          
          <View className="mt-2">
            {spendingBreakdown.map((item, index) => (
              <View key={index} className="flex-row items-center justify-between py-2">
                <View className="flex-row items-center">
                  <View className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                  <Text className="text-gray-700 text-sm">{item.category}</Text>
                </View>
                <Text className="text-gray-900 text-sm font-medium">${item.amount}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>

      {/* Recent Card Transactions */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(800)}
        className="px-6 mb-8"
      >
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-900 text-lg font-bold">Recent Transactions</Text>
          <TouchableOpacity>
            <Text className="text-green-600 text-sm font-semibold">View All</Text>
          </TouchableOpacity>
        </View>
        
        <View className="bg-white rounded-2xl p-1 shadow-lg shadow-black/5">
          {transactions.map((transaction, index) => (
            <TouchableOpacity
              key={transaction.id}
              className={`flex-row items-center justify-between p-4 ${
                index !== transactions.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3">
                  <Text className="text-lg">{transaction.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 text-base font-medium">
                    {transaction.merchant}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    {transaction.date} • {transaction.category} • Card {transaction.card}
                  </Text>
                </View>
              </View>
              <Text 
                className={`text-base font-semibold ${
                  transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Security Tip */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(1000)}
        className="px-6 mb-8"
      >
        <View className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
          <View className="flex-row items-start mb-3">
            <Shield size={18} color="#3b82f6" className="mt-0.5 mr-2" />
            <View className="flex-1">
              <Text className="text-blue-900 text-sm font-semibold mb-1">
                Security Tip
              </Text>
              <Text className="text-blue-800 text-xs">
                Your virtual card is currently active. Remember to freeze it when not in use for added security.
              </Text>
            </View>
          </View>
          <TouchableOpacity className="flex-row items-center self-start">
            <Text className="text-blue-700 text-xs font-medium mr-1">
              Manage Security
            </Text>
            <ArrowUpRight size={14} color="#3b82f6" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}