import {StyleSheet} from 'react-native';
import React from 'react';
import DetailApproval from '../../components/organisms/DetailApproval';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ScreenDetailApproval = ({navigation}) => {
  return <DetailApproval navigation={navigation} stylePP={styles.ukuranPP} />;
};

export default ScreenDetailApproval;

const styles = StyleSheet.create({
  ukuranPP: {
    width: wp('25%'),
    height: hp('12.5%'),
  },
});
