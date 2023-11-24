/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import CardPilihAbsenProject from '../molecules/CardPilihAbsenProject';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const PilihAbsenProject = ({navigation}) => {
  return (
    <View style={styles.CardUpdateTimesheet}>
      <Text
        style={{
          fontFamily: text.semiBold,
          textTransform: 'uppercase',
          fontSize: 17,
          color: Color.blue,
        }}>
        MEMILIH LOKASI ABSENSI PROJECT
      </Text>
      <CardPilihAbsenProject
        navigation={navigation}
      />
    </View>
  );
};

export default PilihAbsenProject;
const styles = StyleSheet.create({
  CardUpdateTimesheet: {
    width: wp('85%'),
    height: hp('55%'),
    backgroundColor: Color.white,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
});
