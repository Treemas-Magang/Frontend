/* eslint-disable prettier/prettier */

import {StyleSheet, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/**
 * Komponen VectorAtasBesar digunakan untuk menampilkan gambar vektor besar
 * di bagian atas sebelah kanan layar.
 *
 * @returns {JSX.Element} - Komponen React untuk vektor besar di bagian atas.
 */
const VectorAtasBesar = () => {
  return (
    <Image
      style={styles.VectorAtasBesar}
      resizeMode="contain"
      source={require('../../assets/vector/VectorKananAtas.png')}
    />
  );
};

const styles = StyleSheet.create({
  VectorAtasBesar: {
    position: 'absolute',
    top: hp('0%'),
    right: wp('0%'),
    zIndex: -1,
  },
});

export default VectorAtasBesar;
