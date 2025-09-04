import { Stack } from 'expo-router';

export default function TransferLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#22c55e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Transfer Funds',
          headerBackTitle: 'Back',
        }} 
      />
      <Stack.Screen 
        name="amount" 
        options={{ 
          title: 'Transfer Amount',
          headerBackTitle: 'Back',
        }} 
      />
      <Stack.Screen 
        name="confirm" 
        options={{ 
          title: 'Confirm Transfer',
          headerBackTitle: 'Back',
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="success" 
        options={{ 
          title: 'Transfer Successful',
          headerBackTitle: 'Back',
          headerLeft: () => null,
        }} 
      />
    </Stack>
  );
}