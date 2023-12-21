/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { countDataWithFalseStatus, getToken } from '../../utils/buatStatusPengumumanFalse';
import { useDispatch } from 'react-redux';
import { setJumlahPengumuman } from '../../redux';

const HapusChace = () => {
  const dispatch = useDispatch();
  const clearAllData = async () => {
    try {
      // Kunci yang ingin dihapus
      const keysToRemove = [
        'announcementData',
        'prevData',
        'prevDataAbsenPulang',
        'prevDataCutiWeb',
        'prevDataLembur',
        'prevDataLibur',
        'prevDataReimburse',
      ];

      // Menghapus data untuk kunci tertentu
      await AsyncStorage.multiRemove(keysToRemove);

      console.log('Data successfully removed from AsyncStorage');
      getToken().then(() => {
        countDataWithFalseStatus().then(jumlahDataDenganStatusFalse => {
          dispatch(
            setJumlahPengumuman('pengumuman', +jumlahDataDenganStatusFalse),
          );
        });
      });
    } catch (error) {
      console.error('Error removing data from AsyncStorage:', error);
    }
  };

  return (
    <View>
    <TouchableOpacity onPress={clearAllData}>
    <Text>Hapus</Text>
    </TouchableOpacity>
    </View>
  );
};

export default HapusChace;
