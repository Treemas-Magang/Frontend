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


      // Proses data notifikasi libur
      const liburApprovals = response.data.data.liburApprovals;

      processNotificationData(
        navigation,
        liburApprovals,
        'libur',
        'prevDataLibur',
        'channel_5'
      );

      // Proses data notifikasi lembur
      const lemburApprovals = response.data.data.liburApprovals;

      processNotificationData(
        navigation,
        lemburApprovals,
        'lembur',
        'prevDataLembur',
        'channel_6',
      );

      // Proses data notifikasi absen pulang
      const absenPulangApprovals = response.data.data.absenPulangApprovals;

      processNotificationData(
        navigation,
        absenPulangApprovals,
        'absen-pulang',
        'prevDataAbsenPulang',
        'channel_7',
      );

      // Proses data notifikasi cuti web
      const cutiWebApprovals = response.data.data.cutiApprovalWebs;

      processNotificationData(
        navigation,
        cutiWebApprovals,
        'cuti-web',
        'prevDataCutiWeb',
        'channel_8',
      );

      // Proses data notifikasi reimburse
      const reimburseApprovals = response.data.data.reimburseApprovals;

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
