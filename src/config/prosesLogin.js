/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const LoginFingerprint = async ({ navigation }) => {
    const { formLogin } = useSelector(state => state.LoginFingerPrintReducer);
    try {
        const response = await axios.post('http://192.168.10.190:8081/api/auth/login', formLogin);
        const dataLogin = response.data.data;
        if (response.status === 200) {
            const token = dataLogin.token;
            await AsyncStorage.setItem('token', token);
            navigation.replace('dashboard');
        } else {
            console.log('message : ', response.data.message);
        }
    } catch (error) {
        console.error('Terjadi kesalahan saat autentikasi:', error);
    }
}
