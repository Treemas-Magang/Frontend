/* eslint-disable prettier/prettier */
// In App.js in a new project

import React from 'react';
import LoadingScreen from '../pages/LoadingScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import LupaPassword from '../pages/LupaPassword';
import Dashboard from '../pages/Dashboard';

const screens = [
  {name: 'loading', component: LoadingScreen},
  {name: 'login', component: LoginScreen},
  {name: 'lupaPassword', component: LupaPassword},
  {name: 'dashboard', component: Dashboard},
];

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right', // Atur efek slide dari kanan
      }}
      initialRouteName="login">
      {screens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={{
            headerShown: false,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}

export default App;
