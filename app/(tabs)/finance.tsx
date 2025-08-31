// app/(tabs)/finance.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { 
  PiggyBank, 
  TrendingUp, 
  Target, 
  DollarSign,
  ArrowUpRight,
  Plus,
  BarChart3,
  Wallet,
  ChevronRight,
  PieChart,
  Calendar,
  AlertCircle,
  Info,
  Sparkles
} from 'lucide-react-native';

export default function FinanceScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('savings');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const savingsGoals = [
    { 
      id: 1, 
      title: 'Emergency Fund', 
      current: 1200, 
      target: 5000, 
      color: '#22c55e',
      deadline: 'Dec 2023',
      monthly: 200
    },
    { 
      id: 2, 
      title: 'Vacation', 
      current: 800, 
      target: 2000, 
      color: '#3b82f6',
      deadline: 'Jun 2024',
      monthly: 100
    },
    { 
      id: 3, 
      title: 'New Car', 
      current: 3500, 
      target: 15000, 
      color: '#f59e0b',
      deadline: 'Dec 2024',
      monthly: 500
    },
  ];

  const investments = [
    { 
      id: 1, 
      name: 'Tech Stocks', 
      value: 4250.00, 
      change: 128.50, 
      percentage: 3.12,
      icon: '📈',
      category: 'Stocks'
    },
    { 
      id: 2, 
      name: 'Crypto Portfolio', 
      value: 1850.00, 
      change: -75.20, 
      percentage: -3.90,
      icon: '₿',
      category: 'Crypto'
    },
    { 
      id: 3, 
      name: 'Retirement Fund', 
      value: 8750.00, 
      change: 245.30, 
      percentage: 2.89,
      icon: '🏦',
      category: 'Retirement'
    },
  ];

  const portfolioAllocation = [
    { category: 'Stocks', value: 4250, color: '#3b82f6', percentage: 28 },
    { category: 'Crypto', value: 1850, color: '#f59e0b', percentage: 12 },
    { category: 'Retirement', value: 8750, color: '#22c55e', percentage: 58 },
    { category: 'Cash', value: 250, color: '#6b7280', percentage: 2 },
  ];

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <LinearGradient
        colors={['#22c55e', '#16a34a']}
        className="px-6 pt-16 pb-8 rounded-b-3xl"
      >
        <Animated.View entering={FadeInDown.duration(800)}>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-white text-2xl font-bold">Finance</Text>
            <View className="flex-row">
              <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
                <Calendar size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                <Info size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <Text className="text-white/80 text-base">
            Manage your savings and investments
          </Text>
        </Animated.View>
      </LinearGradient>

      {/* Portfolio Overview */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(200)}
        className="px-6 -mt-6 mb-6"
      >
        <View className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-gray-900 text-lg font-bold">Portfolio Overview</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-green-600 text-sm font-semibold mr-1">Details</Text>
              <BarChart3 size={16} color="#22c55e" />
            </TouchableOpacity>
          </View>
          
          <View className="flex-row justify-between mb-6">
            <View className="flex-1 mr-4">
              <Text className="text-gray-500 text-sm mb-1">Total Value</Text>
              <Text className="text-gray-900 text-2xl font-bold">{formatCurrency(15100)}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-500 text-sm mb-1">Today's Change</Text>
              <View className="flex-row items-center">
                <TrendingUp size={16} color="#22c55e" />
                <Text className="text-green-600 text-lg font-bold ml-1">+1.2%</Text>
              </View>
            </View>
          </View>

          {/* Portfolio Allocation */}
          <View>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-gray-700 text-sm font-medium">Portfolio Allocation</Text>
              <Text className="text-gray-500 text-xs">View Details</Text>
            </View>
            
            <View className="flex-row h-2 rounded-full overflow-hidden mb-3">
              {portfolioAllocation.map((item, index) => (
                <View 
                  key={index}
                  className="h-full"
                  style={{ 
                    width: `${item.percentage}%`, 
                    backgroundColor: item.color 
                  }}
                />
              ))}
            </View>
            
            <View className="flex-row flex-wrap">
              {portfolioAllocation.map((item, index) => (
                <View key={index} className="w-1/2 mb-2">
                  <View className="flex-row items-center">
                    <View 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <Text className="text-gray-700 text-sm">{item.category}</Text>
                  </View>
                  <Text className="text-gray-900 text-sm font-medium ml-5">
                    {item.percentage}% • {formatCurrency(item.value)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Navigation Tabs */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(300)}
        className="px-6 mb-6"
      >
        <View className="flex-row bg-gray-100 p-1 rounded-xl">
          {['savings', 'investments'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl ${activeTab === tab ? 'bg-white shadow-sm' : ''}`}
            >
              <Text 
                className={`text-center font-medium ${
                  activeTab === tab ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {tab === 'savings' ? 'Savings' : 'Investments'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {activeTab === 'savings' ? (
        <>
          {/* Savings Goals Header */}
          <Animated.View 
            entering={FadeInUp.duration(800).delay(400)}
            className="px-6 mb-4"
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-900 text-lg font-bold">Savings Goals</Text>
              <TouchableOpacity className="flex-row items-center">
                <Plus size={16} color="#22c55e" />
                <Text className="text-green-600 text-sm font-semibold ml-1">New Goal</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Savings Goals */}
          <Animated.View 
            entering={FadeInUp.duration(800).delay(500)}
            className="px-6 mb-6"
          >
            <View className="space-y-4">
              {savingsGoals.map((goal) => {
                const progress = getProgressPercentage(goal.current, goal.target);
                const monthsLeft = Math.ceil((goal.target - goal.current) / goal.monthly);
                
                return (
                  <TouchableOpacity 
                    key={goal.id}
                    className="bg-white rounded-2xl p-5 shadow-lg shadow-black/5"
                    activeOpacity={0.7}
                  >
                    <View className="flex-row justify-between items-start mb-4">
                      <View className="flex-row items-center flex-1">
                        <View 
                          className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                          style={{ backgroundColor: `${goal.color}15` }}
                        >
                          <Target size={20} color={goal.color} />
                        </View>
                        <View className="flex-1">
                          <Text className="text-gray-900 text-base font-semibold">
                            {goal.title}
                          </Text>
                          <Text className="text-gray-500 text-sm">
                            {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
                          </Text>
                        </View>
                      </View>
                      <View className="items-end">
                        <Text className="text-gray-700 text-sm font-medium">
                          {progress.toFixed(0)}%
                        </Text>
                        <Text className="text-gray-500 text-xs">
                          {monthsLeft} mo left
                        </Text>
                      </View>
                    </View>
                    
                    <View className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <View 
                        className="h-2 rounded-full"
                        style={{ 
                          width: `${progress}%`, 
                          backgroundColor: goal.color 
                        }}
                      />
                    </View>
                    
                    <View className="flex-row justify-between">
                      <Text className="text-gray-500 text-xs">Target: {goal.deadline}</Text>
                      <Text className="text-gray-500 text-xs">{formatCurrency(goal.monthly)}/month</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Animated.View>

          {/* Savings Tips */}
          <Animated.View 
            entering={FadeInUp.duration(800).delay(600)}
            className="px-6 mb-8"
          >
            <View className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
              <View className="flex-row items-start mb-3">
                <Sparkles size={18} color="#f59e0b" className="mt-0.5 mr-2" />
                <View className="flex-1">
                  <Text className="text-amber-900 text-sm font-semibold mb-1">
                    Savings Tip
                  </Text>
                  <Text className="text-amber-800 text-xs">
                    You're on track to meet your emergency fund goal 2 months early! Consider increasing your monthly contribution to reach it even sooner.
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text className="text-amber-700 text-xs font-medium text-right">
                  Learn More →
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </>
      ) : (
        <>
          {/* Investments Header */}
          <Animated.View 
            entering={FadeInUp.duration(800).delay(400)}
            className="px-6 mb-4"
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-900 text-lg font-bold">Investments</Text>
              <TouchableOpacity>
                <Text className="text-green-600 text-sm font-semibold">View All</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Investments */}
          <Animated.View 
            entering={FadeInUp.duration(800).delay(500)}
            className="px-6 mb-6"
          >
            <View className="space-y-4">
              {investments.map((investment) => (
                <TouchableOpacity 
                  key={investment.id}
                  className="bg-white rounded-2xl p-5 shadow-lg shadow-black/5"
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center flex-1">
                      <View className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center mr-4">
                        <Text className="text-xl">{investment.icon}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-gray-900 text-base font-semibold">
                          {investment.name}
                        </Text>
                        <Text className="text-gray-500 text-xs">
                          {investment.category}
                        </Text>
                      </View>
                    </View>
                    
                    <View className="items-end">
                      <Text className="text-gray-900 text-base font-semibold">
                        {formatCurrency(investment.value)}
                      </Text>
                      <View className="flex-row items-center">
                        <Text 
                          className={`text-sm font-medium ${
                            investment.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {investment.change >= 0 ? '+' : ''}{formatCurrency(investment.change)}
                        </Text>
                        <Text 
                          className={`text-xs ml-1 ${
                            investment.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          ({investment.percentage >= 0 ? '+' : ''}{investment.percentage.toFixed(2)}%)
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <Text className="text-gray-500 text-xs mr-2">Performance</Text>
                      {investment.change >= 0 ? (
                        <TrendingUp size={14} color="#22c55e" />
                      ) : (
                        <TrendingUp size={14} color="#ef4444" className="rotate-180" />
                      )}
                    </View>
                    <TouchableOpacity className="flex-row items-center">
                      <Text className="text-green-600 text-xs font-medium mr-1">Details</Text>
                      <ChevronRight size={14} color="#22c55e" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Investment Performance */}
          <Animated.View 
            entering={FadeInUp.duration(800).delay(600)}
            className="px-6 mb-8"
          >
            <View className="bg-white rounded-2xl p-5 shadow-lg shadow-black/5">
              <Text className="text-gray-900 text-base font-semibold mb-4">Performance Overview</Text>
              
              <View className="flex-row justify-between mb-6">
                <View className="items-center">
                  <Text className="text-gray-500 text-xs mb-1">1W</Text>
                  <Text className="text-green-600 text-sm font-semibold">+2.1%</Text>
                </View>
                <View className="items-center">
                  <Text className="text-gray-500 text-xs mb-1">1M</Text>
                  <Text className="text-green-600 text-sm font-semibold">+5.7%</Text>
                </View>
                <View className="items-center">
                  <Text className="text-gray-500 text-xs mb-1">3M</Text>
                  <Text className="text-green-600 text-sm font-semibold">+12.4%</Text>
                </View>
                <View className="items-center">
                  <Text className="text-gray-500 text-xs mb-1">1Y</Text>
                  <Text className="text-green-600 text-sm font-semibold">+23.8%</Text>
                </View>
              </View>
              
              <View className="bg-gray-100 h-2 rounded-full overflow-hidden">
                <View 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: '78%' }} 
                />
              </View>
            </View>
          </Animated.View>
        </>
      )}

      {/* Start Investing CTA */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(700)}
        className="px-6 mb-8"
      >
        <LinearGradient
          colors={['#3b82f6', '#2563eb']}
          className="rounded-full p-6"
        >
          <View className="flex-row items-center  justify-between">
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <Sparkles size={16} color="white" />
                <Text className="text-white text-sm font-semibold ml-2">RECOMMENDED</Text>
              </View>
              <Text className="text-white text-lg font-bold mb-2">
                Start Investing Today
              </Text>
              <Text className="text-white/80 text-sm mb-4">
                Build wealth with our curated investment portfolios
              </Text>
              <TouchableOpacity className="bg-white rounded-full py-3 px-5 self-start">
                <Text className="text-blue-600 text-sm font-semibold">Explore Options</Text>
              </TouchableOpacity>
            </View>
            <Wallet size={60} color="white" opacity={0.3} />
          </View>
        </LinearGradient>
      </Animated.View>
    </ScrollView>
  );
}