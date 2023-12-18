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
  sendNotification('channel_4', judul, isi);
};
const pushPesanApproval = (navigation, judul, isi, screen, id, kategori) => {
  configureNotifications(navigation, screen, id, kategori);
  createNotificationChannel('channel_5');
  sendNotification('channel_5', judul, isi);
};

// const moveTo = (navigation, screenName, id) => {
//   // Implement your navigation logic here
//   navigation.navigate(screenName, {
//     id: id,
//   });
// };


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
          navigation
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

// export default pushNewAnnouncementNotification;

export const pushNewApprovalNotification = async ({navigation}) => {
    try {
    const token = await getDataFromSession('token');
    if (token !== null) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
    try {
      const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
      const response = await axios.get(apiUrlNotifApproval, {headers});

      const liburApprovals = response.data.data.liburApprovals;
      const liburCount = liburApprovals.filter(item => item.isLibur === '1');
      const lemburCount = liburApprovals.filter(item => item.isLembur === '1');

      const processedDataLibur = liburCount.map(item => ({
        id: item.id,
        nama: item.nama,
      }));

      // Get previously stored data from AsyncStorage
      const prevDataLibur = await getDataFromAsyncStorage('prevDataLibur');

      // Check if there is new data
      const isNewDataLibur =
        JSON.stringify(prevDataLibur) !== JSON.stringify(processedDataLibur);

      if (isNewDataLibur) {
        // Trigger pushPesan function with the latest data
        const latestData = processedDataLibur[processedDataLibur.length - 1];
        pushPesanApproval(
          navigation,
          'New Approval Libur',
          latestData.nama,
          'detailApproval',
          latestData.id,
          'libur',
        );

        // Save the current data as previous data for future comparison
        await storeDataToAsyncStorage('prevDataLibur', processedDataLibur);

        // Use moveTo to navigate to a specific screen with the latest data and id
        // moveTo(navigation, 'detailPengumuman', latestData.id);
      }
      const processedDataLembur = liburCount.map(item => ({
        id: item.id,
        nama: item.nama,
      }));

      // Get previously stored data from AsyncStorage
      const prevDataLembur = await getDataFromAsyncStorage('prevDataLembur');

      // Check if there is new data
      const isNewData =
        JSON.stringify(prevDataLembur) !== JSON.stringify(processedDataLembur);

      if (isNewData) {
        // Trigger pushPesan function with the latest data
        const latestData = processedDataLembur[processedDataLembur.length - 1];
        pushPesanApproval(
          navigation,
          'New Approval Lembur',
          latestData.nama,
          'detailApproval',
          latestData.id,
          'lembur',
        );

        // Save the current data as previous data for future comparison
        await storeDataToAsyncStorage('prevDataLembur', processedDataLembur);

        // Use moveTo to navigate to a specific screen with the latest data and id
        // moveTo(navigation, 'detailPengumuman', latestData.id);
      }

      // console.log('get all approval libur : ', liburCount);
      // console.log('get all approval lembur : ', lemburCount);
      // dispatch(setNotiveMasingMasingApproval('libur', liburCount));
      // dispatch(setNotiveMasingMasingApproval('lembur', lemburCount));
    } catch (error) {
      console.error('Error fetching data:', error.response);
    }

    try {
      const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
      const response = await axios.get(apiUrlNotifApproval, {headers});

      const absenPulangApproval = response.data.data.absenPulangApprovals;

      const processedDataAbsenPulang = absenPulangApproval.map(item => ({
        id: item.id,
        nama: item.nama,
      }));

      // Get previously stored data from AsyncStorage
      const prevDataAbsenPulang = await getDataFromAsyncStorage('prevDataAbsenPulang');

      // Check if there is new data
      const isNewDataLibur =
        JSON.stringify(prevDataAbsenPulang) !== JSON.stringify(processedDataAbsenPulang);

      if (isNewDataLibur) {
        // Trigger pushPesan function with the latest data
        const latestData = processedDataAbsenPulang[processedDataAbsenPulang.length - 1];
        pushPesanApproval(
          navigation,
          'New Approval Absen Pulang',
          latestData.nama,
          'detailApproval',
          latestData.id,
          'absen-pulang',
        );

        // Save the current data as previous data for future comparison
        await storeDataToAsyncStorage('prevDataAbsenPulang', processedDataAbsenPulang);

        // Use moveTo to navigate to a specific screen with the latest data and id
        // moveTo(navigation, 'detailPengumuman', latestData.id);
      }
    } catch (error) {
      console.error('Error fetching data:', error.response);
    }

    try {
      const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
      const response = await axios.get(apiUrlNotifApproval, {headers});

      const cutiWebApproval = response.data.data.cutiApprovalWebs;

      const processedDataCutiWeb = cutiWebApproval.map(item => ({
        id: item.id,
        nama: item.nama,
      }));

      // Get previously stored data from AsyncStorage
      const prevDataCutiWeb = await getDataFromAsyncStorage('prevDataCutiWeb');

      // Check if there is new data
      const isNewDataLibur =
        JSON.stringify(prevDataCutiWeb) !== JSON.stringify(processedDataCutiWeb);

      if (isNewDataLibur) {
        // Trigger pushPesan function with the latest data
        const latestData = processedDataCutiWeb[processedDataCutiWeb.length - 1];
        pushPesanApproval(
          navigation,
          'New Approval Cuti Web',
          latestData.nama,
          'detailApproval',
          latestData.id,
          'cuti-web',
        );

        // Save the current data as previous data for future comparison
        await storeDataToAsyncStorage('prevDataCutiWeb', processedDataCutiWeb);

        // Use moveTo to navigate to a specific screen with the latest data and id
        // moveTo(navigation, 'detailPengumuman', latestData.id);
      }
    } catch (error) {
      console.error('Error fetching data:', error.response);
    }

    try {
      const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
      const response = await axios.get(apiUrlNotifApproval, {headers});

      const reimburseApproval = response.data.data.reimburseApprovals;

      const processedDataReimburse = reimburseApproval.map(item => ({
        id: item.id,
        nama: item.nama,
      }));

      // Get previously stored data from AsyncStorage
      const prevDataReimburse = await getDataFromAsyncStorage('prevDataReimburse');

      // Check if there is new data
      const isNewDataLibur =
        JSON.stringify(prevDataReimburse) !== JSON.stringify(processedDataReimburse);

      if (isNewDataLibur) {
        // Trigger pushPesan function with the latest data
        const latestData = processedDataReimburse[processedDataReimburse.length - 1];
        pushPesanApproval(
          navigation,
          'New Approval Reimburse',
          latestData.nama,
          'detailApproval',
          latestData.id,
          'reimburse',
        );

        // Save the current data as previous data for future comparison
        await storeDataToAsyncStorage('prevDataReimburse', processedDataReimburse);

        // Use moveTo to navigate to a specific screen with the latest data and id
        // moveTo(navigation, 'detailPengumuman', latestData.id);
      }
    } catch (error) {
      console.error('Error fetching data:', error.response);
    }

    // try {
    //   const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
    //   const response = await axios.get(apiUrlNotifApproval, {headers});

    //   const reimburseApprovals = response.data.data.reimburseApprovals;
    //   const reimburseApprovalsCount = reimburseApprovals.length;
    //   // dispatch(
    //   //   setNotiveMasingMasingApproval('reimburse', reimburseApprovalsCount),
    //   // );
    //   console.log('get all approval reimburse : ', reimburseApprovalsCount);
    // } catch (error) {
    //   console.error('Error fetching data:', error.response);
    // }

    // try {
    //   const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
    //   const response = await axios.get(apiUrlNotifApproval, {headers});

    //   const absenWebApprovals = response.data.data.absenWebApprovals;
    //   const absenWebApprovalsCount = absenWebApprovals.length;
    //   // dispatch(
    //   //   setNotiveMasingMasingApproval('absen_web', absenWebApprovalsCount),
    //   // );
    //   console.log('get all approval absen web : ', absenWebApprovalsCount);
    // } catch (error) {
    //   console.error('Error fetching data:', error.response);
    // }

    // try {
    //   const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
    //   const response = await axios.get(apiUrlNotifApproval, {headers});

    //   const absenWebApprovals = response.data;
    //   // const absenWebApprovalsCount = absenWebApprovals.length;
    //   // dispatch(
    //   //   setNotiveMasingMasingApproval('absen_web', absenWebApprovalsCount),
    //   // );
    //   console.log('get all approval cancel cuti : ', absenWebApprovals);
    // } catch (error) {
    //   console.error('Error fetching data:', error.response);
    // }

    // try {
    //   const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
    //   const response = await axios.get(apiUrlNotifApproval, {headers});

    //   const cutiApprovals = response.data.data.cutiApprovals;
    //   const cutiCount = cutiApprovals.filter(
    //     item => item.flgKet === 'cuti',
    //   ).length;
    //   const sakitCount = cutiApprovals.filter(
    //     item => item.flgKet === 'sakit',
    //   ).length;
    //   // dispatch(setNotiveMasingMasingApproval('cuti', cutiCount));
    //   // dispatch(setNotiveMasingMasingApproval('sakit', sakitCount));

    //   console.log('get all approval cuti biasa : ', cutiCount);
    //   console.log('get all approval sakit : ', sakitCount);
    // } catch (error) {
    //   console.error('Error fetching data:', error.response);
    // }


    }
    //   const processedData = data.map(item => ({
    //     id: item.id,
    //     usrCrt: item.usrCrt,
    //     note: item.note,
    //     header: item.header,
    //     tgl_upload: item.tgl_upload,
    //     status: false,
    //   }));

    //   // Get previously stored data from AsyncStorage
    //   const prevData = await getDataFromAsyncStorage('prevData');

    //   // Check if there is new data
    //   const isNewData =
    //     JSON.stringify(prevData) !== JSON.stringify(processedData);

    //   if (isNewData) {
    //     // Trigger pushPesan function with the latest data
    //     const latestData = processedData[processedData.length - 1];
    //     pushPesan(
    //       navigation,
    //       'New Announcement',
    //       latestData.note,
    //       'detailPengumuman',
    //       latestData.id,
    //       navigation
    //     );

    //     // Save the current data as previous data for future comparison
    //     await storeDataToAsyncStorage('prevData', processedData);

    //     // Use moveTo to navigate to a specific screen with the latest data and id
    //     // moveTo(navigation, 'detailPengumuman', latestData.id);
    //   }

    //   // ... (your existing logic for saving to storage or any other processing)
    // } else {
    //   console.log('Data tidak ditemukan di session.');
    // }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
};