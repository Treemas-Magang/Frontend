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
  ScreenPilihAbsenProject,
  ScreenPilihProject,
  ScreenDashboardForm,
  ScreenDashboardNotif,
  ScreenDashboardRekap,
  ScreenDashboardKehadiran,
  ScreenFormAbsensi,
  ScreenCekCuti,
  ScreenDetailReimburse,
  ScreenListReimburse,
  ScreenUpdateListProject,
  ScreenListAbsen,
  ScreenDetailAbsen,
  ScreenRekapSakit,
  ScreenFormCuti,
  ScreenRekapCuti,
  ScreenFormClaim,
  ScreenListMembers,
  ScreenAbsenBelumPulang,
  ScreenFormAbsenBelumPulang,
  ScreenListMemberProject,
  ScreenDetailMemberCuti,
  ScreenDetailMemberSakit,
  ScreenDetailMember,
  ScreenFormSakit,
  ScreenDetailMemberTidakMasuk,
} from '../pages/index';
import CardUpdateTimesheet from '../components/molecules/CardUpdateTimesheet';
import FormUpdateTimesheet from '../components/organisms/FormUpdateTimesheet';
import FormCatatanKerjaHariini from '../components/organisms/FormCatatanKerjaHariini';
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
  {
    name: 'formAbsensi',
    component: ScreenFormAbsensi,
    gestureEnabled: true,
  },
  {
    name: 'dashboardKehadiran',
    component: ScreenDashboardKehadiran,
    gestureEnabled: true,
  },
  {
    name: 'formCatatanKerjaHariini',
    component: FormCatatanKerjaHariini,
    gestureEnabled: true,
  },
  {
    name: 'cekCuti',
    component: ScreenCekCuti,
    gestureEnabled: true,
  },
  {
    name: 'listReimburse',
    component: ScreenListReimburse,
    gestureEnabled: true,
  },
  {
    name: 'detailReimburse',
    component: ScreenDetailReimburse,
    gestureEnabled: true,
  },
  {
    name: 'updateListProject',
    component: ScreenUpdateListProject,
    gestureEnabled: true,
  },
  {
    name: 'listAbsen',
    component: ScreenListAbsen,
    gestureEnabled: true,
  },
  {
    name: 'detailAbsen',
    component: ScreenDetailAbsen,
    gestureEnabled: true,
  },
  {
    name: 'rekapSakit',
    component: ScreenRekapSakit,
    gestureEnabled: true,
  },
  {
    name: 'formCuti',
    component: ScreenFormCuti,
    gestureEnabled: true,
  },
  {
    name: 'rekapCuti',
    component: ScreenRekapCuti,
    gestureEnabled: true,
  },
  {
    name: 'formClaim',
    component: ScreenFormClaim,
    gestureEnabled: true,
  },
  {
    name: 'listMembers',
    component: ScreenListMembers,
    gestureEnabled: true,
  },
  {
    name: 'absenBelumPulang',
    component: ScreenAbsenBelumPulang,
    gestureEnabled: true,
  },
  {
    name: 'formAbsenBelumPulang',
    component: ScreenFormAbsenBelumPulang,
    gestureEnabled: true,
  },
  {
    name: 'formSakit',
    component: ScreenFormSakit,
    gestureEnabled: true,
  },
  {
    name: 'listMemberProject',
    component: ScreenListMemberProject,
    gestureEnabled: true,
  },
  {
    name: 'detailMemberCuti',
    component: ScreenDetailMemberCuti,
    gestureEnabled: true,
  },
  {
    name: 'detailMemberSakit',
    component: ScreenDetailMemberSakit,
    gestureEnabled: true,
  },
  {
    name: 'detailMember',
    component: ScreenDetailMember,
    gestureEnabled: true,
  },
  {
    name: 'detailMemberTidakMasuk',
    component: ScreenDetailMemberTidakMasuk,
    gestureEnabled: true,
  },
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
            gestureEnabled: screen.gestureEnabled,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}

export default App;
