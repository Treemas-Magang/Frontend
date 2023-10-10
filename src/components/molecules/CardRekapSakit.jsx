/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { text } from '../../utils/text';

const CardRekapSakit = () => {
  return (
  <View style={styles.cardRekapSakit}>
    <View style={styles.cardData}>
        <View style={styles.data}>
            <Text style={styles.lebelData}>Dari tanggal</Text>
            <Text>:</Text>
            <Text>02-03-2021</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.lebelData}>Sampai tanggal</Text>
            <Text>:</Text>
            <Text>02-03-2021</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.lebelData}>Kembali Kerja</Text>
            <Text>:</Text>
            <Text>03-03-2021</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.lebelData}>Jumlah Hari</Text>
            <Text>:</Text>
            <Text>1</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.lebelData}>Keterangan</Text>
            <Text>:</Text>
            <Text>sakit kepala</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.lebelData}>Disetujui Oleh</Text>
            <Text>:</Text>
            <Text>WIRA HADINATA</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.lebelData}>Catatan Disetujui</Text>
            <Text>:</Text>
            <Text>APPROVE</Text>
        </View>
    </View>
    <View style={styles.status}>
        <FontAwesomeIcon icon={faImage} size={50} color={Color.white} />
        <Text style={styles.statusText} >DISETUJUI</Text>
    </View>
  </View>
  );
};

export default CardRekapSakit;

const styles = StyleSheet.create({
  cardRekapSakit: {
    backgroundColor: Color.green,
    width: 280,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  cardData:{
    paddingHorizontal: 10,
    height: 148,
    backgroundColor: Color.white,
    justifyContent: 'center',
    borderRadius: 5,
  },
  status:{
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  statusText:{
    fontFamily: text.semiBold,
    fontSize: 25,
    color: Color.white,
  },
  data:{
    flexDirection: 'row',
    gap: 10,
  },
  lebelData:{
    width: 110
  },
});
