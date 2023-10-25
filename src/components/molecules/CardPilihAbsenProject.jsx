/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {text} from '../../utils/text';

const CardPilihAbsenProject = ({navigation}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <View>
      
      <TouchableOpacity onPress={() => moveTo('absensi')} style={styles.CardPilihProject}>
        <Text style={styles.Text}>ON SITE</Text>
        <Text style={styles.TextDeskripsi}>
          jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
          Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.CardPilihProject}
        onPress={() => moveTo('absensi')}>
        <Text style={styles.Text}>WORK FROM HOME</Text>
        <Text style={styles.TextDeskripsi}>
          jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
          Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardPilihAbsenProject;

const styles = StyleSheet.create({
  CardPilihProject: {
    backgroundColor: 'transparent',
    borderColor: Color.green,
    borderWidth: 2,
    width: 269,
    minHeight: 100,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontFamily: text.semiBold,
    fontSize: 16,
    color: Color.green,
    paddingVertical: 10,
  },
  TextDeskripsi: {
    fontFamily: text.extraLight,
    fontSize: 10,
    marginBottom: 20,
    color: Color.black,
    paddingHorizontal: 20,
    textAlign: 'justify',
  },
  
});
