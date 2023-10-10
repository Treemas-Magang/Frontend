/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

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
          <Text>02-03-2021</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Sampai tanggal</Text>
          <Text>:</Text>
          <Text>10-03-2021</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Tanggal Masuk</Text>
          <Text>:</Text>
          <Text>03-03-2021</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Jumlah Hari</Text>
          <Text>:</Text>
          <Text>1</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Jumlah Cuti Bersama</Text>
          <Text>:</Text>
          <Text>1</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Jumlah Cuti Khusus</Text>
          <Text>:</Text>
          <Text>1</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Keterangan</Text>
          <Text>:</Text>
          <Text>Pulang Kampung</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Catatan Diseteujui</Text>
          <Text>:</Text>
          <Text>Bawa Oleh Oleh</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Tanggal Disetujui</Text>
          <Text>:</Text>
          <Text>05-03-2021</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Disetujui Oleh</Text>
          <Text>:</Text>
          <Text>Pak Dede</Text>
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
    width: 350,
    height: 380,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  cardData: {
    paddingHorizontal: 25,
    height: 300,
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
    fontSize: 25,
    color: Color.white,
  },
  statusTextTitle: {
    fontFamily: text.semiBold,
    fontSize: 15,
    color: Color.white,
  },
  data: {
    flexDirection: 'row',
    gap: 10,
  },
  lebelData: {
    width: 140,
  },
});
