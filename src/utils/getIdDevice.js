/* eslint-disable prettier/prettier */
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
const getIdDevice = async () => {
  try {
    const device = await DeviceInfo.getAndroidId();
    await AsyncStorage.setItem('deviceId', device);
    return device;
  } catch (error) {
    console.error('Error fetching device ID:', error);
    return null;
  }
};

export default getIdDevice;
