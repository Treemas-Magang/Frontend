/* eslint-disable prettier/prettier */

import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouseUser} from '@fortawesome/free-solid-svg-icons';
import {Color} from '../../utils/color';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

/**
 * Komponen ButtonHome digunakan untuk membuat tombol kembali ke halaman dashboard.
 *
 * @param {Object} navigation - Objek navigasi yang digunakan untuk mengganti halaman.
 * @param {Object} style - Gaya tambahan yang dapat diterapkan pada tombol.
 * @returns {JSX.Element} - Komponen React untuk tombol kembali ke halaman dashboard.
 */
const ButtonHome = ({navigation, style, styleColor}) => {
  /**
   * Fungsi goHome digunakan untuk mengganti halaman ke 'dashboard'.
   */
  const goHome = () => {
    navigation.replace('dashboard');
  };

  return (
    <TouchableOpacity style={[styles.ButtonHome, style]} onPress={goHome}>
      <FontAwesomeIcon
        icon={faHouseUser}
        color={styleColor || Color.green}
        size={wp('10%')}
      />
    </TouchableOpacity>
  );
};

export default ButtonHome;

const styles = StyleSheet.create({
  ButtonHome: {
    position: 'absolute',
    top: 20,
    right: 15,
    zIndex: 999,
  },
});
