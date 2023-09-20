/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

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
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'Poppins',
  },
  textInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});