import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import CardCatatanKerjaHariini from '../molecules/CardCatatanKerjaHariini';

const FormCatatanKerjaHariini = () => {
  return (
    <View style={styles.BackgroundCatatanKerja}>
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
