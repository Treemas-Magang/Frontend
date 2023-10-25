/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';

const CardRekapClaim = ({
  navigation,
  tanggal,
  type,
  keterangan,
  nominalClaim,
}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };

  return (
    <View style={styles.CardRekapClaimStyle}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: text.semiBold,
            fontSize: 16,
            color: Color.black,
            textTransform: 'uppercase',
          }}>
          {tanggal}
        </Text>
      </View>
      <View style={styles.CardDalemReimburseStyle}>
        <TouchableOpacity 
          style={{
            position: 'absolute',
            zIndex: 2,
            flexDirection: 'row',
            gap: 5,
            right: 5,
          }}>
          <FontAwesomeIcon icon={faImage} color={Color.green} size={40} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: 12,
            paddingTop: 20,
          }}>
          Type
        </Text>
        <Text style={{fontFamily: text.semiBold, fontSize: 12}}>{type}</Text>
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: 12,
          }}>
          Keterangan
        </Text>
        <Text style={{fontFamily: text.semiBold, fontSize: 12}}>
          {keterangan}
        </Text>
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: 12,
          }}>
          Nominal
        </Text>
        <Text style={{fontFamily: text.semiBold, fontSize: 12}}>
          {formatToCurrency(nominalClaim)}
        </Text>
      </View>
    </View>
  );
};

export default CardRekapClaim;

const styles = StyleSheet.create({
  CardRekapClaimStyle: {
    backgroundColor: Color.green,
    width: 350,
    height: 230,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardDalemReimburseStyle: {
    backgroundColor: Color.white,
    width: 290,
    height: 170,
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
});
