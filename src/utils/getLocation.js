/* eslint-disable prettier/prettier */
import Geolocation from '@react-native-community/geolocation';
import {Alert, BackHandler} from 'react-native';
import RNRestart from 'react-native-restart';
const exit = () => {
  BackHandler.exitApp();
};

const getLocation = () => {
  return new Promise(async (resolve, reject) => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude, accuracy} = position.coords;
          resolve({latitude, longitude, accuracy});
        },
        error => {
          if (error.code === 2) {
            console.log('GPS dinonaktifkan');
            Alert.alert(
              'GPS Dinonaktifkan',
              'Mohon aktifkan GPS untuk menggunakan aplikasi.',
              [{text: 'OK', onPress: () => exit()}],
            );
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
        {enableHighAccuracy: false, maximumAge: 30000, timeout: 5000},
      );
    } catch (error) {
      console.error('Kesalahan saat mengambil data lokasi:', error);
    }
  });
};

export default getLocation;
