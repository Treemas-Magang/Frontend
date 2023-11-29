/* eslint-disable prettier/prettier */

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';

/**
 * Komponen ButtonAction digunakan untuk membuat tombol aksi dengan gaya yang telah ditentukan.
 *
 * @param {string} title - Teks yang akan ditampilkan pada tombol.
 * @param {function} onPress - Fungsi yang akan dipanggil ketika tombol ditekan.
 * @param {Object} style - Gaya tambahan yang dapat diterapkan pada tombol.
 * @returns {JSX.Element} - Komponen React untuk tombol aksi.
 */
const ButtonAction = ({title, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonAction;

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 50,
    backgroundColor: Color.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    color: Color.white,
    fontSize: 22,
    textTransform: 'uppercase',
    width: '100%',
    textAlign: 'center',
  },
});
