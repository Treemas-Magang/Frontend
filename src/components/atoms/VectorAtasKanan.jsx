import {StyleSheet, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const VectorAtasKanan = () => {
  return (
    <Image
      style={styles.VectorAtasKanan}
      resizeMode="contain"
      source={require('../../assets/vector/VectorKananAtas.png')}
    />
  );
};

export default VectorAtasKanan;

const styles = StyleSheet.create({
  VectorAtasKanan: {
    position: 'absolute',
    top: hp('0%'),
    right: wp('0%'),
    zIndex: -1,
  },
});
