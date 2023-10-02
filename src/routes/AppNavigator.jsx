/* eslint-disable prettier/prettier */
// In App.js in a new project

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListTimesheet from '../components/organisms/ListTimesheet';
import {
  ScreenDashboard,
  ScreenDetailPengumuman,
  ScreenLogin,
  ScreenLupaPassword,
  ScreenNotifPengumuman,
  ScreenSplash,
  ScreenDetailTimesheet,
  ScreenGagalSidikJari,
} from '../pages/index';
import CardUpdateTimesheet from '../components/molecules/CardUpdateTimesheet';
import FormUpdateTimesheet from '../components/organisms/FormUpdateTimesheet';
import ScreenDashboardNotif from '../pages/screen/ScreenDashboardNotif';
import ScreenDashboardRekap from '../pages/screen/ScreenDashboardRekap';
import ScreenDashboardForm from '../pages/screen/ScreenDashboardForm';
import PilihProject from '../components/organisms/PilihProject';
import CardPilihProject from '../components/molecules/CardPilihProject';
import ScreenPilihProject from '../pages/screen/ScreenPilihProject';
import ScreenPilihAbsenProject from '../pages/screen/ScreenPilihAbsenProject';
const screens = [
  {name: 'splash', component: ScreenSplash, gestureEnabled: false},
  {name: 'login', component: ScreenLogin, gestureEnabled: false},
  {name: 'lupaPassword', component: ScreenLupaPassword, gestureEnabled: true},
  {name: 'dashboard', component: ScreenDashboard, gestureEnabled: false},
  {
    name: 'detailPengumuman',
    component: ScreenDetailPengumuman,
    gestureEnabled: true,
  },
  {
    name: 'notifPengumuman',
    component: ScreenNotifPengumuman,
    gestureEnabled: true,
  },
  {name: 'listTimesheet', component: ListTimesheet, gestureEnabled: true},
  {
    name: 'detailTimesheet',
    component: ScreenDetailTimesheet,
    gestureEnabled: true,
  },
  {
    name: 'cardUpdateTimesheet',
    component: CardUpdateTimesheet,
    gestureEnabled: true,
  },
  {
    name: 'formUpdateTimesheet',
    component: FormUpdateTimesheet,
    gestureEnabled: true,
  },
  {
    name: 'gagalSidikJari',
    component: ScreenGagalSidikJari,
    gestureEnabled: false,
  },
  {
    name: 'dashboardNotif',
    component: ScreenDashboardNotif,
    gestureEnabled: true,
  },
  {
    name: 'dashboardRekap',
    component: ScreenDashboardRekap,
    gestureEnabled: true,
  },
  {
    name: 'dashboardForm',
    component: ScreenDashboardForm,
    gestureEnabled: true,
  },
  {
    name: 'pilihProject',
    component: ScreenPilihProject,
    gestureEnabled: true,
  },
  {
    name: 'pilihAbsenProject',
    component: ScreenPilihAbsenProject,
    gestureEnabled: true,
  },
];

const routeName = 'pilihProject';
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
            gestureEnabled: screen.gestureEnabled,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}

export default App;
