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
import {setForm, setFormLoginFingerPrint} from '../../redux';
import {checkBiometryType} from '../../utils/checkBiometricType';
import ReactNativeBiometrics from 'react-native-biometrics';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import { LoginFingerprint } from '../../config/prosesLogin';
const ScreenLogin = ({navigation}) => {
  const [appVersion, setAppVersion] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const {form} = useSelector(state => state.LoginReducer);
  const {formLogin} = useSelector(state => state.LoginFingerPrintReducer);
  // const {location} = useSelector(state => state.SplashReducer);
  const {biometricType} = useSelector(state => state.CheckBiometricTypeReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    checkBiometryType(dispatch);
    getDataFromSession('deviceId')
      .then(idDevice => {
        if (idDevice !== null) {
          setDeviceId(idDevice);
          dispatch(setForm('deviceId', idDevice));
          dispatch(setFormLoginFingerPrint('deviceId', idDevice));
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
    getDataFromSession('nik')
      .then(nik => {
        if (nik !== null) {
          dispatch(setFormLoginFingerPrint('nik', nik));
        } else {
          console.log('nik tidak ditemukan di session.');
        }
      })
      .catch(error => {
        console.error('Terjadi kesalahan dalam getDataFromSession:', error);
      });
    getDataFromSession('password')
      .then(password => {
        if (password !== null) {
          dispatch(setFormLoginFingerPrint('password', password));
        } else {
          console.log('pasword tidak ditemukan di session.');
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
      const response = await axios.post(
        'http://192.168.10.190:8081/api/auth/login',
        form,
      );
      const dataLogin = response.data.data;
      if (dataLogin.token !== null) {
        // const [{ token }] = dataLogin;
        const token = dataLogin.token;
        // Lakukan sesuatu dengan token, seperti menyimpannya di AsyncStorage.
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('nik', form.nik);
        await AsyncStorage.setItem('password', form.password);
        navigation.replace('dashboard');
      } else {
        console.log('message : ', response.data.message);
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
        ///////////////////////////////////////
        // LoginFingerprint({navigation});
        // try {
        //   const response = await axios.post('http://192.168.10.190:8081/api/auth/login', formLogin);
        //   const dataLogin = response.data.data;
        //   if (response.status === 200) {
        //     // const [{ token }] = dataLogin;
        //     const token = dataLogin.token;
        //     // Lakukan sesuatu dengan token, seperti menyimpannya di AsyncStorage.
        //     await AsyncStorage.setItem('token', token);
        //     navigation.replace('dashboard');
        //   } else {
        //     console.log('message : ',response.data.message);
        //   }
        // } catch (error) {
        //   console.error('Terjadi kesalahan:', error);
        // }

        ///////////////////////////////////////
        navigation.replace('dashboard');
      } else if (result.error) {
        // Pemindaian gagal
        console.log('Otentikasi gagal');
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
        <View style={{height: hp('30%'), justifyContent: 'center'}}>
          <Image
            style={{width: wp('80%')}}
            source={require('../../assets/icons/logo.png')}
            resizeMode="contain"
          />
        </View>
        <View style={{position: 'relative', gap: 15, height: hp('50%')}}>
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
                fontFamily: text.semiBold,
                color: Color.black,
              }}
              onPress={() => moveToLupaPassword()}>
              Lupa Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{height: hp('10%')}}>
          <Text style={styles.textInfo}>Mobile Absensi Karyawan</Text>
          <Text style={styles.textInfo}>Version : {appVersion}</Text>
          <Text style={styles.textInfo}>&copy;2023 PT TREEMAS</Text>
        </View>
        <Image
          style={styles.vectorKiri}
          source={require('../../assets/vector/VectorKiri.png')}
          resizeMode="contain"
        />
        <Image
          style={styles.vectorKanan}
          source={require('../../assets/vector/VectorKanan.png')}
          resizeMode="contain"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: hp('98%'),
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: Color.white,
  },
  textInfo: {
    textAlign: 'center',
    color: Color.black,
  },
  vectorKiri: {
    position: 'absolute',
    width: wp('25%'),
    bottom: -70,
    left: 0,
    zIndex: -1,
  },
  vectorKanan: {
    position: 'absolute',
    width: wp('35%'),
    bottom: -20,
    right: 0,
    zIndex: -1,
  },
});

export default ScreenLogin;
