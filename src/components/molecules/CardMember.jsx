/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const CardMember = ({
  navigation,
  status,
  jamMsk,
  jamPlg,
  nama,
  idMember,
  onPress,
  cuti,
  sakit,
}) => {
  console.log('ini status :', status);
  console.log(idMember);
  let background = styles.cardHadir;
  if (jamMsk !== null) {
    background = styles.cardHadir;
  } else if (cuti !== null || sakit !== null) {
    background = styles.cardCuti;
  } else if (jamMsk === null) {
    background = styles.cardTidakMasuk;
  }
  // switch (status) {
  //   case 'sakit':
  //     background = styles.cardSakit;
  //     break;
  //   case 'cuti':
  //     background = styles.cardCuti;
  //     break;
  //   case 'tidakMasuk':
  //     background = styles.cardTidakMasuk;
  //     break;
  //   case 'hadir':
  //     background = styles.cardHadir;
  //     break;
  //   default:
  //     break;
  // }
  // const moveTo = tujuan => {
  //   navigation.navigate(tujuan);
  // };
  return (
    <TouchableOpacity style={[styles.cardMember, background]} onPress={onPress}>
      <View style={styles.dataMember}>
        <View style={styles.wrapData}>
          <Text style={styles.labelData}>Jam Masuk</Text>
          <Text style={styles.titikDua}>:</Text>
          <Text style={styles.data}>
            {jamMsk !== null ? jamMsk : 'Belum Absen Masuk'}
          </Text>
        </View>
        <View style={styles.wrapData}>
          <Text style={styles.labelData}>Jam Pulang</Text>
          <Text style={styles.titikDua}>:</Text>
          <Text style={styles.data}>
            {jamPlg !== null ? jamPlg : 'Belum Absen Pulang'}
          </Text>
        </View>
      </View>
      <Text style={styles.nama}>{nama}</Text>
    </TouchableOpacity>
  );
};

export default CardMember;

const styles = StyleSheet.create({
  cardMember: {
    width: 280,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  cardSakit: {
    backgroundColor: Color.cardSakit,
  },
  cardCuti: {
    backgroundColor: Color.cardCuti,
  },
  cardHadir: {
    backgroundColor: Color.green,
  },
  cardTidakMasuk: {
    backgroundColor: Color.cardTidakMasuk,
  },
  dataMember: {
    width: 255,
    backgroundColor: Color.white,
  },
  wrapData: {
    flexDirection: 'row',
    padding: 10,
  },
  labelData: {
    width: 100,
    fontFamily: text.semiBold,
    fontSize: 12,
    color: Color.black,
  },
  data: {
    paddingLeft: 10,
    fontFamily: text.lightItalic,
    fontSize: 12,
  },
  titikDua: {
    fontFamily: text.semiBold,
    fontSize: 12,
    color: Color.black,
  },
  nama: {
    fontFamily: text.semiBold,
    fontSize: 16,
    color: Color.white,
    textTransform: 'uppercase',
    marginTop: 10,
    textAlign: 'center',
  },
});
