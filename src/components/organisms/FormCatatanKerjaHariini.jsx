/* eslint-disable prettier/prettier */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import CardCatatanKerjaHariini from '../molecules/CardCatatanKerjaHariini';
import ButtonBack from '../atoms/ButtonBack';

const FormCatatanKerjaHariini = () => {
  return (
    <View style={styles.BackgroundCatatanKerja}>
      <ButtonBack />
      <CardCatatanKerjaHariini />
    </View>
  );
};

export default FormCatatanKerjaHariini;

const styles = StyleSheet.create({
  BackgroundCatatanKerja: {
    backgroundColor: Color.green,
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
