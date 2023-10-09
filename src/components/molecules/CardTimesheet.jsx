/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const CardTimesheet = ({navigation, tanggal, penempatan, lokasi}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.CardTimesheetStyle}
        onPress={() => moveTo('detailTimesheet')}>
        <View
          style={{
            width: '100%',
            paddingLeft: 20,
          }}>
          <Text
            style={{
              fontFamily: text.semiBold,
              marginHorizontal: 15,
              color: Color.black,
              paddingTop: 10,
            }}>
            {tanggal}
          </Text>
        </View>
        <View style={styles.CardDalemTimesheetStyle}>
          <Text style={{fontFamily: 'Poppins-LightItalic', fontSize: 12}}>
            Penempatan
          </Text>
          <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 12}}>
            {penempatan}
          </Text>
          <View style={{marginVertical: 5}}></View>
          <Text style={{fontFamily: 'Poppins-LightItalic', fontSize: 12}}>
            Lokasi
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 12,
              width: 224,
              textAlign: 'justify',
              color: Color.brown,
            }}>
            {lokasi}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardTimesheet;

const styles = StyleSheet.create({
  CardTimesheetStyle: {
    backgroundColor: Color.green,
    width: 320,
    height: 204,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardDalemTimesheetStyle: {
    backgroundColor: Color.white,
    width: 260,
    height: 149,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
