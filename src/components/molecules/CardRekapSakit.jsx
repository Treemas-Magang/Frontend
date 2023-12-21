/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import {text} from '../../utils/text';

const CardRekapSakit = ({
  navigation,
  tanggalAwal,
  tanggalAkhir,
  tanggalKerja,
  jumHari,
  keterangan,
  disetujuiOleh,
  catatanDisetujui,
  image64,
  status,
}) => {
  let base64ImageData = null;
  if (image64 && image64.base64 && image64.fileSize) {
    base64ImageData = `data:image/jpeg;base64,${image64.base64}`;
    console.log('ini file size : ', image64.fileSize);
  } else {
    console.log("imageData tidak ada atau tidak memiliki properti 'base64'");
  }
  console.log('ini base64Image : ', base64ImageData);

  const moveToPreview = () => {
    navigation.navigate('previewPhoto', {photo: base64ImageData});
  };

  let background = styles.cardBackground;
  switch (status) {
    case 'Disetujui':
      background = styles.cardDiterima;
      break;
    case 'Menunggu':
      background = styles.cardMenunggu;
      break;
    case 'Ditolak':
      background = styles.cardDitolak;
      break;
    default:
      break;
  }

  return (
    <View style={[styles.cardRekapSakit, background]}>
      <View style={styles.cardData}>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Dari tanggal</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.deskData}>{tanggalAwal}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Sampai tanggal</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.deskData}>{tanggalAkhir}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Kembali Kerja</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.deskData}>{tanggalKerja}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Jumlah Hari</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.deskData}>{jumHari}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Keterangan</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.deskData}>{keterangan}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Disetujui Oleh</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.deskData}>{disetujuiOleh}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.lebelData}>Catatan Disetujui</Text>
          <Text style={{color: Color.black}}>:</Text>
          <Text style={styles.deskData}>{catatanDisetujui}</Text>
        </View>
      </View>
      {image64 === null ? (
        <View style={styles.status}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      ) : (
        <View style={styles.status}>
          <TouchableOpacity onPress={moveToPreview}>
            <FontAwesomeIcon icon={faImage} size={50} color={Color.white} />
          </TouchableOpacity>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      )}
    </View>
  );
};

export default CardRekapSakit;

const styles = StyleSheet.create({
  cardRekapSakit: {
    backgroundColor: Color.green,
    width: 280,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  cardData: {
    paddingHorizontal: 10,
    height: 170,
    backgroundColor: Color.white,
    justifyContent: 'center',
    borderRadius: 5,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  statusText: {
    fontFamily: text.semiBold,
    fontSize: 25,
    color: Color.white,
    textTransform: 'uppercase',
  },
  data: {
    flexDirection: 'row',
    gap: 10,
  },
  lebelData: {
    width: 110,
    fontSize: 14,
    textTransform: 'capitalize',
    color: Color.black,
  },
  deskData: {
    fontSize: 14,
    width: 110,
    textTransform: 'capitalize',
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
