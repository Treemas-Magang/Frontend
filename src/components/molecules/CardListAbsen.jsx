/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable semi */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const CardListAbsen = ({navigation}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <TouchableOpacity style={styles.card} onPress={() => moveTo('detailAbsen')}>
      <Text style={styles.judul}>Selasa 27 April</Text>
      <View style={styles.wrapper}>
        <View style={styles.wrap}>
          <Text style={styles.labelJam}>Jam Masuk</Text>
          <Text style={styles.jam}>09:45</Text>
          <Text style={styles.labelLokasi}>Lokasi Masuk</Text>
          <Text style={styles.alamat} numberOfLines={5}>
            jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
            Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
          </Text>
        </View>
        <View style={styles.wrap}>
          <Text style={styles.labelJam}>Jam Pulang</Text>
          <Text style={styles.jam}>17:45</Text>
          <Text style={styles.labelLokasi}>Lokasi Pulang</Text>
          <Text style={styles.alamat} numberOfLines={5}>
            jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
            Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardListAbsen;

const styles = StyleSheet.create({
  card: {
    width: 320,
    height: 198,
    backgroundColor: Color.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  wrapper: {
    flexDirection: 'row',
    gap: 10,
  },
  wrap: {
    backgroundColor: Color.white,
    width: 148,
    height: 142,
    borderRadius: 5,
    padding: 5,
  },
  judul: {
    width: '100%',
    textAlign: 'left',
    paddingLeft: 10,
    fontFamily: text.semiBold,
    fontSize: 16,
    color: Color.black,
  },
  labelJam: {
    fontFamily: text.lightItalic,
    fontSize: 12,
    color: Color.black,
  },
  jam: {
    fontFamily: text.semiBold,
    fontSize: 12,
    color: Color.black,
  },
  labelLokasi: {
    fontFamily: text.lightItalic,
    fontSize: 12,
    color: Color.black,
  },
  alamat: {
    fontFamily: text.light,
    fontSize: 12,
    textAlign: 'justify',
  },
});
