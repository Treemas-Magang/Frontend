/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Button, Alert} from 'react-native';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

const ScreenCobaDownloadApk = () => {
  const [apkUrl, setApkUrl] = useState(''); // State untuk menyimpan URL APK

  const handleDownload = async () => {
    if (!apkUrl) {
      Alert.alert('Error', 'URL APK is not available.');
      return;
    }

    try {
      const {config, fs} = RNFetchBlob;
      const path = `${RNFS.DocumentDirectoryPath}/YourApp.apk`;

      const res = await config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path,
          description: 'Downloading APK',
        },
      }).fetch('GET', apkUrl);

      console.log('Download complete:', res.path());
      Alert.alert('Download complete!', `APK file saved to: ${res.path()}`);
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Failed to download APK file.');
    }
  };

  // Fungsi untuk mendapatkan URL APK dari API (asumsi menggunakan fetch)
  const fetchApkUrlFromApi = async () => {
    try {
      const response = await fetch('API_ENDPOINT'); // Ganti dengan endpoint API yang benar
      const data = await response.json();
      setApkUrl(data.apkUrl); // Asumsi bahwa respons API berisi properti 'apkUrl'
    } catch (error) {
      console.error('Error fetching APK URL:', error);
    }
  };

  return (
    <View>
      <Button title="Fetch APK URL" onPress={fetchApkUrlFromApi} />
      <Button title="Download APK" onPress={handleDownload} />
    </View>
  );
};

export default ScreenCobaDownloadApk;
