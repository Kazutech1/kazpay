// app/(tabs)/profile.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  FileText,
  LogOut,
  ArrowRight,
  DollarSign,
  Wallet,
  Star,
  Phone,
  Mail,
  MapPin,
  Crown
} from 'lucide-react-native';

// Types for better type safety
interface MenuItem {
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface QuickStat {
  label: string;
  value: string;
  color: string;
}

export default function ProfileScreen() {
  const userBalance = 2847.50;
  const userName = "John Doe";
  const userStatus = "Premium Member";
  const appVersion = "1.0.0";
  
  const menuSections: MenuSection[] = [
    {
      title: 'Account',
      items: [
        { icon: User, title: 'Personal Information', subtitle: 'Update your details' },
        { icon: Shield, title: 'Security & Privacy', subtitle: 'Manage your security settings' },
        { icon: Bell, title: 'Notifications', subtitle: 'Customize your alerts' },
        { icon: Wallet, title: 'Payment Methods', subtitle: 'Manage cards and accounts' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, title: 'Help Center', subtitle: 'Get answers to your questions' },
        { icon: Phone, title: 'Contact Support', subtitle: '24/7 customer service' },
        { icon: FileText, title: 'Terms & Conditions', subtitle: 'Legal information' },
        { icon: Star, title: 'Rate Our App', subtitle: 'Share your feedback' },
      ]
    }
  ];

  const quickStats: QuickStat[] = [
    { label: 'Total Spent', value: '$1,234', color: '#ef4444' },
    { label: 'Rewards Earned', value: '$89', color: '#22c55e' },
    { label: 'Transactions', value: '156', color: '#3b82f6' },
  ];

  // Render function for menu items to reduce repetition
  const renderMenuItem = (item: MenuItem, index: number, isLast: boolean) => (
    <TouchableOpacity 
      key={index}
      className={`flex-row items-center p-4 ${!isLast ? 'border-b border-gray-100' : ''}`}
      activeOpacity={0.7}
    >
      <View className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center mr-4">
        <item.icon size={20} color="#6b7280" />
      </View>
      <View className="flex-1">
        <Text className="text-gray-900 text-base font-semibold">
          {item.title}
        </Text>
        <Text className="text-gray-500 text-sm">
          {item.subtitle}
        </Text>
      </View>
      <ArrowRight size={20} color="#9ca3af" />
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
      {/* Header with User Info */}
      <LinearGradient
        colors={['#22c55e', '#16a34a']}
        className="px-6 pt-12 pb-8 rounded-b-3xl"
      >
        <Animated.View entering={FadeInDown.duration(800)}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-2xl font-bold">Profile</Text>
            <TouchableOpacity className="p-2">
              <Settings size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* User Profile Card */}
          <View className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <View className="flex-row items-center mb-4">
              <View className="relative">
                <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center mr-4">
                  <User size={28} color="white" />
                </View>
                <View className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-1">
                  <Crown size={14} color="#16a34a" />
                </View>
              </View>
              <View className="flex-1">
                <Text className="text-white text-xl font-bold">{userName}</Text>
                <Text className="text-white/80 text-sm">{userStatus}</Text>
              </View>
            </View>
            
            {/* Balance Display */}
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white/80 text-sm">Available Balance</Text>
                <Text className="text-white text-2xl font-bold">
                  ${userBalance.toFixed(2)}
                </Text>
              </View>
              <View className="bg-white/20 p-2 rounded-full">
                <DollarSign size={20} color="white" />
              </View>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>

      {/* Quick Stats */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(200)}
        className="px-6 -mt-6 mb-6"
      >
        <View className="bg-white rounded-2xl p-6 shadow-sm shadow-black/5">
          <Text className="text-gray-900 text-lg font-bold mb-4">This Month</Text>
          <View className="flex-row justify-between">
            {quickStats.map((stat, index) => (
              <View key={index} className="items-center flex-1">
                <Text 
                  className="text-2xl font-bold mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </Text>
                <Text className="text-gray-500 text-xs text-center">
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <Animated.View 
          key={section.title}
          entering={FadeInUp.duration(800).delay(400 + sectionIndex * 200)}
          className="px-6 mb-6"
        >
          <Text className="text-gray-900 text-lg font-bold mb-4">{section.title}</Text>
          <View className="bg-white rounded-2xl shadow-sm shadow-black/5 overflow-hidden">
            {section.items.map((item, index) => 
              renderMenuItem(item, index, index === section.items.length - 1)
            )}
          </View>
        </Animated.View>
      ))}

      {/* App Version & Logout */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(800)}
        className="px-6 mb-8"
      >
        <TouchableOpacity 
          className="flex-row items-center justify-center p-4 mb-4 rounded-2xl bg-red-50 active:bg-red-100"
          activeOpacity={0.8}
        >
          <LogOut size={20} color="#ef4444" />
          <Text className="text-red-600 text-base font-semibold ml-2">
            Sign Out
          </Text>
        </TouchableOpacity>
        
        <View className="items-center">
          <Text className="text-gray-400 text-xs">
            Version {appVersion}
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
}