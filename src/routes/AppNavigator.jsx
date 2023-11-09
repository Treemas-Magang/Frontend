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
  ScreenAbsenBelumPulang,
  ScreenFormAbsenBelumPulang,
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
} from '../pages/index';
import CardUpdateTimesheet from '../components/molecules/CardUpdateTimesheet';
import FormUpdateTimesheet from '../components/organisms/FormUpdateTimesheet';
import FormCatatanKerjaHariini from '../components/organisms/FormCatatanKerjaHariini';
import SkeletonCardNotif from '../components/skeleton/SkeletonCardNotif';
import SkeletonCardCekCuti from '../components/skeleton/SkeletonCardCekCuti';
import SkeletonCardTimesheet from '../components/skeleton/SkeletonCardTimesheet';
import SkeletonCardReimburse from '../components/skeleton/SkeletonCardReimburse';
import SkeletonDetailReimburse from '../components/skeleton/SkeletonDetailReimburse';
import SkeletonDetailTimesheet from '../components/skeleton/SkeletonDetailTimesheet';
import SkeletonDetailMember from '../components/skeleton/SkeletonDetailMember';
import SkeletonDataPribadi from '../components/skeleton/SkeletonDataPribadi';
import SkeletonCardAbsen from '../components/skeleton/SkeletonCardAbsen';
import SkeletonCardRekapClaim from '../components/skeleton/SkeletonCardRekapClaim';
import SkeeltonCardRekapCuti from '../components/skeleton/SkeletonCardRekapCuti';
import SkeletonCardRekapSakit from '../components/skeleton/SkeletonCardRekapSakit';
import SkeletonCardApproval from '../components/skeleton/SkeletonCardApproval';
import SkeletonCardAbsenBelumPulang from '../components/skeleton/SkeletonCardAbsenBelumPulang';
import SkeletonDetailAbsen from '../components/skeleton/SkeletonDetailAbsen';
import SkeletonDetailApproval from '../components/skeleton/SkeletonDetailApproval';
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
    name: 'skeletonCardNotif',
    component: SkeletonCardNotif,
    gestureEnabled: true,
  },
  {
    name: 'skeletonCardCekCuti',
    component: SkeletonCardCekCuti,
    gestureEnabled: true,
  },
  {
    name: 'skeletonCardTimesheet',
    component: SkeletonCardTimesheet,
    gestureEnabled: true,
  },
  {
    name: 'skeletonCardReimburse',
    component: SkeletonCardReimburse,
    gestureEnabled: true,
  },
  {
    name: 'skeletonDetailReimburse',
    component: SkeletonDetailReimburse,
    gestureEnabled: true,
  },
  {
    name: 'skeletonDetailTimesheet',
    component: SkeletonDetailTimesheet,
    gestureEnabled: true,
  },
  {
    name: 'skeletonDetailMember',
    component: SkeletonDetailMember,
    gestureEnabled: true,
  },
  {
    name: 'skeletonDataPribadi',
    component: SkeletonDataPribadi,
    gestureEnabled: true,
  },
  {
    name: 'skeletonCardAbsen',
    component: SkeletonCardAbsen,
    gestureEnabled: true,
  },
  {
    name: 'skeletonCardRekapClaim',
    component: SkeletonCardRekapClaim,
    gestureEnabled: true,
  },
  {
    name: 'skeletonCardRekapCuti',
    component: SkeeltonCardRekapCuti,
    gestureEnabled: true,
  },
  {
    name: 'skeletonCardRekapSakit',
    component: SkeletonCardRekapSakit,
    gestureEnabled: true,
  },
  {
    name: 'skeletonCardApproval',
    component: SkeletonCardApproval,
    gestureEnabled: true,
  },
  {
    name: 'skeletonCardAbsenBelumPulang',
    component: SkeletonCardAbsenBelumPulang,
    gestureEnabled: true,
  },
  {
    name: 'skeletonDetailAbsen',
    component: SkeletonDetailAbsen,
    gestureEnabled: true,
  },
  {
    name: 'skeletonDetailApproval',
    component: SkeletonDetailApproval,
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
