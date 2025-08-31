// app/(tabs)/home.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { 
  Send, 
  QrCode, 
  Plus, 
  Smartphone, 
  Zap, 
  Shield, 
  ArrowUpRight,
  Eye,
  EyeOff,
  Bell,
  CreditCard,
  BarChart3,
  TrendingUp,
  Calendar,
  Wallet,
  Receipt
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const balance = 2847.50;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const quickActions = [
    { icon: Send, title: 'Send Money', color: '#22c55e' },
    { icon: QrCode, title: 'QR Pay', color: '#3b82f6' },
    { icon: Plus, title: 'Top Up', color: '#f59e0b' },
    { icon: Smartphone, title: 'Mobile Credit', color: '#8b5cf6' },
  ];

  const services = [
    { 
      icon: Zap, 
      title: 'Bill Payments', 
      subtitle: 'Pay your bills instantly',
      color: '#22c55e' 
    },
    { 
      icon: Shield, 
      title: 'Insurance', 
      subtitle: 'Protect what matters',
      color: '#3b82f6' 
    },
    { 
      icon: CreditCard, 
      title: 'Cards', 
      subtitle: 'Manage your cards',
      color: '#8b5cf6' 
    },
    { 
      icon: BarChart3, 
      title: 'Investments', 
      subtitle: 'Grow your wealth',
      color: '#f59e0b' 
    },
  ];

  const recentTransactions = [
    { id: 1, name: 'Coffee Shop', amount: -12.50, time: '2 hours ago', type: 'expense', category: 'Food' },
    { id: 2, name: 'Salary Credit', amount: 2500.00, time: 'Yesterday', type: 'income', category: 'Income' },
    { id: 3, name: 'Netflix', amount: -15.99, time: '2 days ago', type: 'expense', category: 'Entertainment' },
    { id: 4, name: 'Grocery Store', amount: -87.30, time: '3 days ago', type: 'expense', category: 'Shopping' },
    { id: 5, name: 'Freelance Work', amount: 450.00, time: '4 days ago', type: 'income', category: 'Income' },
  ];

  const spendingData = [
    { category: 'Food & Dining', amount: 320, color: '#ef4444', percentage: 35 },
    { category: 'Shopping', amount: 280, color: '#f59e0b', percentage: 30 },
    { category: 'Entertainment', amount: 150, color: '#8b5cf6', percentage: 16 },
    { category: 'Transportation', amount: 120, color: '#3b82f6', percentage: 13 },
    { category: 'Other', amount: 50, color: '#6b7280', percentage: 6 },
  ];

  const filteredTransactions = activeTab === 'all' 
    ? recentTransactions 
    : recentTransactions.filter(tx => tx.type === activeTab);

  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header with Balance */}
        <StatusBar
        // barStyle="light-content"
        translucent
        backgroundColor="transparent" // important
      />
      <LinearGradient
        colors={['#22c55e', '#16a34a']}
        className="px-6 pt-16 pb-8 rounded-b-3xl"
      >
        <Animated.View entering={FadeInDown.duration(800)}>
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-white/80 text-sm">Good morning,</Text>
              <Text className="text-white text-2xl font-bold">John Doe</Text>
            </View>
            <View className="flex-row">
              <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
                <Calendar size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                <Bell size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Balance Card */}
          <View className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-white/80 text-sm mb-1">Total Balance</Text>
                <View className="flex-row items-center">
                  <Text className="text-white text-3xl font-bold">
                    ${balanceVisible ? balance.toFixed(2) : '••••••'}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => setBalanceVisible(!balanceVisible)}
                    className="ml-3"
                  >
                    {balanceVisible ? (
                      <Eye size={20} color="white" />
                    ) : (
                      <EyeOff size={20} color="white" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity className="bg-white/20 p-2 rounded-full">
                <ArrowUpRight size={20} color="white" />
              </TouchableOpacity>
            </View>
            
            {/* Quick Stats */}
            <View className="flex-row justify-between mt-4">
              <View className="items-center">
                <Text className="text-white/80 text-xs">Income</Text>
                <Text className="text-white text-sm font-semibold">$3,250</Text>
              </View>
              <View className="items-center">
                <Text className="text-white/80 text-xs">Expenses</Text>
                <Text className="text-white text-sm font-semibold">$920</Text>
              </View>
              <View className="items-center">
                <Text className="text-white/80 text-xs">Savings</Text>
                <Text className="text-white text-sm font-semibold">$1,150</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>

      {/* Quick Actions */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(200)}
        className="px-6 -mt-6 mb-6"
      >
        <View className="bg-white rounded-2xl p-5 shadow-lg shadow-black/5">
          <Text className="text-gray-900 text-lg font-bold mb-4">Quick Actions</Text>
          <View className="flex-row justify-between">
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index}
                className="items-center flex-1"
                activeOpacity={0.7}
              >
                <View 
                  className="w-14 h-14 rounded-2xl items-center justify-center mb-2"
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  <action.icon size={24} color={action.color} />
                </View>
                <Text className="text-gray-700 text-xs font-medium text-center">
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.View>

      {/* Spending Overview */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(300)}
        className="px-6 mb-6"
      >
        <View className="bg-white rounded-2xl p-5 shadow-lg shadow-black/5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-900 text-lg font-bold">Monthly Spending</Text>
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
            {spendingData.map((item, index) => (
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

      {/* Services */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(400)}
        className="px-6 mb-6"
      >
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-900 text-lg font-bold">Services</Text>
          <TouchableOpacity>
            <Text className="text-green-600 text-sm font-semibold">View All</Text>
          </TouchableOpacity>
        </View>
        
        <View className="flex-row flex-wrap justify-between">
          {services.map((service, index) => (
            <TouchableOpacity 
              key={index}
              className="bg-white rounded-2xl p-4 w-[48%] mb-4 shadow-lg shadow-black/5"
              activeOpacity={0.7}
            >
              <View 
                className="w-12 h-12 rounded-xl items-center justify-center mb-3"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <service.icon size={20} color={service.color} />
              </View>
              <Text className="text-gray-900 text-base font-semibold mb-1">
                {service.title}
              </Text>
              <Text className="text-gray-500 text-xs">
                {service.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Recent Transactions */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(500)}
        className="px-6 mb-8"
      >
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-900 text-lg font-bold">Recent Transactions</Text>
          <TouchableOpacity>
            <Text className="text-green-600 text-sm font-semibold">View All</Text>
          </TouchableOpacity>
        </View>
        
        {/* Transaction Filters */}
        <View className="flex-row mb-4 bg-gray-100 p-1 rounded-xl">
          {['all', 'income', 'expense'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl ${activeTab === tab ? 'bg-white shadow-sm' : ''}`}
            >
              <Text 
                className={`text-center font-medium ${
                  activeTab === tab ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {tab === 'all' ? 'All' : tab === 'income' ? 'Income' : 'Expenses'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View className="bg-white rounded-2xl p-4 shadow-lg shadow-black/5">
          {filteredTransactions.map((transaction, index) => (
            <TouchableOpacity
              key={transaction.id}
              className={`flex-row items-center justify-between py-3 ${
                index !== filteredTransactions.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center flex-1">
                <View 
                  className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  {transaction.type === 'income' ? (
                    <TrendingUp size={16} color="#16a34a" />
                  ) : (
                    <Receipt size={16} color="#dc2626" />
                  )}
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 text-base font-medium">
                    {transaction.name}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    {transaction.time} • {transaction.category}
                  </Text>
                </View>
              </View>
              <Text 
                className={`text-base font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </ScrollView>
  );
}