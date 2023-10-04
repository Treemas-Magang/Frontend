/* eslint-disable prettier/prettier */
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
const getAppVersion = async () => {
  try {
    const appVersion = await DeviceInfo.getVersion();
    await AsyncStorage.setItem('appVersion', appVersion);
    return appVersion;
  } catch (error) {
    console.error('Error fetching app version:', error);
    return null; // Mengembalikan null sebagai nilai kesalahan
  }
};

export default getAppVersion;
