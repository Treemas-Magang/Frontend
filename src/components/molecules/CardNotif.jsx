/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardNotif = ({open, tanggal, judul, deskripsi, onPress, id}) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const fetchDataFromAsyncStorage = async () => {
      try {
        const existingData = await AsyncStorage.getItem('selectedIds');
        if (existingData) {
          const dataId = JSON.parse(existingData);
          const isSudahBaca = cekSudahBaca(dataId, id);
          setStatus(isSudahBaca);
        } else {
          console.log('Tidak ada data selectedIds di AsyncStorage.');
        }
      } catch (error) {
        console.error(
          'Terjadi kesalahan dalam mengambil data dari AsyncStorage:',
          error,
        );
      }
    };

    fetchDataFromAsyncStorage();
  }, [id]);

  // useEffect(() => {
  //   const isSudahBaca = cekSudahBaca(idPadaStorage, id);
  //   setStatus(isSudahBaca);
  // }, [id, idPadaStorage]);

  const cekSudahBaca = (dataStorage, id) => {
    try {
      const data = dataStorage;
      const idPengumuman = id;
      const status = data.includes(idPengumuman);
      return status;
    } catch (error) {
      console.error('Gagal mengurai dataStorage:', error);
      return false;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.CardNotifStyle,
        open
          ? {backgroundColor: Color.cardTidakMasuk}
          : {backgroundColor: Color.green},
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

export default CardNotif;

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
