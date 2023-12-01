/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable semi */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const CardListAbsen = ({
  navigation,
  jam_masuk,
  lokasi_masuk,
  jam_pulang,
  lokasi_pulang,
  tanggal_absen,
  status,
}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };

  let background = styles.cardBackground;
  switch (status) {
    case 'hadir':
      background = styles.cardHadir;
      break;
    case 'sakit':
      background = styles.cardSakit;
      break;
    default:
      break;
  }

  return (
    <TouchableOpacity
      style={[styles.card, background]}
      onPress={() => moveTo('detailAbsen')}>
      <Text style={styles.judul}>{tanggal_absen}</Text>
      <View style={styles.wrapper}>
        <View style={styles.wrap}>
          <Text style={styles.labelJam}>Jam Masuk</Text>
          <Text style={styles.jam}>{jam_masuk}</Text>
          <Text style={styles.labelLokasi}>Lokasi Masuk</Text>
          <Text style={styles.alamat} numberOfLines={5}>
            {lokasi_masuk}
          </Text>
        </View>
        <View style={styles.wrap}>
          <Text style={styles.labelJam}>Jam Pulang</Text>
          <Text style={styles.jam}>{jam_pulang}</Text>
          <Text style={styles.labelLokasi}>Lokasi Pulang</Text>
          <Text style={styles.alamat} numberOfLines={5}>
            {lokasi_pulang}
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
    paddingVertical: 20,
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
    paddingVertical: 10,
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
  cardBackground: {
    backgroundColor: Color.green,
  },
  cardHadir: {
    backgroundColor: Color.green,
  },
  cardSakit: {
    backgroundColor: Color.cardSakit,
  },
});
