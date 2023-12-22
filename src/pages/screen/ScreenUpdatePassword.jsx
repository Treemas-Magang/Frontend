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
const ScreenUpdatePassword = ({navigation}) => {
  const [appVersion, setAppVersion] = useState('');

  const route = useRoute();
  // const {nik} = route.params;
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.UpdatePasswordReducer);
  const [newPass, setNewPass] = useState('');
  const [konPass, setKonPass] = useState('');
  const [inputKosong, setInputKosong] = useState(false);
  const [tdkCocok, setTdkCocok] = useState(false);
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const sendData = () => {
    if (newPass === '' || konPass === '') {
      console.log('Harap isi semua form !!');
      setInputKosong(true);
      setTdkCocok(false);
    } else if (newPass !== konPass) {
      console.log('Konfirmasi password tidak cocok !!!');
      setInputKosong(false);
      setTdkCocok(true);
    } else {
      dispatch(setFormUpdatePassword('nik', route.params.nik));
      dispatch(setFormUpdatePassword('password_baru', newPass));
      dispatch(setFormUpdatePassword('is_chg_pas', '1'));
      // setBtnLoading(true);
      // setIsSuccess(true);
      // navigation.replace('login');
    }
  };

  // const sendData = () => {
  //   // setBtnLoading(true);
  //   // setIsSuccess(true);
  //   if (newPass === '' && konPass === '') {
  //     console.log('harap isi semua form !!');
  //     setInputKosong(false);
  //     setTdkCocok(false);
  //   } else if (konPass === '') {
  //     console.log('tolong isi konfirmasi password');
  //     setInputKosong(false);
  //   } else if (newPass === '') {
  //     console.log('tolong isi password baru');
  //     setInputKosong(false);
  //   } else if (newPass === konPass && newPass !== null && konPass !== null) {
  //     dispatch(setFormUpdatePassword('nik', nik));
  //     dispatch(setFormUpdatePassword('password_baru', newPass));
  //     dispatch(setFormUpdatePassword('is_chg_pas', '1'));
  //     navigation.replace('login');
  //   } else {
  //     console.log('konfirmasi password tidak cocok !!!');
  //     setTdkCocok(false);
  //     // setBtnLoading(false);
  //     // setIsSuccess(false)
  //   }
  //   setInputKosong(true);
  //   setTdkCocok(true);
  // };

  const toDashboard = () => {
    navigation.replace('dashboard');
  };

  console.log('password baru : ', form);

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
            textBodyAlert="Login Berhasil"
            titleAlert="Success"
            // onPress={toDashboard}
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
            label="Password"
            type="password"
            value={konPass}
            onTextChange={value => setNewPass(value)}
            textColor={inputKosong || tdkCocok ? Color.red : Color.blue}
            style={
              inputKosong || tdkCocok ? styles.passSalah : styles.passBenar
            }
            maxLength={10}
          />
          <CustomTextInput
            label="Konfirmasi Password"
            type="password"
            value={konPass}
            onTextChange={value => setKonPass(value)}
            textColor={inputKosong || tdkCocok ? Color.red : Color.blue}
            style={
              inputKosong || tdkCocok ? styles.passSalah : styles.passBenar
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

export default ScreenUpdatePassword;
