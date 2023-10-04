import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import {getDataFromSession} from '../../utils/getDataSession';
import ButtonAction from '../../components/atoms/ButtonAction';
import {Color} from '../../utils/color';
const ScreenLupaPassword = ({navigation}) => {
  const [appVersion, setAppVersion] = useState('');
  const [form, setForm] = useState({
    email: '',
    konfirmasiEmail: '',
  });

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

  const onChangeText = (value, index) => {
    setForm({
      ...form,
      [index]: value,
      [index]: value,
    });
  };
  const sendData = () => {
    console.log('kirim data : ', form);
  };
  const moveToLogin = () => {
    navigation.navigate('login');
  };
  return (
    <KeyboardAvoidingView
      style={[styles.container]}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
      <View style={styles.wrapper}>
        <Image
          source={require('../../assets/icons/logo.png')}
          style={{marginBottom: 100}}
        />
        <View style={{position: 'relative', gap: 15}}>
          <CustomTextInput
            label="Email"
            value={form.email}
            onTextChange={value => onChangeText(value, 'email')}
          />
          <CustomTextInput
            label="Konfirmasi Email"
            secureTextEntry={true}
            value={form.konfirmasiEmail}
            onTextChange={value => onChangeText(value, 'konfirmasiEmail')}
          />
          <View style={{alignItems: 'center'}}>
            <ButtonAction onPress={() => sendData()} title="kirim" />
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginTop: 21,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins-SemiBold',
                color: Color.black,
              }}
              onPress={() => moveToLogin()}>
              Kembali
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 150}}>
          <Text style={styles.textInfo}>Mobile Absensi Karyawan</Text>
          <Text style={[styles.textInfo]}>Version : {appVersion}</Text>
          <Text style={[styles.textInfo]}>&copy;2023 PT TREEMAS</Text>
        </View>
      </View>
      <Image
        style={styles.vectorKiri}
        source={require('../../assets/vector/VectorKiri.png')}
      />
      <Image
        style={styles.vectorKanan}
        source={require('../../assets/vector/VectorKanan.png')}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  textInfo: {
    textAlign: 'center',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vectorKiri: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: -1,
  },
  vectorKanan: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
});

export default ScreenLupaPassword;
