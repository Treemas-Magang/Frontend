/* eslint-disable prettier/prettier */
import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import CardUpdateTimesheet from '../molecules/CardUpdateTimesheet';
import {Color} from '../../utils/color';

const FormUpdateTimesheet = () => {
  return (
    <View style={styles.BackgroundUpdateTimesheet}>
      <Image
        style={styles.VectorAtasKebalik}
        source={require('../../assets/vector/VectorAtasKebalik.png')}
      />
      <CardUpdateTimesheet />
      <Image
        style={styles.VectorBawah}
        source={require('../../assets/vector/VectorBawah.png')}
      />
    </View>
  );
};

export default FormUpdateTimesheet;

const styles = StyleSheet.create({
  BackgroundUpdateTimesheet: {
    backgroundColor: Color.green,
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  VectorBawah: {
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
    width: '100%',
  },
  VectorAtasKebalik: {
    position: 'absolute',
    top: 0,
    zIndex: -1,
    width: '100%',
  },
});
