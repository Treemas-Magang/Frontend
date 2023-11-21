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
import {
  setForm,
  setFormLoginFingerPrint,
  setJumlahApproval,
  setJumlahPengumuman,
} from '../../redux';
import {checkBiometryType} from '../../utils/checkBiometricType';
import ReactNativeBiometrics from 'react-native-biometrics';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {LoginFingerprint} from '../../config/prosesLogin';
import {
  countDataWithFalseStatus,
  getToken,
} from '../../utils/buatStatusPengumumanFalse';
import ButtonLoading from '../../components/atoms/ButtonLoading';
import {checkMockLocation} from '../../utils/checkMockLocation';
const ScreenLogin = ({navigation}) => {
  const [appVersion, setAppVersion] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {formLogin} = useSelector(state => state.LoginReducer);
  const {formLoginFP} = useSelector(state => state.LoginFingerPrintReducer);
  // const {location} = useSelector(state => state.SplashReducer);
  const {biometricType} = useSelector(state => state.CheckBiometricTypeReducer);
  const dispatch = useDispatch();
  // const routeAPI = 'https://treemas-api-403500.et.r.appspot.com';
  const routeAPI = 'http://192.168.10.31:8081';
  useEffect(() => {
    checkBiometryType(dispatch);
    getDataFromSession('deviceId')
      .then(idDevice => {
        if (idDevice !== null) {
          setDeviceId(idDevice);
          dispatch(setForm('handsetImei', idDevice));
          dispatch(setFormLoginFingerPrint('handsetImei', idDevice));
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
  useEffect(() => {
    dispatch(setForm('isWebAccess', '0'));
    dispatch(setFormLoginFingerPrint('isWebAccess', '0'));
  }, [dispatch]);
  const sendData = async () => {
    setIsLoading(true);
    console.log(formLogin);
    try {
      const response = await axios.post(
        `${routeAPI}/api/auth/login`,
        formLogin,
      );
      const dataLogin = response.data.data;
      console.log(dataLogin);

      if (response.status === 200) {
        console.log(response.data.data);
        // const [{ token }]\ = dataLogin;
        const token = dataLogin.token;
        const role = dataLogin.user.role;
        const nama = dataLogin.user.full_name;

        console.log('ini token :', token);
        // Lakukan sesuatu dengan token, seperti menyimpannya di AsyncStorage.

        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('nama', nama);
        await AsyncStorage.setItem('nik', formLogin.nik);
        await AsyncStorage.setItem('password', formLogin.password);
        await AsyncStorage.setItem('role', role);
        setIsLoading(false);
        // render notif //
        getToken().then(() => {
          countDataWithFalseStatus().then(jumlahDataDenganStatusFalse => {
            console.log(
              'Jumlah ID dengan status false:',
              jumlahDataDenganStatusFalse,
            );
            // setJmlBlmBaca(+jumlahDataDenganStatusFalse)
            dispatch(
              setJumlahPengumuman('pengumuman', +jumlahDataDenganStatusFalse),
            );
            ////////////////////////////////////////////
            // ini untuk jumlah Approval
            dispatch(setJumlahApproval('approval', 10));
          });
        });
        /////////////////
        navigation.replace('dashboard');
      } else {
        console.log('message : ', response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('gagal login'); //masih proses
      setIsLoading(false);
    }
  };

  const moveToLupaPassword = () => {
    navigation.navigate('lupaPassword');
  };
  const rnBiometrics = new ReactNativeBiometrics();
  const handleFingerprint = async () => {
    setIsLoading(true);
    // checkMockLocation();
    try {
      const result = await rnBiometrics.simplePrompt({
        promptMessage: 'Gunakan sidik jari untuk login',
        cancelButtonText: 'Batal',
      });

      if (result.success) {
        // Pemindaian berhasil
        console.log('Otentikasi berhasil');
        try {
          const response = await axios.post(
            `${routeAPI}/api/auth/login`,
            formLoginFP,
          );
          const dataLogin = response.data.data;
          if (response.status === 200) {
            // const [{ token }] = dataLogin;
            const token = dataLogin.token;
            const role = dataLogin.user.role;
            const nama = dataLogin.user.full_name;
            console.log('ini token fp : ', token);
            // Lakukan sesuatu dengan token, seperti menyimpannya di AsyncStorage.
            await AsyncStorage.setItem('nama', nama);
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('role', role);
            setIsLoading(false);

            // render notif //
            getToken().then(() => {
              countDataWithFalseStatus().then(jumlahDataDenganStatusFalse => {
                console.log(
                  'Jumlah ID dengan status false:',
                  jumlahDataDenganStatusFalse,
                );
                // setJmlBlmBaca(+jumlahDataDenganStatusFalse)
                dispatch(
                  setJumlahPengumuman(
                    'pengumuman',
                    +jumlahDataDenganStatusFalse,
                  ),
                );
                ////////////////////////////////////////////
                // ini untuk jumlah Approval
                dispatch(setJumlahApproval('approval', 10));
              });
            });

            /////////////////
            navigation.replace('dashboard');
          } else {
            console.log('message : ', response.data.message);
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Terjadi kesalahan:', error);
          setIsLoading(false);
        }

        ///////////////////////////////////////
        // await AsyncStorage.setItem('role', 'USER');
        // await AsyncStorage.setItem('nik', '1298191281222');
        // const is_pass_chg = '1';
        // if (is_pass_chg === '0') {
        //   navigation.replace('updatePassword', {
        //     nik: '1298191281222',
        //   });
        // } else {
        //   navigation.replace('dashboard');
        // }
      } else if (result.error) {
        // Pemindaian gagal
        setIsLoading(false);
        console.log('Otentikasi gagal');
      }
    } catch (error) {
      setIsLoading(false);
      navigation.navigate('gagalSidikJari');
    }
  };

  return (
    <View style={{flex: 1}}>
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
        <View
          style={{
            position: 'relative',
            gap: 15,
            height: hp('50%'),
          }}>
          <CustomTextInput
            label="NIK"
            value={formLogin.nik}
            onTextChange={value => onChangeText(value, 'nik')}
            secureTextEntry={false}
            keyboardType={'numeric'}
            textColor={Color.blue}
            maxLength={10}
          />
          <CustomTextInput
            label="Password"
            type="password"
            value={formLogin.password}
            onTextChange={value => onChangeText(value, 'password')}
            textColor={Color.blue}
            maxLength={10}
          />
          {/* <CustomTextInput
            label="NIK"
            value={formLogin.nik}
            onTextChange={value => onChangeText(value, 'nik')}
            secureTextEntry={false}
            keyboardType={'numeric'}
            maxLength={10}
            textColor={Color.red}
            style={styles.nikSalah}
          />
          <CustomTextInput
            label="Password"
            type="password"
            value={formLogin.password}
            onTextChange={value => onChangeText(value, 'password')}
            maxLength={10}
            textColor={Color.red}
            style={styles.passSalah}
          />
          <Text style={styles.labelSalah}>NIK dan Password Salah!</Text> */}
          <View style={{flexDirection: 'row', gap: 20}}>
            {isLoading ? (
              <ButtonLoading />
            ) : (
              <ButtonAction onPress={() => sendData()} title="login" />
            )}

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
        <View
          style={{
            height: hp('25%'),
            width: wp('100%'),
            position: 'relative',
          }}>
          <Text style={styles.textInfo}>Mobile Absensi Karyawan</Text>
          <Text style={styles.textInfo}>Version : {appVersion}</Text>
          <Text style={styles.textInfo}>&copy;2023 PT TREEMAS</Text>
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
        </View>
      </ScrollView>
    </View>
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
  nikSalah: {
    width: 275,
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: Color.red,
    borderBottomWidth: 1,
    paddingBottom: -10,
  },
  passSalah: {
    width: 275,
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: Color.red,
    borderBottomWidth: 1,
    paddingBottom: -10,
  },
  labelSalah: {
    fontFamily: text.semiBold,
    fontSize: 14,
    color: Color.red,
    textAlign: 'center',
  },
});

export default ScreenLogin;
