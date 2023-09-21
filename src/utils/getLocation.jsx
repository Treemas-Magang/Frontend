import Geolocation from '@react-native-community/geolocation';
import {Linking} from 'react-native';
const enableGPS = () => {
  Linking.openSettings();
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
            // Kode 2 berarti "No location provider available", yang berarti GPS dinonaktifkan
            console.log('GPS dinonaktifkan');
            enableGPS(); // Buka pengaturan GPS
          }
          if (error.code === 3) {
            console.log('terlalu lama mencari lokasi');
          } else {
            console.error('Kesalahan saat mengambil lokasi:', error);
          }
        },
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 5000},
      );
    } catch (error) {
      console.error('Kesalahan saat mengambil data lokasi:', error);
    }
  });
};

export default getLocation;
