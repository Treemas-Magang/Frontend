/* eslint-disable prettier/prettier */
// Di file yang sama (contoh: pengumumanFunctions.js)
import axios from 'axios';
import {getDataFromSession} from './getDataSession';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Objek untuk menyimpan data pengumuman
const pengumumanData = {
  data: [],
  storageData: [],
};

// Fungsi untuk mengambil data dari sesi
export const getToken = async () => {
  try {
    const token = await getDataFromSession('token');
    if (token !== null) {
      await getData(token); // Panggil getData setelah menerima token
    } else {
      console.log('Data tidak ditemukan di session.');
    }
  } catch (error) {
    console.error('Terjadi kesalahan dalam getDataFromSession:', error);
  }
};

// Fungsi untuk mengambil data dari API
export const getData = async token => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      'https://treemas-api-403500.et.r.appspot.com/api/master-data/announcement-view',
      {headers},
    );
    const data = response.data.data;
    pengumumanData.data = data.map(item => ({
      id: item.id,
      usrCrt: item.usrCrt,
      note: item.note,
      header: item.header,
      tgl_upload: item.tgl_upload,
      status: false,
    }));

    await checkAndSaveToStorage(pengumumanData.data);
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
};

// Fungsi untuk menyimpan data ke penyimpanan lokal
export const checkAndSaveToStorage = async data => {
  try {
    const dataToSave = [...data];
    const dataFromStorage = await AsyncStorage.getItem('announcementData');

    if (dataFromStorage !== null) {
      const parsedData = JSON.parse(dataFromStorage);

      for (const item of dataToSave) {
        const existingItem = parsedData.find(
          storageItem => storageItem.id === item.id,
        );

        if (existingItem) {
          if (existingItem.status === true) {
            console.log(
              `ID ${item.id} sudah memiliki status true di AsyncStorage, skip penyimpanan.`,
            );
            continue;
          } else {
            existingItem.usrCrt = item.usrCrt;
            existingItem.note = item.note;
            existingItem.header = item.header;
            existingItem.tgl_upload = item.tgl_upload;
          }
        } else {
          parsedData.push(item);
        }
      }

      await AsyncStorage.setItem(
        'announcementData',
        JSON.stringify(parsedData),
      );
      console.log('Data berhasil disimpan ke AsyncStorage');
    } else {
      await AsyncStorage.setItem(
        'announcementData',
        JSON.stringify(dataToSave),
      );
      console.log('Data berhasil disimpan ke AsyncStorage');
    }
  } catch (error) {
    console.error('Gagal menyimpan data ke AsyncStorage:', error);
  }
};

// Fungsi untuk mengubah status di penyimpanan lokal
export const updateStatusInStorage = async id => {
  try {
    const dataFromStorage = await AsyncStorage.getItem('announcementData');

    if (dataFromStorage !== null) {
      const parsedData = JSON.parse(dataFromStorage);

      const itemToUpdate = parsedData.find(item => item.id === id);

      if (itemToUpdate) {
        itemToUpdate.status = true;
        await AsyncStorage.setItem(
          'announcementData',
          JSON.stringify(parsedData),
        );
        console.log(
          `Status untuk ID ${id} berhasil diubah menjadi true di AsyncStorage`,
        );
      } else {
        console.log(`Item dengan ID ${id} tidak ditemukan.`);
      }
    } else {
      console.log('Data tidak ditemukan di AsyncStorage');
    }
  } catch (error) {
    console.error('Gagal mengubah status di AsyncStorage:', error);
  }
};
// Fungsi untuk menghitung data dengan status true
// Fungsi untuk menghitung data dengan status true dari AsyncStorage
export const countDataWithFalseStatus = async () => {
  try {
    const dataFromStorage = await AsyncStorage.getItem('announcementData');
    if (dataFromStorage !== null) {
      const parsedData = JSON.parse(dataFromStorage);
      const falseStatusCount = parsedData.filter(item => item.status === false).length;
    //   const trueStatusCount = parsedData.filter(item => item.status === true).length;
      return falseStatusCount.toString(); // Mengonversi hasil perhitungan menjadi string
    } else {
      return '0'; // Mengembalikan '0' jika data tidak ditemukan di AsyncStorage
    }   
  } catch (error) {
    console.error('Gagal mengambil data dari AsyncStorage:', error);
    return '0'; // Mengembalikan '0' jika terjadi kesalahan
  }
};