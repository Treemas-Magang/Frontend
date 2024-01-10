/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import {getDataFromSession} from '../../utils/getDataSession';
import ButtonAction from '../../components/atoms/ButtonAction';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {setFormLupaPassword} from '../../redux';
import axios from 'axios';
import {API_GABUNGAN} from '@env';
import {AlertNotificationSuccess} from '../../components/atoms/AlertNotification';
import ButtonLoading from '../../components/atoms/ButtonLoading';
const ScreenLupaPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const {form_lupa_password} = useSelector(
    state => state.FormLupaPasswordReducer,
  );
  const [appVersion, setAppVersion] = useState('');
  const [form, setForm] = useState({
    email: '',
    konfirmasiEmail: '',
  });
  const [emailTidakTerdaftar, setEmailTidakTerdaftar] = useState(false);
  const [inputTidakSama, setInputTidakSama] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [inputKosng, setInputKosong] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [tdkCocok, setTdkCocok] = useState(false);

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
    dispatch(setFormLupaPassword(index, value));
  };
  // const sendData = async () => {
  //   setBtnLoading(true);
  //   if (form.email === '' || form.konfirmasiEmail === '') {
  //     console.log('form tidak boleh kosong');
  //     console.log('email : ', form.email);
  //     console.log('konf email : ', form.konfirmasiEmail);
  //     setInputKosong(true);
  //     setTdkCocok(false);
  //     setInputTidakSama(false);
  //     setEmailTidakTerdaftar(false);
  //   } else if (form.email !== form.konfirmasiEmail) {
  //     console.log('konfirmasi email tidak sama dengan email');
  //     setInputTidakSama(true);
  //     setTdkCocok(false);
  //     setEmailTidakTerdaftar(false);
  //     console.log('email : ', form.email);
  //     console.log('konf email : ', form.konfirmasiEmail);
  //   } else {
  //     dispatch(setFormLupaPassword('email', form_lupa_password.email));
  //     if (form_lupa_password.email !== '') {
  //       try {
  //         const response = await axios.put(
  //           `${API_GABUNGAN}/api/auth/forgot-password`,
  //           {email: form_lupa_password.email},
  //         );
  //         console.log(response);
  //         console.log('kirim data : ', form_lupa_password.email);
  //         setIsSuccess(true); //untuk sukses upload
  //         setBtnLoading(false);
  //       } catch (error) {
  //         console.log(error.response);
  //         const codeError = error.response.status;
  //         switch (codeError) {
  //           case 404:
  //             console.log('email tidak terdaftar!!');
  //             setInputKosong(false);
  //             setInputTidakSama(false);
  //             setEmailTidakTerdaftar(true);
  //             setBtnLoading(false);
  //             break;
  //           case 500:
  //             setIsServerError(true);
  //             setBtnLoading(false);
  //             console.log('server error !');
  //             break;
  //           default:
  //             setBtnLoading(false);
  //             console.log('gagal kirim data keserver');
  //             break;
  //         }
  //       }
  //     } else {
  //       console.log('email masih kosong');
  //     }
  //   }
  // };

  const sendData = async () => {
    try {
      setBtnLoading(true);

      if (form.email === '' || form.konfirmasiEmail === '') {
        console.log('form tidak boleh kosong');
        console.log('email : ', form.email);
        console.log('konf email : ', form.konfirmasiEmail);
        setInputKosong(true);
        setTdkCocok(false);
        setInputTidakSama(false);
        setEmailTidakTerdaftar(false);
      } else if (form.email !== form.konfirmasiEmail) {
        console.log('konfirmasi email tidak sama dengan email');
        setInputTidakSama(true);
        setTdkCocok(false);
        setEmailTidakTerdaftar(false);
        console.log('email : ', form.email);
        console.log('konf email : ', form.konfirmasiEmail);
      } else {
        dispatch(setFormLupaPassword('email', form_lupa_password.email));

        if (form_lupa_password.email !== '') {
          const response = await axios.put(
            `${API_GABUNGAN}/api/auth/forgot-password`,
            {email: form_lupa_password.email},
          );

          console.log(response);
          console.log('kirim data : ', form_lupa_password.email);

          setIsSuccess(true); // Set to true on successful response
        }
      }
    } catch (error) {
      console.log(error.response);
      const codeError = error.response.status;

      switch (codeError) {
        case 404:
          console.log('email tidak terdaftar!!');
          setInputKosong(false);
          setInputTidakSama(false);
          setEmailTidakTerdaftar(true);
          break;
        case 500:
          setIsServerError(true);
          console.log('server error !');
          break;
        default:
          console.log('gagal kirim data ke server');
          break;
      }
    } finally {
      setBtnLoading(false);
    }
  };

  const moveToLogin = () => {
    navigation.navigate('login');
  };

  const toLogin = () => {
    // navigation.replace('dashboard');
    navigation.reset({
      index: 0,
      routes: [{name: 'login'}],
    });
  };

  return (
    <View style={{flex: 1}}>
      {isSuccess ? (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AlertNotificationSuccess
            buttonAlert="Close"
            textBodyAlert="Email Berhasil Terkirim"
            titleAlert="Success"
            onPress={toLogin}
          />
        </View>
      ) : (
        ''
      )}
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
            label="Email"
            secureTextEntry={false}
            value={form.email}
            textColor={
              inputKosng || tdkCocok || emailTidakTerdaftar || inputTidakSama
                ? Color.red
                : Color.blue
            }
            style={
              inputKosng || tdkCocok || emailTidakTerdaftar || inputTidakSama
                ? styles.passSalah
                : styles.passBenar
            }
            onTextChange={value => onChangeText(value, 'email')}
          />
          <CustomTextInput
            label="Konfirmasi Email"
            secureTextEntry={false}
            value={form.konfirmasiEmail}
            textColor={
              inputKosng || tdkCocok || emailTidakTerdaftar || inputTidakSama
                ? Color.red
                : Color.blue
            }
            style={
              inputKosng || tdkCocok || emailTidakTerdaftar || inputTidakSama
                ? styles.passSalah
                : styles.passBenar
            }
            onTextChange={value => onChangeText(value, 'konfirmasiEmail')}
          />
          {emailTidakTerdaftar ? (
            <Text style={styles.labelSalah}>EMAIL TIDAK TERDAFTAR</Text>
          ) : (
            ''
          )}
          {inputTidakSama ? (
            <Text style={styles.labelSalah}>EMAIL TIDAK SAMA</Text>
          ) : (
            ''
          )}
          {inputKosng ? (
            <Text style={styles.labelSalah}>FORM TIDAK BOLEH KOSONG</Text>
          ) : (
            ''
          )}

          <View style={{alignItems: 'center'}}>
            {isBtnLoading ? (
              <ButtonLoading />
            ) : (
              <ButtonAction onPress={() => sendData()} title="kirim" />
            )}
          </View>
          <TouchableOpacity style={{alignItems: 'center', marginTop: 21}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: text.semiBold,
                color: Color.black,
              }}
              onPress={() => moveToLogin()}>
              Kembali
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
  nikBenar: {
    width: 275,
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: Color.green,
    borderBottomWidth: 1,
    paddingBottom: -10,
  },
  passBenar: {
    width: 275,
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: Color.green,
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

export default ScreenLupaPassword;
