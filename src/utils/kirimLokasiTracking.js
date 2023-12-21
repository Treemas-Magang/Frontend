/* eslint-disable prettier/prettier */
import axios from 'axios';
import {getDataFromSession} from './getDataSession';
import {API_GABUNGAN} from '@env';
import {Alert, BackHandler} from 'react-native';
import RNRestart from 'react-native-restart';
import Geolocation from '@react-native-community/geolocation';

let lokasi = {
  accuracy: null,
  latitude: null,
  longitude: null,
};

const exit = () => {
  BackHandler.exitApp();
};

export const kirimLokasiTracking = async () => {
  try {
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude, accuracy} = position.coords;
        lokasi = {
          accuracy,
          latitude,
          longitude,
        };

        console.log('Objek Lokasi:', lokasi);

        // Peroleh token dari sesi
        const token = await getDataFromSession('token');

        // Pastikan semua nilai lokasi sudah diisi dan token tersedia sebelum mengirim
        if (
          token !== null &&
          lokasi.accuracy !== null &&
          lokasi.latitude !== null &&
          lokasi.longitude !== null
        ) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          // Kirim data lokasi
          const response = await axios.post(
            `${API_GABUNGAN}/api/tracking/post-location-history`,
            {lokasi},
            {headers},
          );

          console.log('Berhasil upload');
          console.log('Response:', response.data);
        }
      },
      error => {
        if (error.code === 2) {
          console.log('GPS dinonaktifkan');
          Alert.alert(
            'GPS Dinonaktifkan',
            'Mohon aktifkan GPS untuk menggunakan aplikasi.',
            [{text: 'OK', onPress: () => exit()}],
          );
          return; // Tidak perlu menjalankan kode selanjutnya
        }
        if (error.code === 3) {
          console.log('terlalu lama mencari lokasi');
          Alert.alert(
            'Terlalu Lama Mencari Lokasi',
            'Coba lagi nanti atau periksa koneksi GPS Anda.',
            [{text: 'OK', onPress: () => RNRestart.Restart()}],
          );
        } else {
          console.error('Kesalahan saat mengambil lokasi:', error);
        }
      },
      {enableHighAccuracy: false, maximumAge: 50000, timeout: 10000},
    );

    // Kode yang tidak memerlukan lokasi dapat tetap berada di luar pemanggilan getCurrentPosition
    // ...
  } catch (error) {
    console.error('Error:', error.response);
  }
};
