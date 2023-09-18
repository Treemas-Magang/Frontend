import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import CustomTextInput from '../components/atoms/CustomTextInput';
import {getDataFromSession} from '../utils/getDataSession';
const LoginScreen = () => {
  const [appVersion, setAppVersion] = useState('');

  getDataFromSession('appVersion')
    .then(apkVersion => {
      if (apkVersion !== null) {
        console.log('Data dari sesi:', apkVersion);
        setAppVersion(apkVersion);
      } else {
        console.log('Data tidak ditemukan di sesi.');
      }
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
    });

  return (
    <View style={[styles.container]}>
      <View>
        <Image source={require('../assets/icons/logo.png')} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{position: 'relative', marginTop: -100, gap: 15}}>
          <CustomTextInput label="NIK" />
          <CustomTextInput label="Password" type="password" />
        </View>
      </View>
      <View style={{marginBottom: 20}}>
        <Text style={styles.textInfo}>Mobile Absensi Karyawan</Text>
        <Text style={[styles.textInfo]}>Version : {appVersion}</Text>
        <Text style={[styles.textInfo]}>&copy;2023 PT TREEMAS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 70,
  },
  textInfo: {
    textAlign: 'center',
  },
});

export default LoginScreen;
