import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const CardCekCuti = ({nik, nama}) => {
  return (
    <View style={styles.CardCekCutiStyle}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: text.regular,
            fontSize: 12,
            width: 70,
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
            width: 70,
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
    </View>
  );
};

export default CardCekCuti;

const styles = StyleSheet.create({
  CardCekCutiStyle: {
    backgroundColor: Color.green,
    width: 320,
    height: 80,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
