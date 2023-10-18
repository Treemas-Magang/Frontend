/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import ButtonPilihKategori from '../atoms/ButtonPilihKategori';

const KategoriApproval = () => {
  return (
    <View style={styles.wrappPilihan}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ButtonPilihKategori lebel='LIBUR' />
        <View style={styles.gap} />
        <ButtonPilihKategori lebel='LEMBUR' />
        <View style={styles.gap} />
        <ButtonPilihKategori lebel='LUPA PULANG' />
        <View style={styles.gap} />
        <ButtonPilihKategori lebel='UPDATE ABSENSI' />
        <View style={styles.gap} />
        <ButtonPilihKategori lebel='ABSENSI FORM' />
        <View style={styles.gap} />
        <ButtonPilihKategori lebel='CUTI' />
        <View style={styles.gap} />
        <ButtonPilihKategori lebel='CUTI FORM' />
        <View style={styles.gap} />
        <ButtonPilihKategori lebel='SAKIT' />
        <View style={styles.gap} />
        <ButtonPilihKategori lebel='CANCEL CUTI' />
      </ScrollView>
    </View>
  );
};

export default KategoriApproval;

const styles = StyleSheet.create({
    wrappPilihan:{
        width: '90%'
    },
    gap:{
        marginHorizontal: 5,
    },
});
