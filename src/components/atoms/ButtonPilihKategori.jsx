/* eslint-disable prettier/prettier */

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

/**
 * Komponen ButtonPilihKategori digunakan untuk membuat tombol untuk memilih kategori.
 *
 * @param {function} onPress - Fungsi yang akan dipanggil ketika tombol ditekan.
 * @param {string} lebel - Teks yang akan ditampilkan pada tombol.
 * @returns {JSX.Element} - Komponen React untuk tombol memilih kategori.
 */
const ButtonPilihKategori = ({onPress, lebel}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backgroundBtn}>
      <Text style={styles.text}>{lebel}</Text>
      <View style={styles.wrapNotif}>
        <Text style={styles.textNotif}>2</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonPilihKategori;

const styles = StyleSheet.create({
  backgroundBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    position: 'relative',
    backgroundColor: Color.green,
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    fontFamily: text.semiBold,
    fontSize: 16,
    color: Color.white,
  },
  wrapNotif: {
    backgroundColor: Color.red,
    height: 25,
    width: 25,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNotif: {
    color: Color.white,
    fontFamily: text.regular,
  },
});
