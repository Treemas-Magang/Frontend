/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Color } from '../../utils/color';
import { text } from '../../utils/text';
import { formatToCurrency } from '../../utils/formatToCurrency';

const CardReimburse = ({
  navigation,
  tanggal,
  totalJam,
  overtime,
  transport,
  uangMakan,
}) => {
  const moveTo = (tujuan) => {
    navigation.navigate(tujuan);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.CardReimburseStyle}
        onPress={() => moveTo('detailReimburse')}
      >
        <View
          style={{
            width: '100%',
            paddingLeft: 20,
          }}
        >
          <Text
            style={{
              fontFamily: text.semiBold,
              marginHorizontal: 15,
              color: Color.black,
              paddingTop: 10,
              textTransform: 'uppercase',
            }}
          >
            {tanggal}
          </Text>
        </View>
        <View style={styles.CardDalemReimburseStyle}>
          <Text
            style={{
              fontFamily: text.lightItalic,
              fontSize: 12,
              paddingTop: 10,
            }}
          >
            TOTAL JAM (jam)
          </Text>
          <Text style={{ fontFamily: text.semiBold , fontSize: 12 }}>
            {totalJam}
          </Text>
          <Text
            style={{
              fontFamily: text.lightItalic,
              fontSize: 12,
            }}
          >
            OVERTIME (jam)
          </Text>
          <Text style={{ fontFamily: text.semiBold, fontSize: 12 }}>
            {overtime}
          </Text>
          <Text
            style={{
              fontFamily: text.lightItalic,
              fontSize: 12,
            }}
          >
            Transport
          </Text>
          <Text style={{ fontFamily: text.semiBold, fontSize: 12 }}>
            {formatToCurrency(transport)}
          </Text>
          <Text
            style={{
              fontFamily: text.lightItalic,
              fontSize: 12,
            }}
          >
            Uang Makan
          </Text>
          <Text style={{ fontFamily: text.semiBold, fontSize: 12 }}>
            {formatToCurrency(uangMakan)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardReimburse;

const styles = StyleSheet.create({
  CardReimburseStyle: {
    backgroundColor: Color.green,
    width: 320,
    height: 250,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardDalemReimburseStyle: {
    backgroundColor: Color.white,
    width: 260,
    height: 180,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

