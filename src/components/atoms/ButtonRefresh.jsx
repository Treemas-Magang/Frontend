/* eslint-disable prettier/prettier */

import {StyleSheet, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouseUser, faRefresh} from '@fortawesome/free-solid-svg-icons';
import {Color} from '../../utils/color';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

/**
 * Komponen ButtonRefresh digunakan untuk membuat tombol kembali ke halaman dashboard.
 *
 * @param {Object} navigation - Objek navigasi yang digunakan untuk mengganti halaman.
 * @param {Object} style - Gaya tambahan yang dapat diterapkan pada tombol.
 * @returns {JSX.Element} - Komponen React untuk tombol kembali ke halaman dashboard.
 */
const ButtonRefresh = ({navigation, style, styleColor}) => {

  const handleRefresh = () => {
    // Menetapkan kunci baru untuk memicu rendering ulang.
    navigation.replace('detailProfile');
  };


  return (
    <TouchableOpacity style={[styles.ButtonRefresh, style]} onPress={handleRefresh}>
      <FontAwesomeIcon
        icon={faRefresh}
        color={styleColor || Color.green}
        size={wp('7.5%')}
      />
    </TouchableOpacity>
  );
};

export default ButtonRefresh;

const styles = StyleSheet.create({
  ButtonRefresh: {
    position: 'absolute',
    top: wp('45%'),
    right: 19,
    zIndex: 999,
  },
});
