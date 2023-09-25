import DeviceInfo from 'react-native-device-info';

const getIdDevice = async () => {
  try {
    const device = await DeviceInfo.getAndroidId();
    return device;
  } catch (error) {
    console.error('Error fetching device ID:', error);
    return null;
  }
};

export default getIdDevice