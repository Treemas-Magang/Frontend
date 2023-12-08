/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const CardApproval = ({navigation, nik, nama, tgl}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <TouchableOpacity onPress={() => moveTo('detailApproval')} style={styles.CardApprovalStyle}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: text.regular,
            fontSize: 12,
            width: 80,
          }}>
          NIK
        </Text>
        <Text
          style={{fontFamily: text.semiBold, fontSize: 12, color: Color.black}}>
          {nik}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: text.regular,
            fontSize: 12,
            width: 80,
          }}>
          NAMA
        </Text>
        <Text
          style={{
            fontFamily: text.semiBold,
            fontSize: 12,
            color: Color.black,
          }}>
          {nama}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: text.regular,
            fontSize: 12,
            width: 80,
          }}>
          Tanggal
        </Text>
        <Text
          style={{
            fontFamily: text.semiBold,
            fontSize: 12,
            color: Color.black,
          }}>
          {tgl}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardApproval;

const styles = StyleSheet.create({
  CardApprovalStyle: {
    backgroundColor: Color.green,
    width: '100%',
    height: 80,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
