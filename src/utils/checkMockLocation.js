/* eslint-disable prettier/prettier */
import { isMockingLocation, MockLocationDetectorErrorCode, MockLocationDetectorError } from 'react-native-turbo-mock-location-detector';
import { Alert, BackHandler } from 'react-native';

const exit = () => {
  BackHandler.exitApp();
};

export const checkMockLocation = () => {
      isMockingLocation()
    .then(({ isLocationMocked }) => {
      // isLocationMocked: boolean
      console.log('terdeteksi fake GPS : ',isLocationMocked)
      if (isLocationMocked) {
        Alert.alert(
          'Peringatan',
          'FAKE GPS TERDETEKSI TOLONG MATIKAN FAKE GPS ANDA !!!',
            [{text: 'OK', onPress: () => exit()}],
          { cancelable: false }
        );
      }
      // Hasil boolean untuk Android dan iOS >= 15.0
    })
    .catch((error) => {
      // error.message - pesan deskriptif
      switch (error.code) {
        case MockLocationDetectorErrorCode.GPSNotEnabled:
          // Pengguna menonaktifkan GPS
          return;
        case MockLocationDetectorErrorCode.NoLocationPermissionEnabled:
          // Pengguna tidak memiliki izin untuk mengakses lokasi
          return;
        case MockLocationDetectorErrorCode.CantDetermine:
          // Selalu untuk iOS < 15.0
          // Untuk Android dan iOS jika tidak bisa mengambil posisi GPS
      }
    });
};

// Kemudian, Anda dapat memanggil fungsi ini di mana saja dalam komponen Anda, misalnya:
// checkMockLocation();
