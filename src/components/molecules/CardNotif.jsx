/* eslint-disable prettier/prettier */

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

/**
 * Komponen CardNotif digunakan untuk menampilkan kartu notifikasi.
 *
 * @param {Object} props - Properti komponen.
 * @param {string} props.tanggal - Tanggal notifikasi.
 * @param {string} props.judul - Judul notifikasi.
 * @param {string} props.deskripsi - Deskripsi notifikasi.
 * @param {Function} props.onPress - Fungsi yang dipanggil ketika kartu ditekan.
 * @param {boolean} props.status - Status notifikasi (terbuka atau belum terbuka).
 *
 * @returns {JSX.Element} - Komponen kartu notifikasi.
 */
const CardNotif = ({tanggal, judul, deskripsi, onPress, status}) => {
  return (
    <TouchableOpacity
      style={[
        styles.CardNotifStyle,
        status ? {backgroundColor: Color.grey} : {backgroundColor: Color.green},
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

export default CardNotif;
