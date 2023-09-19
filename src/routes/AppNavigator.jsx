// In App.js in a new project

import React from 'react';
import LoadingScreen from '../pages/LoadingScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import LupaPassword from '../pages/LupaPassword';

const screens = [
  {name: 'loading', component: LoadingScreen},
  {name: 'login', component: LoginScreen},
  {name: 'lupaPassword', component: LupaPassword},
];

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right', // Atur efek slide dari kanan
      }}>
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
