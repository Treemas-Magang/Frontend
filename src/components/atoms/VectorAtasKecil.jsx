import {StyleSheet, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const VectorAtasKecil = () => {
  return (
    <Image
      style={styles.VectorAtasKecil}
      resizeMode="contain"
      source={require('../../assets/vector/VectorAtas.png')}
    />
  );
};

export default VectorAtasKecil;

const styles = StyleSheet.create({
  VectorAtasKecil: {
    position: 'absolute',
    top: hp('0%'),
    right: wp('0%'),
    zIndex: -1,
  },
});
