// components/common/NetworkSpinner.tsx
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, { 
  FadeInUp, 
  FadeOutDown, 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  Easing
} from 'react-native-reanimated';

interface NetworkSpinnerProps {
  visible: boolean;
  message?: string;
  subtitle?: string;
}

const NetworkSpinner: React.FC<NetworkSpinnerProps> = ({ 
  visible, 
  message = "Loading...", 
  subtitle = "Please wait..." 
}) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1, // Infinite repetitions
        false
      );
    } else {
      rotation.value = 0;
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  if (!visible) return null;

  return (
    <View className="absolute inset-0 bg-black/50 items-center justify-center z-50">
      <Animated.View 
        entering={FadeInUp.duration(300)}
        exiting={FadeOutDown.duration(200)}
        className="bg-white rounded-2xl p-8 items-center mx-8 shadow-lg"
      >
        {/* Animated Spinning Circle */}
        <Animated.View 
          style={animatedStyle}
          className="w-16 h-16 rounded-full mb-4 justify-center items-center"
        >
          <View className="w-14 h-14 border-4 border-green-100 rounded-full absolute" />
          <View className="w-14 h-14 border-4 border-t-green-500 rounded-full absolute" />
        </Animated.View>
        
        {/* Main Message */}
        <Text className="text-gray-800 font-medium text-center text-base mb-1">
          {message}
        </Text>
        
        {/* Subtitle */}
        <Text className="text-gray-500 text-sm text-center">
          {subtitle}
        </Text>
      </Animated.View>
    </View>
  );
};

export default NetworkSpinner;