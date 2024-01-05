/* eslint-disable prettier/prettier */
import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import CardUpdateTimesheet from '../molecules/CardUpdateTimesheet';
import {Color} from '../../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';

const FormUpdateTimesheet = ({navigation}) => {
  return (
    <View style={styles.BackgroundUpdateTimesheet}>
      <View style={styles.SectionAtas}>
        <ButtonBack styleColor={Color.green} navigation={navigation} />
        <ButtonHome navigation={navigation} />
        <Image
          style={styles.VectorAtasKebalik}
          source={require('../../assets/vector/VectorAtasKebalik.png')}
        />
      </View>
      <View style={styles.SectionTengah}>
        <CardUpdateTimesheet />
      </View>
      <View style={styles.SectionBawah}>
        <Image
          style={styles.VectorBawah}
          source={require('../../assets/vector/VectorBawah.png')}
        />
      </View>
    </View>
  );
};

export default FormUpdateTimesheet;

const styles = StyleSheet.create({
  BackgroundUpdateTimesheet: {
    backgroundColor: Color.green,
    flex: 1,
  },
  SectionAtas: {
    height: hp('10%'),
    position: 'relative',
  },
  SectionTengah: {
    height: hp('70%'),
  },
  SectionBawah: {
    height: hp('20%'),
    position: 'relative',
  },
  VectorBawah: {
    position: 'absolute',
    bottom: -80,
    zIndex: -1,
    width: wp('100%'),
  },
  VectorAtasKebalik: {
    position: 'absolute',
    top: 0,
    zIndex: -1,
    width: wp('100%'),
  },
});
