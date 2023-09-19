import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import getIdDevice from '../utils/getIdDevice';
import getAppVersion from '../utils/getAppVersion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Color} from '../utils/color';
import {err} from 'react-native-svg/lib/typescript/xml';

const LoadingScreen = ({navigation}) => {
  const [isIdDevice, setIsIdDevice] = useState('');
  const [isAppVersion, setIsAppVersion] = useState('');

  useEffect(() => {
    // Panggil fungsi getIdDevice untuk mendapatkan ID perangkat
    getIdDevice().then(device => {
      if (device !== null) {
        setIsIdDevice(device);

        AsyncStorage.setItem('IdDevice', device)
          .then(() => {
            console.log('data id device berhasil disimpan di session', device);
          })
          .catch(error => {
            console.log('gagal menyimpan id device di session', error);
          });
      }
    });

    getAppVersion().then(appVersion => {
      if (appVersion !== null) {
        setIsAppVersion(appVersion);

        // Simpan isAppVersion ke AsyncStorage di sini
        AsyncStorage.setItem('appVersion', appVersion)
          .then(() => {
            console.log(
              'Data isAppVersion berhasil disimpan di session',
              appVersion,
            );
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
    navigation.navigate('login');
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Color.background,
      }}>
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
