/* eslint-disable prettier/prettier */

import {StyleSheet, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/**
 * Komponen VectorAtasKecil digunakan untuk menampilkan gambar vektor kecil
 * di bagian atas sebelah kanan layar.
 *
 * @returns {JSX.Element} - Komponen React untuk vektor kecil di bagian atas.
 */
const VectorAtasKecil = () => {
  return (
    <Image
      style={styles.VectorAtasKecil}
      resizeMode="contain"
      source={require('../../assets/vector/VectorAtas.png')}
    />
  );
};

const styles = StyleSheet.create({
  VectorAtasKecil: {
    position: 'absolute',
    top: hp('0%'),
    right: wp('0%'),
    zIndex: -1,
  },
});

export default VectorAtasKecil;
