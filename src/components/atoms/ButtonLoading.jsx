/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';

const ButtonLoading = ({style}) => {
  return (
    <View style={[styles.button, style]}>
      <ActivityIndicator size="large" color={Color.white} />
    </View>
  );
};

export default ButtonLoading;

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 50,
    backgroundColor: Color.skeleton,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    color: Color.white,
    fontSize: 22,
    textTransform: 'uppercase',
    width: '100%',
    textAlign: 'center',
  },
});
