/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, ScrollView} from 'react-native';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import {getDataFromSession} from '../../utils/getDataSession';
import ButtonAction from '../../components/atoms/ButtonAction';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {useDispatch, useSelector} from 'react-redux';
import {setFormUpdatePassword} from '../../redux';
import {useRoute} from '@react-navigation/native';
import ButtonLoading from '../../components/atoms/ButtonLoading';
import {AlertNotificationSuccess} from '../../components/atoms/AlertNotification';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {API_GABUNGAN} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ScreenUpdatePassword = ({navigation}) => {
  const [appVersion, setAppVersion] = useState('');

  const route = useRoute();
  // const {nik} = route.params;
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.UpdatePasswordReducer);
  const [inputKosong, setInputKosong] = useState(false);
  const [tdkCocok, setTdkCocok] = useState(false);
  const [passwordKurangPanjang, setPasswordKurangPanjang] = useState(false);
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const hapusDataNikPasswordDiStorage = async () => {
      try {
        await AsyncStorage.removeItem('nik');
        await AsyncStorage.removeItem('password');
        console.log('berhasil hapus nik dan password');
      } catch (error) {
        console.log('gagal hapus storage nik, password', error);
      }
    };
    hapusDataNikPasswordDiStorage();
  }, []);

  const uploadData = async data => {
    setBtnLoading(true);
    const token = await getDataFromSession('token');

    if (token !== null) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await axios.put(
          API_GABUNGAN + '/api/auth/change-password',
          data,
          {headers},
        );
        console.log(response);
        console.log('berhasil update password');
        setIsSuccess(true);
        setBtnLoading(false);
        try {
          await AsyncStorage.removeItem('token');
        } catch (error) {
          console.log('gagal hapus storage token', error);
        }
      } catch (error) {
        console.log(error.response);
        const errorCode = error.response ? error.response.code : null;
        switch (errorCode) {
          case 403:
            console.log('project tidak tepat');
            setBtnLoading(false);
            break;
          case 404:
            setBtnLoading(false);
            break;
          case 500:
            setBtnLoading(false);
            console.log('Kesalahan server');
            break;
          default:
            setBtnLoading(false);
            console.log('gagal absen');
            break;
        }
      }
    }
  };
  const sendData = async () => {
    if (form.newPassword === '' || form.confPassword === '') {
      console.log('Harap isi semua form !!');
      setTdkCocok(false);
      setInputKosong(true);
      setPasswordKurangPanjang(false);
    } else if (form.newPassword !== form.confPassword) {
      console.log('Konfirmasi password tidak cocok !!!');
      setTdkCocok(true);
      setInputKosong(false);
      setPasswordKurangPanjang(false);
    } else if (form.newPassword.length < 6 && form.confPassword.length < 6) {
      console.log('minimal password 6 karakter');
      setTdkCocok(false);
      setInputKosong(false);
      setPasswordKurangPanjang(true);
    } else {
      setTdkCocok(false);
      setInputKosong(false);
      setPasswordKurangPanjang(false);
      console.log('data yang dikirim : ', form);
      await uploadData(form);
      setBtnLoading(true);
      // setIsSuccess(true);
      // navigation.replace('login');
    }
  };
  console.log('sukses : ', isSuccess);

  const onChangeText = (value, inputType) => {
    dispatch(setFormUpdatePassword(inputType, value));
  };
  const toLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'login'}],
    });
  };

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
    <View style={{flex: 1}}>
      {isSuccess ? (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AlertNotificationSuccess
            buttonAlert="Ok"
            textBodyAlert="Update Berhasil"
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
            label="New Password"
            type="password"
            value={form.newPassword}
            onTextChange={value => onChangeText(value, 'newPassword')}
            textColor={
              inputKosong || tdkCocok || passwordKurangPanjang
                ? Color.red
                : Color.blue
            }
            style={
              inputKosong || tdkCocok || passwordKurangPanjang
                ? styles.passSalah
                : styles.passBenar
            }
            maxLength={10}
          />
          <CustomTextInput
            label="Konfirmasi Password"
            type="password"
            value={form.confPassword}
            onTextChange={value => onChangeText(value, 'confPassword')}
            textColor={
              inputKosong || tdkCocok || passwordKurangPanjang
                ? Color.red
                : Color.blue
            }
            style={
              inputKosong || tdkCocok || passwordKurangPanjang
                ? styles.passSalah
                : styles.passBenar
            }
            maxLength={10}
          />

          {inputKosong ? (
            <Text style={styles.labelSalah}>Field Tidak Boleh Kosong!</Text>
          ) : (
            ''
          )}
          {tdkCocok ? (
            <Text style={styles.labelSalah}>Kata sandi tidak cocok!</Text>
          ) : (
            ''
          )}
          {passwordKurangPanjang ? (
            <Text style={styles.labelSalah}>password minimal 6 karakter</Text>
          ) : (
            ''
          )}
          <View style={{alignItems: 'center'}}>
            {isBtnLoading ? (
              <ButtonLoading />
            ) : (
              <ButtonAction onPress={() => sendData()} title="Update" />
            )}
          </View>
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
  passSalah: {
    width: 275,
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: Color.red,
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

export default ScreenUpdatePassword;
