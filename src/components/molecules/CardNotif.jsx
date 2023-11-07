/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const CardNotif = ({open, tanggal, judul, deskripsi, onPress, status}) => {
  return (
    <TouchableOpacity
      style={[
        styles.CardNotifStyle,
        open
          ? {backgroundColor: Color.cardTidakMasuk}
          : {backgroundColor: Color.green},
      ]}
      onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {status ? (
          <Image
            source={require('../../assets/icons/PesanTerbuka.png')}
            style={styles.Image}
          />
        ) : (
          <Image
            source={require('../../assets/icons/Pesan.png')}
            style={styles.Image}
          />
        )}
        <View>
          <Text style={{fontFamily: text.lightItalic, fontSize: 10}}>
            {tanggal}
          </Text>
          <Text
            style={{fontFamily: text.semiBold, fontSize: 12, width: 200}}
            numberOfLines={1}>
            {status}
            {judul}
          </Text>
          <Text
            style={{fontFamily: text.regular, fontSize: 10, width: 177}}
            numberOfLines={2}>
            {deskripsi}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardNotif;

const styles = StyleSheet.create({
  CardNotifStyle: {
    width: 320,
    height: 80,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
  },
  Image: {
    width: 70,
    height: 70,
    marginHorizontal: 15,
  },
});
