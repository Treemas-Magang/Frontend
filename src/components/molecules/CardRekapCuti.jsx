/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CardRekapCuti = () => {
  return (
    <View style={styles.cardRekapCuti}>
      <View style={styles.status}>
        <Text style={styles.statusTextTitle}>Purwokerto</Text>
      </View>
      <View style={styles.cardData}>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Dari tanggal</Text>
          <Text>:</Text>
          <Text style={styles.textData}>02-03-2021</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Sampai tanggal</Text>
          <Text>:</Text>
          <Text style={styles.textData}>10-03-2021</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Tanggal Masuk</Text>
          <Text>:</Text>
          <Text style={styles.textData}>03-03-2021</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Jumlah Hari</Text>
          <Text>:</Text>
          <Text style={styles.textData}>1</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Jumlah Cuti Bersama</Text>
          <Text>:</Text>
          <Text style={styles.textData}>1</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Jumlah Cuti Khusus</Text>
          <Text>:</Text>
          <Text style={styles.textData}>1</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Keterangan</Text>
          <Text>:</Text>
          <Text style={styles.textData}>Pulang Kampung</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Catatan Diseteujui</Text>
          <Text>:</Text>
          <Text style={styles.textData}>Bawa Oleh Oleh</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Tanggal Disetujui</Text>
          <Text>:</Text>
          <Text style={styles.textData}>05-03-2021</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Disetujui Oleh</Text>
          <Text>:</Text>
          <Text style={styles.textData}>Pak Dede</Text>
        </View>
      </View>
      <View style={styles.status}>
        <Text style={styles.statusText}>DISETUJUI</Text>
      </View>
    </View>
  );
};

export default CardRekapCuti;

const styles = StyleSheet.create({
  cardRekapCuti: {
    backgroundColor: Color.green,
    width: wp('92%'),
    height: hp('55%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  cardData: {
    paddingHorizontal: 25,
    height: hp('40%'),
    width: wp('80%'),
    backgroundColor: Color.white,
    justifyContent: 'center',
    borderRadius: 5,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  statusText: {
    fontFamily: text.semiBold,
    fontSize: hp('5%'),
    color: Color.white,
  },
  statusTextTitle: {
    fontFamily: text.semiBold,
    fontSize: hp('2%'),
    color: Color.white,
  },
  data: {
    flexDirection: 'row',
    gap: 10,
  },
  lebelData: {
    width: 140,
    fontSize: hp('2%'),
  },
  textData: {
    width: wp('28%'),
    fontSize: hp('2%'),
  },
});
