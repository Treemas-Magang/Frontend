/* eslint-disable prettier/prettier */
// In App.js in a new project

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListTimesheet from '../components/organisms/ListTimesheet';
import DetailTimesheetUpdate from '../components/organisms/DetailTimesheetUpdate';
import {
  ScreenDashboard,
  ScreenDetailPengumuman,
  ScreenLogin,
  ScreenLupaPassword,
  ScreenNotifPengumuman,
  ScreenSplash,
} from '../pages/index';
const screens = [
  {name: 'splash', component: ScreenSplash},
  {name: 'login', component: ScreenLogin},
  {name: 'lupaPassword', component: ScreenLupaPassword},
  {name: 'dashboard', component: ScreenDashboard},
  {name: 'detailPengumuman', component: ScreenDetailPengumuman},
  {name: 'notifPengumuman', component: ScreenNotifPengumuman},
  {name: 'listTimesheet', component: ListTimesheet},
  {name: 'detailTimesheetUpdate', component: DetailTimesheetUpdate},
];

const routeName = 'splash';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right', // Atur efek slide dari kanan
      }}
      initialRouteName={routeName}>
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
