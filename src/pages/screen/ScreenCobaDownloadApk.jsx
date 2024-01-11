/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Button, Alert} from 'react-native';
import axios from 'axios';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import {API_GABUNGAN} from '@env';

const ScreenCobaDownloadApk = () => {
  const [apkUrl, setApkUrl] = useState('');
  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `${API_GABUNGAN}/api/download/get-latest-version`,
      );
      console.log(response);
    } catch (error) {
       console.log('Tidak dapat mengambil data ', error.response);
    }
  }

  return (
    <View>
      <Button title="Download APK" onPress={handleDownload} />
    </View>
  );
};

export default ScreenCobaDownloadApk;
