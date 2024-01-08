/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const CardReimburse = ({
  navigation,
  tanggal,
  totalJam,
  overtime,
  transport,
  uangMakan,
  sakit,
  cuti,
  jamMsk,
  onPress,
}) => {
  let background = styles.cardBackground;
  if (jamMsk !== '-') {
    background = styles.cardHadir;
  } else if (sakit !== null || cuti !== null) {
    background = styles.cardCuti;
  } else if (jamMsk === '-') {
    background = styles.cardTidakMasuk;
  }
  return (
    <TouchableOpacity
      style={[styles.CardReimburseStyle, background]}
      // style={styles.CardReimburseStyle}
      onPress={onPress}>
      <View
        style={{
          width: wp('80%'),
          paddingLeft: wp('5%'),
        }}>
        <Text
          style={{
            fontFamily: text.semiBold,
            color: Color.black,
            paddingBottom: hp('1%'),
            textTransform: 'uppercase',
          }}>
          {tanggal}
        </Text>
      </View>
      <View style={styles.CardDalemReimburseStyle}>
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: hp('1.2%'),
          }}>
          TOTAL JAM (jam)
        </Text>
        <Text style={{fontFamily: text.semiBold, fontSize: 12}}>
          {totalJam}
        </Text>
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: hp('1.2%'),
          }}>
          OVERTIME (jam)
        </Text>
        <Text style={{fontFamily: text.semiBold, fontSize: 12}}>
          {overtime}
        </Text>
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: hp('1.2%'),
          }}>
          Transport
        </Text>
        <Text style={{fontFamily: text.semiBold, fontSize: 12}}>
          {formatToCurrency(transport ? transport : 0)}
        </Text>
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: hp('1.2%'),
          }}>
          Uang Makan
        </Text>
        <Text style={{fontFamily: text.semiBold, fontSize: 12}}>
          {formatToCurrency(uangMakan ? uangMakan : 0)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardReimburse;

const styles = StyleSheet.create({
  CardReimburseStyle: {
    backgroundColor: Color.green,
    width: wp('80%'),
    Height: hp('28%'),
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    paddingVertical: 20,
    alignItems: 'center',
  },
  CardDalemReimburseStyle: {
    backgroundColor: Color.white,
    width: wp('70%'),
    minHeight: hp('20%'),
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardBackground: {
    backgroundColor: Color.green,
  },
  cardHadir: {
    backgroundColor: Color.green,
  },
  cardSakit: {
    backgroundColor: Color.red,
  },
  cardTidakMasuk: {
    backgroundColor: Color.grey,
  },
});
