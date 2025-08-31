// app/(auth)/onboarding/_layout.tsx
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    
    <Stack
    
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: false, // Disable to prevent conflicts with slide gestures
      }}
    >
      <Stack.Screen name="slide1" />
      <Stack.Screen name="slide2" />
      <Stack.Screen name="slide3" />
    </Stack>
  );
}


