/* eslint-disable prettier/prettier */
import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import PilihAbsenProject from '../../components/organisms/PilihAbsenProject';
import ButtonBack from '../../components/atoms/ButtonBack';
import ButtonHome from '../../components/atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasBesar from '../../components/atoms/VectorAtasBesar';
const ScreenPilihAbsenProject = ({navigation}) => {
  return (
    <View style={styles.BackgroundPilihProject}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <Image
        style={styles.VectorAtasKanan}
        resizeMode="contain"
        source={require('../../assets/vector/VectorKananAtas.png')}
      />
      <PilihAbsenProject navigation={navigation} />
      <VectorAtasBesar />
    </View>
  );
};

export default ScreenPilihAbsenProject;

const styles = StyleSheet.create({
  BackgroundPilihProject: {
    backgroundColor: Color.green,
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  VectorBawah: {
    position: 'absolute',
    bottom: -80,
    left: 0,
    zIndex: -1,
    width: wp('100%'),
  },
  VectorAtasKanan: {
    position: 'absolute',
    width: wp('30%'),
    top: hp('0%'),
    right: hp('-1%'),
    zIndex: -1,
  },
});
