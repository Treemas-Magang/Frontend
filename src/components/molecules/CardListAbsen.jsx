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
  onPress,
  sakit,
  cuti,
}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };

  // const getStatusText = () => {
  //   switch (true) {
  //     case dataDetailAbsen.isAbsen === '1':
  //       return 'Absen';
  //     case dataDetailAbsen.isCuti === '1':
  //       return 'Cuti';
  //     case dataDetailAbsen.isLembur === '1':
  //       return 'Lembur';
  //     case dataDetailAbsen.isLibur === '1':
  //       return 'Libur';
  //     case dataDetailAbsen.isOther === '1':
  //       return 'Other';
  //     case dataDetailAbsen.isSakit === '1':
  //       return 'Sakit';
  //     case dataDetailAbsen.isWfh === '1':
  //       return 'WFH';
  //     default:
  //       return '-';
  //   }
  // };

  let background = styles.cardBackground;
  if (jam_masuk !== '-') {
    background = styles.cardHadir;
  } else if (sakit !== null || cuti !== null) {
    background = styles.cardSakit;
  } else if (jam_masuk === '-') {
    background = styles.cardTdkMsk;
  }


  // switch (status) {
  //   case 'Absen':
  //     background = styles.cardHadir;
  //     break;
  //   case 'Sakit':
  //     background = styles.cardSakit;
  //     break;
  //   case 'Libur' || 'Cuti':
  //     background = styles.cardTdkMsk;
  //     break;
  //   default:
  //     break;

  return (
    <TouchableOpacity style={[styles.card, background]} onPress={onPress}>
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
    fontFamily: text.semiBoldItalic,
    fontSize: 12,
    color: Color.black,
  },
  jam: {
    fontFamily: text.regular,
    fontSize: 12,
    color: Color.black,
  },
  labelLokasi: {
    fontFamily: text.semiBoldItalic,
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
  cardTdkMsk: {
    backgroundColor: Color.grey,
  },
});
