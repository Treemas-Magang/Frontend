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
const ButtonPilihKategori = ({onPress, lebel, warna, jmlNotif}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.backgroundBtn, {backgroundColor: warna}]}>
      <Text style={styles.text}>{lebel}</Text>
      {
        jmlNotif === null ? (
          ''
        ) : (
        <View style={styles.wrapNotif}>
          <Text style={styles.textNotif}>{jmlNotif}</Text>
        </View>
        )
      }
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
