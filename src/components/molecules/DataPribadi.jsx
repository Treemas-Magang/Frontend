/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Color} from '../../utils/color';

const DataPribadi = ({nik, nama_karyawan}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: 310,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View>
        <Text style={styles.textNama}>{nama_karyawan}</Text>
        <Text style={styles.textNik}>{nik}</Text>
      </View>
      <View
        style={{
          width: 83,
          height: 83,
          backgroundColor: Color.blue,
          borderRadius: 100,
        }}></View>
    </View>
  );
};

export default DataPribadi;

const styles = StyleSheet.create({
  textNama: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Color.blue,
    textTransform: 'uppercase',
    width: 200
  },
  textNik: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Color.blue,
  },
});
