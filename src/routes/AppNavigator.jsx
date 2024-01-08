/* eslint-disable prettier/prettier */
// In App.js in a new project

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
  ScreenBelumAbsenPulang,
  ScreenFormBelumAbsenPulang,
  ScreenListMemberProject,
  ScreenDetailMemberCuti,
  ScreenDetailMemberSakit,
  ScreenDetailMember,
  ScreenFormSakit,
  ScreenDetailMemberTidakMasuk,
  ScreenApproval,
  ScreenDetailApproval,
  ScreenAbsensi,
  ScreenRekapClaim,
  ScreenListTimesheet,
  ScreenUpdatePassword,
  ScreenPreviewPhoto,
  ScreenTesNotifikasi,
  ScreenFormAbsenPulang,
  ScreenFormUpdateTimesheet,
  ScreenFormUpdateAbsensi,
  ScreenFormAbsensiOther,
  ScreenDetailProfile,
  ScreenPreviewPhotoAPI,
  ScreenFormUpdateAbsensiOther,
  ScreenCobaDownloadApk,
} from '../pages/index';
import MapPreviewTracking from '../components/organisms/MapPreviewTracking';
import ScreenCobaTimeInput from '../pages/screen/ScreenCobaTimeInput';
import SkeletonDetailProfile from '../components/skeleton/SkeletonDetailProfile';
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
  {name: 'listTimesheet', component: ScreenListTimesheet, gestureEnabled: true},
  {
    name: 'detailTimesheet',
    component: ScreenDetailTimesheet,
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
    name: 'belumAbsenPulang',
    component: ScreenBelumAbsenPulang,
    gestureEnabled: true,
  },
  {
    name: 'formBelumAbsenPulang',
    component: ScreenFormBelumAbsenPulang,
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
  {
    name: 'detailApproval',
    component: ScreenDetailApproval,
    gestureEnabled: true,
  },
  {
    name: 'approval',
    component: ScreenApproval,
    gestureEnabled: true,
  },
  {
    name: 'absensi',
    component: ScreenAbsensi,
    gestureEnabled: true,
  },
  {
    name: 'rekapClaim',
    component: ScreenRekapClaim,
    gestureEnabled: true,
  },
  {
    name: 'updatePassword',
    component: ScreenUpdatePassword,
    gestureEnabled: true,
  },
  {
    name: 'previewPhoto',
    component: ScreenPreviewPhoto,
    gestureEnabled: true,
  },
  {
    name: 'testNotifikasi',
    component: ScreenTesNotifikasi,
    gestureEnabled: true,
  },
  {
    name: 'formAbsenPulang',
    component: ScreenFormAbsenPulang,
    gestureEnabled: true,
  },
  {
    name: 'formUpdateTimesheet',
    component: ScreenFormUpdateTimesheet,
    gestureEnabled: true,
  },
  {
    name: 'formUpdateAbsensi',
    component: ScreenFormUpdateAbsensi,
    gestureEnabled: true,
  },
  {
    name: 'formAbsensiOther',
    component: ScreenFormAbsensiOther,
    gestureEnabled: true,
  },
  {
    name: 'detailProfile',
    component: ScreenDetailProfile,
    gestureEnabled: true,
  },
  // {
  //   name: 'coba',
  //   component: SkeletonDetailProfile,
  //   gestureEnabled: true,
  // },
  {
    name: 'mapTracking',
    component: MapPreviewTracking,
    gestureEnabled: true,
  },
  {
    name: 'cobaInputTime',
    component: ScreenCobaTimeInput,
    gestureEnabled: true,
  },
  {
    name: 'previewPhotoAPI',
    component: ScreenPreviewPhotoAPI,
    gestureEnabled: true,
  },
  {
    name: 'formUpdateAbsensiOther',
    component: ScreenFormUpdateAbsensiOther,
    gestureEnabled: true,
  },
  {
    name: 'cobaDownloadApk',
    component: ScreenCobaDownloadApk,
    gestureEnabled: true,
  },
];

const routeName = 'cobaDownloadApk';
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
