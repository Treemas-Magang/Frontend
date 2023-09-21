/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';

const CardInfo = ({color, title, cardInfo}) => {
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View style={[styles.card, {backgroundColor: color}]}>
          <Text style={styles.textInfo}>{cardInfo}</Text>
        </View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};

export default CardInfo;
const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 70,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 9,
    textTransform: 'uppercase',
    fontFamily: 'Poppins-SemiBold',
    color: Color.blue,
  },
  textInfo: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontFamily: 'Poppins-SemiBold',
    color: Color.white,
  },
});
