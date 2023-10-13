/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Color } from '../../utils/color';
import { text } from '../../utils/text';

const CardMember = () => {
  return (
    <TouchableOpacity style={styles.cardMember}>
      <View style={styles.dataMember}>
        <View style={styles.wrapData}>
          <Text style={styles.labelData}>Jam Masuk</Text>
          <Text style={styles.titikDua}>:</Text>
          <Text style={styles.data}>09:45</Text>
        </View>
        <View style={styles.wrapData}>
          <Text style={styles.labelData}>Jam Pulang</Text>
          <Text style={styles.titikDua}>:</Text>
          <Text style={styles.data}>Belum absen pulang</Text>
        </View>
      </View>
      <Text style={styles.nama}>Rizki febriansyah</Text>
    </TouchableOpacity>
  );
};

export default CardMember;

const styles = StyleSheet.create({
  cardMember: {
    width: 280,
    backgroundColor: Color.green,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  dataMember:{
    width: 255,
    backgroundColor: Color.white,
  },
  wrapData:{
    flexDirection: 'row',
    padding: 10,
  },
  labelData:{
    width: 100,
    fontFamily: text.semiBold,
    fontSize: 12,
    color: Color.black,
  },
  data:{
    paddingLeft: 10,
    fontFamily: text.lightItalic,
    fontSize: 12,
  },
  titikDua:{
    fontFamily: text.semiBold,
    fontSize: 12,
    color: Color.black,
  },
  nama:{
    fontFamily: text.semiBold,
    fontSize: 16,
    color:Color.white,
    textTransform: 'uppercase',
    marginTop: 10,
  }
});
