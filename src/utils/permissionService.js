// permissionService.js
import {PermissionsAndroid} from 'react-native';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Izinkan mengambil data lokasi?',
        message: 'Aplikasi ini memerlukan izin untuk mengakses lokasi Anda.',
        buttonNeutral: 'Nanti Saja',
        buttonNegative: 'Batal',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default requestLocationPermission;
