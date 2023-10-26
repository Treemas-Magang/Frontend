/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

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

export default IconMenu;

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
