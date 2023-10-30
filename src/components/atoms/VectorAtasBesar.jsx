import {StyleSheet, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const VectorAtasBesar = () => {
  return (
    <Image
      style={styles.VectorAtasBesar}
      resizeMode="contain"
      source={require('../../assets/vector/VectorKananAtas.png')}
    />
  );
};

export default VectorAtasBesar;

const styles = StyleSheet.create({
  VectorAtasBesar: {
    position: 'absolute',
    top: hp('0%'),
    right: wp('0%'),
    zIndex: -1,
  },
});
