// In App.js in a new project

import React from 'react';
import LoadingScreen from '../pages/LoadingScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';

const screens = [
  {name: 'loading', component: LoadingScreen},
  {name: 'login', component: LoginScreen},
];

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator>
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
