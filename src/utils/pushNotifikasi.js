/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_GABUNGAN} from '@env';
import {getDataFromSession} from './getDataSession';
import {
  configureNotifications,
  createNotificationChannel,
  sendNotification,
} from './notifikasi';
import { configureNotificationsApproval, createNotificationChannelApproval, sendNotificationApproval } from './notifikasiApproval';

const storeDataToAsyncStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error storing data to AsyncStorage:', error);
  }
};

const getDataFromAsyncStorage = async key => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Error getting data from AsyncStorage:', error);
    return null;
  }
};

const pushPesan = (navigation, judul, isi, screen, id) => {
  configureNotifications(navigation, screen, id);
  createNotificationChannel('channel_4');
  sendNotification('channel_4', judul, isi, id, screen);
};
const pushPesanApproval = (
  navigation,
  judul,
  isi,
  screen,
  id,
  kategori,
  notificationId,
  channel
) => {
  configureNotificationsApproval(
    navigation,
    screen,
    id,
    kategori,
    notificationId,
  );
  createNotificationChannelApproval(channel);
  sendNotificationApproval(channel, judul, isi, id, kategori, screen);
};

export const pushNewAnnouncementNotification = async ({navigation}) => {
  try {
    const token = await getDataFromSession('token');
    if (token !== null) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        API_GABUNGAN + '/api/master-data/announcement-view',
        {headers},
      );
      const data = response.data.data;

      const processedData = data.map(item => ({
        id: item.id,
        usrCrt: item.usrCrt,
        note: item.note,
        header: item.header,
        tgl_upload: item.tgl_upload,
        status: false,
      }));

      // Get previously stored data from AsyncStorage
      const prevData = await getDataFromAsyncStorage('prevData');

      // Check if there is new data
      const isNewData =
        JSON.stringify(prevData) !== JSON.stringify(processedData);

      if (isNewData) {
        // Trigger pushPesan function with the latest data
        const latestData = processedData[processedData.length - 1];
        pushPesan(
          navigation,
          'New Announcement',
          latestData.note,
          'detailPengumuman',
          latestData.id,
        );

        // Save the current data as previous data for future comparison
        await storeDataToAsyncStorage('prevData', processedData);

        // Use moveTo to navigate to a specific screen with the latest data and id
        // moveTo(navigation, 'detailPengumuman', latestData.id);
      }

      // ... (your existing logic for saving to storage or any other processing)
    } else {
      console.log('Data tidak ditemukan di session.');
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
};



export const pushNewApprovalNotification = async ({navigation}) => {
  try {
    const token = await getDataFromSession('token');

    if (token !== null) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
      const response = await axios.get(apiUrlNotifApproval, {headers});

      console.log('API Response:', response);

      // Proses data notifikasi libur
      const liburApprovals = response.data.data.liburApprovals;
      console.log('Data libur:', liburApprovals);
      processNotificationData(
        navigation,
        liburApprovals,
        'libur',
        'prevDataLibur',
        'channel_5'
      );

      // Proses data notifikasi lembur
      const lemburApprovals = response.data.data.liburApprovals;
      console.log('Data lembur:', lemburApprovals);
      processNotificationData(
        navigation,
        lemburApprovals,
        'lembur',
        'prevDataLembur',
        'channel_6',
      );

      // Proses data notifikasi absen pulang
      const absenPulangApprovals = response.data.data.absenPulangApprovals;
      console.log('Data absen pulang:', absenPulangApprovals);
      processNotificationData(
        navigation,
        absenPulangApprovals,
        'absen-pulang',
        'prevDataAbsenPulang',
        'channel_7',
      );

      // Proses data notifikasi cuti web
      const cutiWebApprovals = response.data.data.cutiApprovalWebs;
      console.log('Data cuti web:', cutiWebApprovals);
      processNotificationData(
        navigation,
        cutiWebApprovals,
        'cuti-web',
        'prevDataCutiWeb',
        'channel_8',
      );

      // Proses data notifikasi reimburse
      const reimburseApprovals = response.data.data.reimburseApprovals;
      console.log('Data reimburse:', reimburseApprovals);
      processNotificationData(
        navigation,
        reimburseApprovals,
        'reimburse',
        'prevDataReimburse',
        'channel_9',
      );
    } else {
      console.log('Data tidak ditemukan di session.');
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
};

const processNotificationData = async (navigation, data, type, storageKey, channel) => {
  try {
    const processedData = data.map(item => ({
      id: item.id,
      nama: item.nama,
    }));

    // Get previously stored data from AsyncStorage
    const prevData = await getDataFromAsyncStorage(storageKey);

    // Check if there is new data
    const isNewData =
      JSON.stringify(prevData) !== JSON.stringify(processedData);

    if (isNewData) {
      for (const item of processedData) {
        const notificationId = item.id.toString();
        pushPesanApproval(
          navigation,
          `New Approval ${type}`,
          item.nama,
          'detailApproval',
          item.id,
          type,
          notificationId,
          channel,
        );
      }

      await storeDataToAsyncStorage(storageKey, processedData);
    }
  } catch (error) {
    console.error(`Error fetching ${type} data:`, error.response);
  }
};


// export default pushNewAnnouncementNotification;

// export const pushNewApprovalNotification = async ({navigation}) => {
//   try {
//     const token = await getDataFromSession('token');
//     if (token !== null) {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       await processLiburApprovals(headers, navigation);
//       await processLemburApprovals(headers, navigation);
//       await processAbsenPulangApprovals(headers, navigation);
//       await processCutiWebApprovals(headers, navigation);
//       await processReimburseApprovals(headers, navigation);

//       // ... (other try-catch blocks)
//     } else {
//       console.log('Data tidak ditemukan di session.');
//     }
//   } catch (error) {
//     console.error('Terjadi kesalahan:', error);
//   }
// };
// const processLiburApprovals = async (headers, navigation) => {
//   try {
//     const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
//     const response = await axios.get(apiUrlNotifApproval, {headers});
//     const liburApprovals = response.data.data.liburApprovals;
//     const liburCount = liburApprovals.filter(item => item.isLibur === '1');
//     const processedDataLibur = liburCount.map(item => ({
//       id: item.id,
//       nama: item.nama,
//     }));

//     const prevDataLibur = await getDataFromAsyncStorage('prevDataLibur');
//     const isNewDataLibur =
//       JSON.stringify(prevDataLibur) !== JSON.stringify(processedDataLibur);

//     if (isNewDataLibur) {
//       for (const item of processedDataLibur) {
//         const notificationId = item.id.toString();
//         pushPesanApproval(
//           navigation,
//           'New Approval Libur',
//           item.nama,
//           'detailApproval',
//           item.id,
//           'libur',
//           notificationId,
//           'channel_5'
//         );
//       }
//       await storeDataToAsyncStorage('prevDataLibur', processedDataLibur);
//     }
//   } catch (error) {
//     console.error('Error fetching libur data:', error.response);
//   }
// };

// const processLemburApprovals = async (headers, navigation) => {
//   try {
//     // ... (code sebelumnya)

//     const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
//     const response = await axios.get(apiUrlNotifApproval, {headers});

//     // Proses data notifikasi lembur
//     const lemburApprovals = response.data.data.liburApprovals;
//     const lemburCount = lemburApprovals.filter(item => item.isLembur === '1');
//     console.log('data lembur : ', lemburCount);
//     const processedDataLembur = lemburCount.map(item => ({
//       id: item.id,
//       nama: item.nama,
//     }));

//     // Get previously stored data from AsyncStorage
//     const prevDataLembur = await getDataFromAsyncStorage('prevDataLembur');

//     // Check if there is new data
//     const isNewDataLembur =
//       JSON.stringify(prevDataLembur) !== JSON.stringify(processedDataLembur);

//     if (isNewDataLembur) {
//       for (const item of processedDataLembur) {
//         const notificationId = item.id.toString();
//         pushPesanApproval(
//           navigation,
//           'New Approval Lembur',
//           item.nama,
//           'detailApproval',
//           item.id,
//           'lembur',
//           notificationId,
//           'channel_6'
//         );
//       }
//       await storeDataToAsyncStorage('prevDataLembur', processedDataLembur);
//     }
//   } catch (error) {
//     console.error('Error fetching lembur data:', error.response);
//   }
// };

// const processAbsenPulangApprovals = async (headers, navigation) => {
//   try {
//     const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
//     const response = await axios.get(apiUrlNotifApproval, {headers});

//     const absenPulangApproval = response.data.data.absenPulangApprovals;
//     console.log('data absen pulang : ', absenPulangApproval);
//     const processedDataAbsenPulang = absenPulangApproval.map(item => ({
//       id: item.id,
//       nama: item.nama,
//     }));

//     // Get previously stored data from AsyncStorage
//     const prevDataAbsenPulang = await getDataFromAsyncStorage(
//       'prevDataAbsenPulang',
//     );

//     // Check if there is new data
//     const isNewDataAbsenPulang =
//       JSON.stringify(prevDataAbsenPulang) !==
//       JSON.stringify(processedDataAbsenPulang);

//     if (isNewDataAbsenPulang) {
//       // Iterate through the processed data and send notifications
//       for (const item of processedDataAbsenPulang) {
//         // Use item.id as the unique notification ID
//         const notificationId = item.id.toString();

//         // Trigger pushPesan function with the latest data and unique notification ID
//         pushPesanApproval(
//           navigation,
//           'New Approval Absen Pulang',
//           item.nama,
//           'detailApproval',
//           item.id,
//           'absen-pulang',
//           notificationId,
//           'channel_7'
//         );
//       }

//       // Save the current data as previous data for future comparison
//       await storeDataToAsyncStorage(
//         'prevDataAbsenPulang',
//         processedDataAbsenPulang,
//       );

//       // Use moveTo to navigate to a specific screen with the latest data and id
//       // moveTo(navigation, 'detailPengumuman', latestData.id);
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error.response);
//   }

// };

// const processCutiWebApprovals = async (headers, navigation) => {
//   try {
//     const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
//     const response = await axios.get(apiUrlNotifApproval, {headers});

//     const cutiWebApproval = response.data.data.cutiApprovalWebs;
//     console.log('data cuti web : ', cutiWebApproval);
//     const processedDataCutiWeb = cutiWebApproval.map(item => ({
//       id: item.id,
//       nama: item.nama,
//     }));

//     // Get previously stored data from AsyncStorage
//     const prevDataCutiWeb = await getDataFromAsyncStorage('prevDataCutiWeb');

//     // Check if there is new data
//     const isNewDataCutiWeb =
//       JSON.stringify(prevDataCutiWeb) !== JSON.stringify(processedDataCutiWeb);

//     if (isNewDataCutiWeb) {
//       // Iterate through the processed data and send notifications
//       for (const item of processedDataCutiWeb) {
//         // Use item.id as the unique notification ID
//         const notificationId = item.id.toString();

//         // Trigger pushPesan function with the latest data and unique notification ID
//         pushPesanApproval(
//           navigation,
//           'New Approval Cuti Web',
//           item.nama,
//           'detailApproval',
//           item.id,
//           'cuti-web',
//           notificationId,
//           'channel_8'
//         );
//       }

//       // Save the current data as previous data for future comparison
//       await storeDataToAsyncStorage('prevDataCutiWeb', processedDataCutiWeb);

//       // Use moveTo to navigate to a specific screen with the latest data and id
//       // moveTo(navigation, 'detailPengumuman', latestData.id);
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error.response);
//   }
// };

// const processReimburseApprovals = async (headers, navigation) => {
//       try {
//         const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
//         const response = await axios.get(apiUrlNotifApproval, {headers});

//         const reimburseApproval = response.data.data.reimburseApprovals;
//         console.log('data reimburse : ', reimburseApproval);
//         const processedDataReimburse = reimburseApproval.map(item => ({
//           id: item.id,
//           nama: item.nama,
//         }));

//         // Get previously stored data from AsyncStorage
//         const prevDataReimburse = await getDataFromAsyncStorage(
//           'prevDataReimburse',
//         );

//         // Check if there is new data
//         const isNewDataReimburse =
//           JSON.stringify(prevDataReimburse) !==
//           JSON.stringify(processedDataReimburse);

//         if (isNewDataReimburse) {
//           // Iterate through the processed data and send notifications
//           for (const item of processedDataReimburse) {
//             // Use item.id as the unique notification ID
//             const notificationId = item.id.toString();

//             // Trigger pushPesan function with the latest data and unique notification ID
//             pushPesanApproval(
//               navigation,
//               'New Approval Reimburse',
//               item.nama,
//               'detailApproval',
//               item.id,
//               'reimburse',
//               notificationId,
//               'channel_8'
//             );
//           }

//           // Save the current data as previous data for future comparison
//           await storeDataToAsyncStorage(
//             'prevDataReimburse',
//             processedDataReimburse,
//           );

//           // Use moveTo to navigate to a specific screen with the latest data and id
//           // moveTo(navigation, 'detailPengumuman', latestData.id);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error.response);
//       }
// };