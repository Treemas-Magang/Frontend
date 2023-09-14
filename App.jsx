/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';

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

const App = () => {
  const [idDevice, setIdDevice] = useState('');

  useEffect(() => {
    // Panggil fungsi getIdDevice untuk mendapatkan ID perangkat
    getIdDevice()
      .then((device) => {
        if (device !== null) {
          setIdDevice(device);
        }
      });
  }, []);

  return (
    <View>
      <Text>Hello</Text>
      {idDevice && <Text>Device ID: {idDevice}</Text>}
    </View>
  );
};

export default App;

