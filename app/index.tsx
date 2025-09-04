// src/screens/auth/SplashScreen.jsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StatusBar, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../assets/images/logo.png';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;
  const loadingFadeAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequential animation chain for better visual flow
    const startAnimations = () => {
      // Phase 1: Logo entrance with scale and fade
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Phase 2: Text fade in after logo settles
        Animated.timing(textFadeAnim, {
          toValue: 1,
          duration: 600,
          delay: 200,
          useNativeDriver: true,
        }).start();

        // Phase 3: Loading indicator appears
        Animated.timing(loadingFadeAnim, {
          toValue: 1,
          duration: 400,
          delay: 800,
          useNativeDriver: true,
        }).start();

        // Continuous pulse animation for logo
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.05,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
          ])
        ).start();

        // Sparkle animation
        Animated.loop(
          Animated.timing(sparkleAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          })
        ).start();
      });
    };

    startAnimations();

    // Navigate to welcome screen after 3 seconds
    const timer = setTimeout(() => {
      // Fade out animation before navigation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        router.push('/(auth)');
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Rotating sparkle interpolation
  const sparkleRotate = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1, 0.3],
  });

   return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#22c55e" 
        translucent={false}
      />
      
      <LinearGradient
        colors={['#22c55e', '#16a34a']}  // Changed to green colors
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        {/* Background animated circles - updated opacity for better visibility on green */}
        <Animated.View 
          className="absolute top-20 right-10 w-40 h-40 bg-white/15 rounded-full"
          style={{
            opacity: fadeAnim,
            transform: [
              { 
                rotate: sparkleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '180deg'],
                })
              }
            ],
          }}
        />
        <Animated.View 
          className="absolute bottom-32 left-8 w-32 h-32 bg-white/10 rounded-full"
          style={{
            opacity: fadeAnim,
            transform: [
              { 
                rotate: sparkleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['360deg', '0deg'],
                })
              }
            ],
          }}
        />
        <Animated.View 
          className="absolute top-40 left-6 w-24 h-24 bg-white/12 rounded-full"
          style={{
            opacity: fadeAnim,
            transform: [
              { 
                rotate: sparkleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['180deg', '360deg'],
                })
              }
            ],
          }}
        />

        <View className="flex-1 items-center justify-center px-8">
          {/* Main content container */}
          <Animated.View 
            className="items-center"
            style={{
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim },
              ],
            }}
          >
            {/* Logo with pulse and sparkle effects */}
            <View className="relative items-center justify-center mb-8">
              {/* Sparkle effect behind logo */}
              <Animated.View
                className="absolute w-80 h-80 items-center justify-center"
                style={{
                  opacity: sparkleOpacity,
                  transform: [{ rotate: sparkleRotate }],
                }}
              >
                <View className="w-2 h-2 bg-white rounded-full absolute top-8 left-12" />
                <View className="w-1 h-1 bg-white/80 rounded-full absolute top-20 right-16" />
                <View className="w-1.5 h-1.5 bg-white/60 rounded-full absolute bottom-12 left-8" />
                <View className="w-1 h-1 bg-white/90 rounded-full absolute bottom-20 right-10" />
              </Animated.View>

              {/* Glow effect */}
              <Animated.View
                className="absolute w-80 h-80 bg-white/10 rounded-full"  // Increased opacity
                style={{
                  transform: [{ scale: pulseAnim }],
                }}
              />

              {/* Logo with enhanced styling and filter effects */}
              <Animated.Image
                source={Logo}
                className="w-64 h-64"
                resizeMode="contain"
                style={{
                  transform: [{ scale: pulseAnim }],
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 15,
                }}
              />
            </View>

            {/* App title with enhanced typography */}
            <Animated.View
              style={{
                opacity: textFadeAnim,
                transform: [
                  {
                    translateY: textFadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              <Text className="text-white text-2xl font-bold text-center mb-2 tracking-wide">
                SecureWallet
              </Text>
              <Text className="text-white/90 text-base text-center leading-6 font-light">
                Your trusted digital wallet
              </Text>
              <Text className="text-white/70 text-sm text-center mt-2 font-light">
                Secure • Fast • Reliable
              </Text>
            </Animated.View>
          </Animated.View>

          {/* Enhanced loading indicator */}
          <Animated.View 
            className="absolute bottom-24 items-center"
            style={{ 
              opacity: loadingFadeAnim,
              transform: [
                {
                  translateY: loadingFadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            }}
          >
            {/* Animated dots loading */}
            <View className="flex-row items-center space-x-2 mb-4">
              {[0, 1, 2].map((index) => (
                <Animated.View
                  key={index}
                  className="w-2.5 h-2.5 bg-white/90 rounded-full"  
                  style={{
                    transform: [
                      {
                        scale: sparkleAnim.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: [0.8, 1.2, 0.8],
                        }),
                      },
                    ],
                    opacity: sparkleAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.6, 1, 0.6],
                    }),
                  }}
                />
              ))}
            </View>
            
            <Text className="text-white/80 text-sm font-light">  
              Initializing secure connection...
            </Text>
          </Animated.View>

          {/* Bottom gradient overlay for depth */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.2)']}  // Darker overlay for better contrast
            className="absolute bottom-0 left-0 right-0 h-32"
            pointerEvents="none"
          />
        </View>
      </LinearGradient>
    </>
  );
};



export default SplashScreen;