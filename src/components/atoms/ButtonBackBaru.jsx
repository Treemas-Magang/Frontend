/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Color} from '../../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/**
 * Komponen ButtonBackBaru digunakan untuk membuat tombol kembali dengan mengganti atau mereset navigasi ke halaman tujuan tertentu.
 *
 * @param {Object} navigation - Objek navigasi yang digunakan untuk mereset atau mengganti halaman.
 * @param {Object} style - Gaya tambahan yang dapat diterapkan pada tombol.
 * @param {string} tujuan - Nama halaman tujuan yang akan direset atau diganti.
 * @returns {JSX.Element} - Komponen React untuk tombol kembali dengan fitur reset atau ganti halaman.
 */
const ButtonBackBaru = ({navigation, style, tujuan}) => {
  /**
   * Fungsi goBack digunakan untuk mereset navigasi dan kembali ke halaman tujuan.
   */
  const goBack = () => {
    // Menggunakan navigation.replace untuk mengganti halaman, atau
    // Menggunakan navigation.reset untuk mereset navigasi ke halaman tujuan.
    navigation.reset({
      index: 0,
      routes: [{name: tujuan}],
    });
  };

  return (
    <TouchableOpacity style={[styles.ButtonBack, style]} onPress={goBack}>
      <FontAwesomeIcon icon={faArrowLeft} color={Color.white} size={wp('8%')} />
    </TouchableOpacity>
  );
};

export default ButtonBackBaru;

const styles = StyleSheet.create({
  ButtonBack: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 99,
  },
});
