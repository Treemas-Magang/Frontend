/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAnglesLeft,
  faAnglesRight,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import {API_GABUNGAN} from '@env';
import axios from 'axios';
import { getDataFromSession } from '../../utils/getDataSession';
import { kirimLokasiTracking } from '../../utils/kirimLokasiTracking';
/**
 * Komponen ButtonLogout digunakan untuk membuat tombol logout dengan efek muncul dari kanan ke kiri.
 *
 * @param {Object} navigation - Objek navigasi yang digunakan untuk mengganti halaman.
 * @param {Object} style - Gaya tambahan yang dapat diterapkan pada tombol.
 * @param {Object} posisiLogout - Gaya tambahan untuk menentukan posisi tombol logout.
 * @returns {JSX.Element} - Komponen React untuk tombol logout dengan efek muncul dari kanan ke kiri.
 */
const ButtonLogout = ({navigation, style, posisiLogout}) => {
  const [isOpenLogout, setIsOpenLogout] = useState(false);

  /**
   * Fungsi openLogout digunakan untuk membuka atau menutup tombol logout.
   */
  const openLogout = () => {
    setIsOpenLogout(!isOpenLogout); // Menggunakan !isOpenLogout untuk mengubah nilainya.
  };

  const lebarLogout = {lebarAwal: 43, lebarAkhir: 133};

  /**
   * Fungsi logout digunakan untuk keluar dari sesi pengguna dan menghapus token otentikasi dari AsyncStorage.
   */
const logout = async () => {
  kirimLokasiTracking();
  // Show an alert to confirm logout
  Alert.alert(
    'Logout',
    'Apa anda mau melakukan logout?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          getDataFromSession('token')
            .then(token => {
              const headers = {
                Authorization: `Bearer ${token}`,
              };
              ApiLogout(headers);
            })
            .catch(error => console.log(error));
        },
      },
    ],
    {cancelable: false},
  );
};


  const ApiLogout = async (headers) => {
    try {
      const response = await axios.post(
        API_GABUNGAN + '/api/auth/logout',
        {},
        {
          headers,
        },
      );
      console.log('berhasil logout : ', response);
      // Hapus token otentikasi dari AsyncStorage
      AsyncStorage.removeItem('token')
        .then(() => {
          console.log('Token otentikasi berhasil dihapus.');
          navigation.replace('login');
        })
        .catch(error => {
          console.error(
            'Terjadi kesalahan saat menghapus token otentikasi:',
            error,
          );
        });
    } catch (error) {
      console.log('gagal logout :', error.response);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.logout,
          posisiLogout,
          !isOpenLogout
            ? {width: lebarLogout.lebarAwal}
            : {
                width: lebarLogout.lebarAkhir,
                alignItems: 'flex-start',
                paddingLeft: 10,
              },
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => openLogout()}>
            <FontAwesomeIcon
              icon={!isOpenLogout ? faPowerOff : faAnglesRight}
              size={25}
              color={Color.white}
            />
          </TouchableOpacity>
          {!isOpenLogout ? (
            ''
          ) : (
            <TouchableOpacity onPress={() => logout()}>
              <Text
                style={{
                  marginHorizontal: 20,
                  fontWeight: 'bold',
                  color: Color.white,
                  width: '100%',
                }}>
                LOGOUT
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ButtonLogout;

const styles = StyleSheet.create({
  logout: {
    position: 'absolute',
    right: 0,
    height: 40,
    backgroundColor: Color.red,
    width: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  container: {
    width: '100%',
    position: 'relative',
  },
});
