import DeviceInfo from 'react-native-device-info';
const getAppVersion = async () => {
  try {
    const appVersion = await DeviceInfo.getVersion();
    return appVersion;
  } catch (error) {
    console.error('Error fetching app version:', error);
    return null;
  }
};


export default getAppVersion;
