// src/components/common/Button.jsx
import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'large', 
  disabled = false, 
  loading = false,
  icon: IconComponent,
  className = '',
}) => {
  const baseClasses = "rounded-2xl items-center justify-center flex-row";
  
  const variants = {
    primary: "bg-green-600",
    secondary: "bg-gray-100 border border-gray-200",
    outline: "border-2 border-green-600 bg-transparent",
    ghost: "bg-transparent",
  };

  const sizes = {
    small: "px-4 py-3 min-h-[44px]",
    medium: "px-6 py-3 min-h-[48px]",
    large: "px-6 py-4 min-h-[56px]",
  };

  const textVariants = {
    primary: "text-white font-semibold",
    secondary: "text-gray-700 font-semibold",
    outline: "text-green-600 font-semibold",
    ghost: "text-green-600 font-medium",
  };

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const disabledClasses = disabled ? "opacity-50" : "";
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;

  return (
    <TouchableOpacity
      className={buttonClasses}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={{
        shadowColor: variant === 'primary' ? '#16a34a' : '#000',
        shadowOffset: { width: 0, height: variant === 'primary' ? 4 : 2 },
        shadowOpacity: variant === 'primary' ? 0.2 : 0.1,
        shadowRadius: variant === 'primary' ? 8 : 4,
        elevation: variant === 'primary' ? 4 : 2,
      }}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? 'white' : '#16a34a'} 
        />
      ) : (
        <View className="flex-row items-center">
          {IconComponent && (
            <View className="mr-2">
              <IconComponent 
                size={20} 
                color={variant === 'primary' ? 'white' : '#16a34a'} 
              />
            </View>
          )}
          <Text className={`${textVariants[variant]} ${textSizes[size]}`}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;