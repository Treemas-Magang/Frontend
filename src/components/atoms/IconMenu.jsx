/* eslint-disable prettier/prettier */

import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

/**
 * Komponen IconMenu digunakan untuk membuat ikon menu dengan gambar dan teks.
 *
 * @param {Object} props - Properti yang diterima oleh komponen.
 * @param {Object} props.image - Sumber gambar ikon menu.
 * @param {string} props.title - Teks label untuk ikon menu.
 * @param {Function} props.onPress - Fungsi yang dipanggil saat ikon menu ditekan.
 * @param {Object} props.styleNamaMenu - Gaya tambahan untuk teks nama menu.
 * @param {Object} props.styleImage - Gaya tambahan untuk gambar ikon menu.
 * @param {Object} props.box - Gaya tambahan untuk kotak yang mengelilingi ikon menu.
 * @returns {JSX.Element} - Komponen React untuk ikon menu.
 */
const IconMenu = ({image, title, onPress, styleNamaMenu, styleImage, box}) => {
  return (
    <TouchableOpacity style={[styles.boxImage, box]} onPress={onPress}>
      <Image
        source={image}
        style={[styles.image, styleImage]}
        resizeMode="contain"
      />
      <Text style={[styles.namaMenu, styleNamaMenu]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    marginBottom: 5,
  },
  boxImage: {
    alignItems: 'center',
  },
  namaMenu: {
    fontFamily: text.semiBold,
    color: Color.blue,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default IconMenu;
