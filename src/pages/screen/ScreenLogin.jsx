/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import {getDataFromSession} from '../../utils/getDataSession';
import ButtonAction from '../../components/atoms/ButtonAction';
import {Color} from '../../utils/color';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFingerprint} from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch} from 'react-redux';
import {setForm} from '../../redux';
import {checkBiometryType} from '../../utils/checkBiometricType';
import ReactNativeBiometrics from 'react-native-biometrics';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ScreenLogin = ({navigation}) => {
  const [appVersion, setAppVersion] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [scanCount, setScanCount] = useState(0);
  const maxScanCount = 3;
  const {form} = useSelector(state => state.LoginReducer);
  const {location} = useSelector(state => state.SplashReducer);
  const {biometricType} = useSelector(state => state.CheckBiometricTypeReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    checkBiometryType(dispatch);
    getDataFromSession('deviceId')
    .then(idDevice => {
        if (idDevice !== null) {
          setDeviceId(idDevice);
          dispatch(setForm('deviceId', idDevice));
          // dispatch(setForm('deviceId', idDevice));
        } else {
          console.log('Data tidak ditemukan di session.');
        }
      })
      .catch(error => {
        console.error('Terjadi kesalahan dalam getDataFromSession:', error);
      });

    getDataFromSession('appVersion')
      .then(apkVersion => {
        if (apkVersion !== null) {
          setAppVersion(apkVersion);
        } else {
          console.log('Data tidak ditemukan di session.');
        }
      })
      .catch(error => {
        console.error('Terjadi kesalahan dalam getDataFromSession:', error);
      });
  }, [biometricType, dispatch]);
  const onChangeText = (value, inputType) => {
    dispatch(setForm(inputType, value));
  };
  const sendData = async () => {
  try {
    const response = await axios.post('http://192.168.10.31:8081/api/login', form);
    const dataLogin = response.data.data;

    if (Array.isArray(dataLogin) && dataLogin.length > 0) {
      const [{ token }] = dataLogin;
      console.log(token);
      console.log(response.data.message);
      // Lakukan sesuatu dengan token, seperti menyimpannya di AsyncStorage.
      await AsyncStorage.setItem('token', token);
      navigation.replace('dashboard');
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
};

  const moveToLupaPassword = () => {
    navigation.navigate('lupaPassword');
  };
  const rnBiometrics = new ReactNativeBiometrics();
  const handleFingerprint = async () => {
    try {
      const result = await rnBiometrics.simplePrompt({
        promptMessage: 'Gunakan sidik jari untuk login',
        cancelButtonText: 'Batal',
      });

      if (result.success) {
        // Pemindaian berhasil
        console.log('Otentikasi berhasil');
        setScanCount(0);

        navigation.replace('dashboard');
      } else if (result.error) {
        // Pemindaian gagal
        console.log('Otentikasi gagal');

        // Update jumlah pemindaian yang gagal
        setScanCount(scanCount + 1);
        // Cek apakah sudah mencapai batas jumlah pemindaian yang gagal
        if (scanCount >= maxScanCount) {
          console.log(
            'Anda telah mencapai batas jumlah pemindaian yang gagal.',
          );
          // Lakukan tindakan jika jumlah pemindaian yang gagal mencapai batas
        }
      }
    } catch (error) {
      navigation.navigate('gagalSidikJari');
    }
  };
  
  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'blue'}}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
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
              <TouchableOpacity onPress={() => handleFingerprint()}>
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
                onPress={() => moveToLupaPassword()}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    bottom: -50,
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
