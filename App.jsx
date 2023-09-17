/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Dropdown from './src/components/atom/Dropdown';
import Kalender from './src/components/atom/Kalender';

// Fungsi custom untuk mendapatkan ID perangkat
const getIdDevice = async () => {
  try {
    const device = await DeviceInfo.getAndroidId();
    return device;
  } catch (error) {
    console.error('Error fetching device ID:', error);
    return null;
  }
};
const getAppVersion = async () => {
  try {
    const appVersion = await DeviceInfo.getVersion();
    return appVersion;
  } catch (error) {
    console.error('Error fetching device ID:', error);
    return null;
  }
};

const App = () => {
  const [idDevice, setIdDevice] = useState('');
  const [isAppVersion, setIsAppVersion] = useState('');
  const [isCalendar, setIsCalendar] = useState(false);
  useEffect(() => {
    // Panggil fungsi getIdDevice untuk mendapatkan ID perangkat
    getIdDevice().then(device => {
      if (device !== null) {
        setIdDevice(device);
      }
    });
    getAppVersion().then(appVersion => {
      if (appVersion !== null) {
        setIsAppVersion(appVersion);
      }
    });
  }, []);
  const onPressCalendar = () => {
    if (isCalendar === false) {
      setIsCalendar(true);
    } else {
      setIsCalendar(false);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello</Text>
      {idDevice && <Text>Device ID: {idDevice}</Text>}
      {isAppVersion && <Text>App Version: {isAppVersion}</Text>}
      <Dropdown />
      <TouchableOpacity
        onPress={onPressCalendar}
        style={{width: 100, height: 50, backgroundColor: 'green'}}>
        <Text>Kalender</Text>
      </TouchableOpacity>
      <Text>{isCalendar}</Text>
      {isCalendar ? <Kalender /> : ''}
    </View>
  );
};

export default App;
