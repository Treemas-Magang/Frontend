/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CardRekapCuti = ({
  nmTempat,
  tanggalAwal,
  tanggalAkhir,
  tanggalMasuk,
  jmlhHari,
  jmlhCutiBersama,
  jmlhCutiKhusus,
  keterangan,
  catDisetujui,
  tglDisetujui,
  disetujuiOleh,
  status,
}) => {
  let background = styles.cardBackground;
  switch (status) {
    case 'diterima':
      background = styles.cardDiterima;
      break;
    case 'menunggu':
      background = styles.cardMenunggu;
      break;
    case 'ditolak':
      background = styles.cardDitolak;
      break;
    default:
      break;
  }
  return (
    <View style={[styles.cardRekapCuti, background]}>
      <View style={styles.status}>
        <Text style={styles.statusTextTitle}>{nmTempat}</Text>
      </View>
      <View style={styles.cardData}>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Dari tanggal</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.textData}>{tanggalAwal}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Sampai tanggal</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.textData}>{tanggalAkhir}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Tanggal Masuk</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.textData}>{tanggalMasuk}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Jumlah Hari</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.textData}>{jmlhHari}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Jumlah Cuti Bersama</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.textData}>{jmlhCutiBersama}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Jumlah Cuti Khusus</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.textData}>{jmlhCutiKhusus}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Keterangan</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.textData}>{keterangan}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Catatan Diseteujui</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.textData}>{catDisetujui}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Tanggal Disetujui</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.textData}>{tglDisetujui}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Disetujui Oleh</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.textData}>{disetujuiOleh}</Text>
        </View>
      </View>
      <View style={styles.status}>
        <Text style={styles.statusText}>{status}</Text>
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
    textTransform: 'uppercase',
  },
  statusTextTitle: {
    fontFamily: text.semiBold,
    fontSize: hp('2.5%'),
    color: Color.white,
    textTransform: 'uppercase',
  },
  data: {
    flexDirection: 'row',
    gap: 10,
  },
  lebelData: {
    width: 140,
    fontSize: hp('2%'),
    color: Color.black,
  },
  textData: {
    width: wp('28%'),
    fontSize: hp('2%'),
    color: Color.black,
  },
  cardBackground: {
    backgroundColor: Color.green,
  },
  cardDiterima: {
    backgroundColor: Color.green,
  },
  cardMenunggu: {
    backgroundColor: Color.cardCuti,
  },
  cardDitolak: {
    backgroundColor: Color.red,
  },
});
