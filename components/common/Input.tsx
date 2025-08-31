// src/components/common/Input.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onRightIconPress,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const containerClasses = `
    bg-gray-50 border rounded-2xl px-4 py-3 mb-1
    ${isFocused ? 'border-green-600 bg-white' : 'border-gray-200'}
    ${error ? 'border-red-400 bg-red-50' : ''}
    ${disabled ? 'opacity-50' : ''}
    ${className}
  `.trim();

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-gray-700 font-medium mb-2 text-sm">
          {label}
        </Text>
      )}
      <View className={containerClasses}>
        <View className="flex-row items-center">
          {LeftIcon && (
            <View className="mr-3">
              <LeftIcon size={20} color={isFocused ? '#16a34a' : '#9ca3af'} />
            </View>
          )}
          <TextInput
            className="flex-1 text-gray-900 text-base py-1"
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry && !showPassword}
            keyboardType={keyboardType}
            editable={!disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {secureTextEntry && (
            <TouchableOpacity
              onPress={handleTogglePassword}
              className="ml-3 p-1"
              activeOpacity={0.7}
            >
              <Text className="text-gray-500 text-xs font-medium">
                {showPassword ? 'HIDE' : 'SHOW'}
              </Text>
            </TouchableOpacity>
          )}
          {RightIcon && onRightIconPress && (
            <TouchableOpacity
              onPress={onRightIconPress}
              className="ml-3"
              activeOpacity={0.7}
            >
              <RightIcon size={20} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {error && (
        <Text className="text-red-500 text-xs mt-1 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;