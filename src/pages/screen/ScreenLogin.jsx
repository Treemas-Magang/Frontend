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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFingerprint} from '@fortawesome/free-solid-svg-icons';
const ScreenLogin = ({navigation}) => {
  const [appVersion, setAppVersion] = useState('');
  const [form, setForm] = useState({
    nik: '',
    password: '',
  });

  getDataFromSession('appVersion')
    .then(apkVersion => {
      if (apkVersion !== null) {
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
  const moveToLupaPaaword = () => {
    navigation.navigate('lupaPassword');
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
            label="NIK"
            value={form.nik}
            onTextChange={value => onChangeText(value, 'nik')}
            secureTextEntry={false}
            keyboardType={'numeric'}
            maxLength={10}
          />
          <CustomTextInput
            label="Password"
            type="password"
            value={form.password}
            onTextChange={value => onChangeText(value, 'password')}
            maxLength={10}
          />
          <View style={{flexDirection: 'row', gap: 20}}>
            <ButtonAction onPress={() => sendData()} title="login" />
            <TouchableOpacity>
              {/* <Image source={require('../assets/vector/fingerprint.png')} /> */}
              <FontAwesomeIcon
                icon={faFingerprint}
                color={Color.green}
                size={50}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{alignItems: 'center', marginTop: 21}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins-SemiBold',
                color: Color.black,
              }}
              onPress={() => moveToLupaPaaword()}>
              Lupa Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 150}}>
          <Text style={styles.textInfo}>Mobile Absensi Karyawan</Text>
          <Text style={styles.textInfo}>Version : {appVersion}</Text>
          <Text style={styles.textInfo}>&copy;2023 PT TREEMAS</Text>
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
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: Color.white,
  },
  textInfo: {
    textAlign: 'center',
    color: Color.black,
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

export default ScreenLogin;
