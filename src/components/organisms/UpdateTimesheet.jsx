import {StyleSheet, View, Image, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import CardUpdateTimesheet from '../molecules/CardUpdateTimesheet';
import {Color} from '../../utils/color';

const UpdateTimesheet = () => {
  return (
    <View style={styles.BackgroundUpdateTimesheet}>
      <CardUpdateTimesheet />
    </View>
  );
};

export default UpdateTimesheet;

const styles = StyleSheet.create({
  BackgroundUpdateTimesheet: {
    backgroundColor: Color.green,
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
