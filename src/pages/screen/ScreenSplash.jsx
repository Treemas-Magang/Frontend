/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Color} from '../../utils/color';
import requestLocationPermission from '../../utils/permissionService';
import getAppVersion from '../../utils/getAppVersion';
import getIdDevice from '../../utils/getIdDevice';
const ScreenSplash = ({navigation}) => {
  useEffect(() => {
        const fetchData = async () => {
          try {
            // Dapatkan ID perangkat
            const deviceId = await getIdDevice();
            
        // Dapatkan versi aplikasi
        const appVersion = await getAppVersion();

        // Mintakan izin lokasi
        await requestLocationPermission();

        // Navigasi ke layar login setelah berhasil mendapatkan semua informasi
        if (deviceId && appVersion) {
          navigation.reset({
            index: 0,
            routes: [{name: 'login'}],
          });
        }
      } catch (error) {
        // Tangani kesalahan jika diperlukan
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Color.white,
      }}>
      <View style={[styles.container]}>
        <Image source={require('../../assets/icons/logo.png')} />
      </View>
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color={Color.green} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ScreenSplash;


// const fetchData = async () => {
//   // ...

//   // Meminta izin lokasi dan mendapatkan lokasi

//   // ...

//   // Cek apakah data isAppVersion telah disimpan di AsyncStorage
//   await AsyncStorage.getItem('appVersion')
//     .then(savedAppVersion => {
//       console.log('versi app : ', savedAppVersion);
//       const shouldNavigate = savedAppVersion;
//       if (shouldNavigate) {
//         // Jika data tersedia di AsyncStorage, lanjutkan ke halaman login
//         navigation.reset({
//           index: 0,
//           routes: [{name: 'login'}],
//         });
//       }
//     })
//     .catch(error => {
//       console.error('Gagal mengambil data versi aplikasi', error);
//     });
// };

// fetchData();