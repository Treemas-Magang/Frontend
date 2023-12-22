/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAnglesLeft,
  faAnglesRight,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Color} from '../../utils/color';

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
  const logout = () => {
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
