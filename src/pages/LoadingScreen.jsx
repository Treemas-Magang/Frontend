import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import getIdDevice from '../utils/getIdDevice';
import getAppVersion from '../utils/getAppVersion';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = ({navigation}) => {
  const [isIdDevice, setIsIdDevice] = useState('');
  const [isAppVersion, setIsAppVersion] = useState('');

  useEffect(() => {
    // Panggil fungsi getIdDevice untuk mendapatkan ID perangkat
    getIdDevice().then(device => {
      if (device !== null) {
        setIsIdDevice(device);
      }
    });

    getAppVersion().then(appVersion => {
      if (appVersion !== null) {
        setIsAppVersion(appVersion);

        // Simpan isAppVersion ke AsyncStorage di sini
        AsyncStorage.setItem('appVersion', appVersion)
          .then(() => {
            console.log('Data isAppVersion berhasil disimpan di sesi.');
          })
          .catch(error => {
            console.error('Gagal menyimpan data isAppVersion di sesi:', error);
          });
      }
    });
  }, []);

  useEffect(() => {
    // Cek apakah data isAppVersion telah disimpan di AsyncStorage
    AsyncStorage.getItem('appVersion')
      .then(savedAppVersion => {
        if (savedAppVersion !== null) {
          // Jika data tersedia di AsyncStorage, lanjutkan ke halaman login
          setTimeout(() => {
            // Gunakan reset untuk mengganti tumpukan navigasi
            navigation.reset({
              index: 0,
              routes: [{name: 'login'}], // Gantilah 'login' dengan nama halaman login Anda
            });
          }, 1000);
        } else {
          // Jika data tidak tersedia di AsyncStorage, tetap di halaman loading dan coba lagi
          setTimeout(() => {
            relogOtomatis();
          }, 1000);
        }
      })
      .catch(error => {
        console.error('Gagal mengambil data isAppVersion dari sesi:', error);
      });
  }, [navigation]);

  const relogOtomatis = () => {
    // Implementasi "relog otomatis" di sini
    // Misalnya, Anda bisa mengarahkan pengguna ke halaman login secara otomatis
    navigation.navigate('login'); // Gantilah 'login' dengan nama halaman login Anda
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={[styles.container]}>
        <Image source={require('../assets/icons/logo.png')} />
      </View>
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color="#35D0BA" />
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

export default LoadingScreen;
