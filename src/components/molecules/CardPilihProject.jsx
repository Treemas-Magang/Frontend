/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const CardPilihProject = ({onPress, nama, alamat}) => {
  return (
    <TouchableOpacity style={styles.CardPilihProject} onPress={onPress}>
      <Text style={styles.Text}>{nama}</Text>
      <Text style={styles.TextDeskripsi} numberOfLines={4}>
        {alamat}
      </Text>
    </TouchableOpacity>
  );
};

export default CardPilihProject;

const styles = StyleSheet.create({
  CardPilihProject: {
    backgroundColor: 'transparent',
    borderColor: Color.green,
    borderWidth: 2,
    width: wp('70%'),
    minHeight: hp('15%'),
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontFamily: text.semiBold,
    fontSize: 14,
    color: Color.green,
    paddingVertical: 10,
    textTransform: 'uppercase',
    width: wp('60%'),
    textAlign: 'center',
  },
  TextDeskripsi: {
    fontFamily: text.light,
    fontSize: 14,
    marginBottom: 20,
    color: Color.black,
    paddingHorizontal: 20,
  },
});
