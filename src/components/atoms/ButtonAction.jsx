import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';

const ButtonAction = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonAction;

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 50,
    backgroundColor: Color.green,
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
