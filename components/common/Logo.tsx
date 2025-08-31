// src/components/common/Logo.jsx
import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const Logo = ({ size = 'medium', showText = true, variant = 'default' }) => {
  const sizes = {
    small: { container: 32, svg: 32, text: 16 },
    medium: { container: 48, svg: 48, text: 20 },
    large: { container: 64, svg: 64, text: 24 },
    xlarge: { container: 80, svg: 80, text: 28 },
  };

  const currentSize = sizes[size];
  
  const LogoIcon = () => (
    <Svg 
      width={currentSize.svg} 
      height={currentSize.svg} 
      viewBox="0 0 48 48"
      className="text-white"
    >
      {/* K letter stylized */}
      <Path
        d="M12 8v32M12 24l12-12M12 24l12 12"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* P letter stylized */}
      <Path
        d="M32 8v32M32 8h8a6 6 0 0 1 0 12h-8"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  if (variant === 'splash') {
    return (
      <View className="items-center">
        <View 
          className="bg-white/20 rounded-2xl items-center justify-center backdrop-blur-sm"
          style={{ 
            width: currentSize.container, 
            height: currentSize.container,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          }}
        >
          <LogoIcon />
        </View>
        {showText && (
          <Text 
            className="text-white font-bold mt-6 tracking-tight"
            style={{ fontSize: currentSize.text + 8 }}
          >
            Kaz Pay
          </Text>
        )}
      </View>
    );
  }

  return (
    <View className="flex-row items-center">
      <View 
        className="bg-green-600 rounded-xl items-center justify-center"
        style={{ 
          width: currentSize.container, 
          height: currentSize.container,
          shadowColor: '#16a34a',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
        }}
      >
        <LogoIcon />
      </View>
      {showText && (
        <Text 
          className="text-gray-900 font-bold ml-3 tracking-tight"
          style={{ fontSize: currentSize.text }}
        >
          Kaz Pay
        </Text>
      )}
    </View>
  );
};

export default Logo;