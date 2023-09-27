import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
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

const ScreenLogin = ({navigation}) => {
  const [appVersion, setAppVersion] = useState('');
  const [scanCount, setScanCount] = useState(0);
  const maxScanCount = 3;
  const {form} = useSelector(state => state.LoginReducer);
  const {location} = useSelector(state => state.SplashReducer);
  const {biometricType} = useSelector(state => state.CheckBiometricTypeReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    checkBiometryType(dispatch);

    getDataFromSession('appVersion')
      .then(apkVersion => {
        if (apkVersion !== null) {
          setAppVersion(apkVersion);
        } else {
          console.log('Data tidak ditemukan di sesi.');
        }
      })
      .catch(error => {
        console.error('Terjadi kesalahan dalam getDataFromSession:', error);
      });
  }, [biometricType]);

  const onChangeText = (value, inputType) => {
    dispatch(setForm(inputType, value));
  };
  const sendData = () => {
    console.log('kirim data : ', form);
    console.log('location reducer: ', location);
  };
  const moveToLupaPassword = () => {
    navigation.navigate('lupaPassword');
  };
  console.log(scanCount);
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
        navigation.navigate('dashboard');
      }
      if (result.error) {
        // Pemindaian gagal
        console.log('Otentikasi gagal');

        // Update jumlah pemindaian yang gagal
        setScanCount(scanCount + 1);

        // Cek apakah sudah mencapai batas jumlah pemindaian yang gagal
        if (scanCount >= maxScanCount) {
          console.log(
            'Anda telah mencapai batas jumlah pemindaian yang gagal.',
          );
          navigation.navigate('gagalSidikJari');
          // Lakukan tindakan jika jumlah pemindaian yang gagal mencapai batas
        }
      }
    } catch (error) {
      console.error('Terjadi kesalahan dalam otentikasi sidik jari:', error);
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
