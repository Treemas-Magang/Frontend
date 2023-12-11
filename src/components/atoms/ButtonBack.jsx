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
 * Komponen ButtonBack digunakan untuk membuat tombol kembali dengan ikon panah ke kiri.
 *
 * @param {Object} navigation - Objek navigasi yang digunakan untuk kembali ke halaman sebelumnya.
 * @param {Object} style - Gaya tambahan yang dapat diterapkan pada tombol.
 * @returns {JSX.Element} - Komponen React untuk tombol kembali.
 */
const ButtonBack = ({navigation, style, styleColor}) => {
  /**
   * Fungsi goBack digunakan untuk kembali ke halaman sebelumnya.
   */
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity style={[styles.ButtonBack, style]} onPress={goBack}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        color={styleColor || Color.white}
        size={wp('8%')}
      />
    </TouchableOpacity>
  );
};

export default ButtonBack;

const styles = StyleSheet.create({
  ButtonBack: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 99,
  },
});
