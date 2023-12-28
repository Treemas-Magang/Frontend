/* eslint-disable prettier/prettier */
import ReactNativeBiometrics from 'react-native-biometrics';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { countDataWithFalseStatus, getToken } from './buatStatusPengumumanFalse';
import { setJumlahApproval, setJumlahPengumuman } from '../redux';

export const loginBiometric = async (
  formLoginFP,
  setIsLoading,
  setIsLogin,
  isPassChange,
  navigation,
  dispatch,
  routeAPI,
) => {
  setIsLoading(true);

  try {
    const rnBiometrics = new ReactNativeBiometrics();
    const result = await rnBiometrics.simplePrompt({
      promptMessage: 'Gunakan sidik jari untuk login',
      cancelButtonText: 'Batal',
    });

    if (result.success) {
      console.log('Authentication successful');
      try {
        const response = await axios.post(
          `${routeAPI}/api/auth/login`,
          formLoginFP,
        );
        const dataLogin = response.data.data;

        if (response.status === 200) {
          setIsLogin(true);
          const token = dataLogin.token;
          const role = dataLogin.user.role;
          const nama = dataLogin.user.full_name;

          if (response.data.data.user.is_pass_chg !== '0') {
          isPassChange(true);
          }
          await AsyncStorage.setItem('nama', nama);
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('role', role);
          setIsLoading(false);

          // // Fetch notifications
          // getToken().then(() => {
          //   countDataWithFalseStatus().then(jumlahDataDenganStatusFalse => {
          //     dispatch(
          //       setJumlahPengumuman('pengumuman', +jumlahDataDenganStatusFalse),
          //     );
          //     dispatch(setJumlahApproval('approval', 10));
          //   });
          // });
        } else {
          console.log('message: ', response.data.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error during login:', error.response);
        // handleLoginError(error);
      }
    } else if (result.error) {
      setIsLoading(false);
      console.log('Authentication failed');
    }
  } catch (error) {
    setIsLoading(false);
    navigation.navigate('gagalSidikJari');
  }
};
