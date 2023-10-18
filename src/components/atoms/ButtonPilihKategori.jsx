/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Color } from '../../utils/color';
import { text } from '../../utils/text';

const ButtonPilihKategori = ({onPress, lebel}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backgroundBtn}>
      <Text style={styles.text}>{lebel}</Text>
    </TouchableOpacity>
  );
};

export default ButtonPilihKategori;

const styles = StyleSheet.create({
    backgroundBtn:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: Color.green,
    },
    text:{
        fontFamily: text.semiBold,
        fontSize: 16,
        color: Color.white,
    },
});
