/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const CardInfo = ({
  color,
  title,
  cardInfo,
  styleCard,
  styleContainerCard,
  styleTitle,
  styleInfo,
}) => {
  return (
    <View style={[styles.container, styleContainerCard]}>
      <View style={{alignItems: 'center'}}>
        <View style={[styles.card, {backgroundColor: color}, styleCard]}>
          <Text style={[styles.textInfo, styleInfo]}>{cardInfo}</Text>
        </View>
        <Text style={[styles.text, styleTitle]}>{title}</Text>
      </View>
    </View>
  );
};

export default CardInfo;
const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    alignItems: 'center',
  },
  card: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textTransform: 'uppercase',
    fontFamily: text.semiBold,
    color: Color.blue,
  },
  textInfo: {
    textTransform: 'uppercase',
    fontFamily: text.semiBold,
    color: Color.white,
  },
});
