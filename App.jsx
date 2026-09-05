import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/Login';
import Dashboard from './src/Dashboard';
import Setting from './src/Setting';

const Stack = createNativeStackNavigator();

// Custom Dark Theme jo aapke background se match kare
const customTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#131926', // White flash ko dark se replace karega
  },
};

export default function App() {
  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: '#131926' }, // Screen container ka default color
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Setting" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}