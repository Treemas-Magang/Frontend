/* eslint-disable prettier/prettier */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import CardCatatanKerjaHariini from '../molecules/CardCatatanKerjaHariini';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import VectorAtasBesar from '../atoms/VectorAtasBesar';

const FormCatatanKerjaHariini = ({navigation}) => {
  return (
    <View style={styles.BackgroundCatatanKerja}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasBesar />
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
