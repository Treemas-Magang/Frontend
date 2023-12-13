import {StyleSheet} from 'react-native';
import React from 'react';
import DetailProfile from '../../components/organisms/DetailProfile';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ScreenDetailProfile = ({navigation}) => {
  return <DetailProfile navigation={navigation} stylePP={styles.ukuranPP} />;
};

export default ScreenDetailProfile;

const styles = StyleSheet.create({
  ukuranPP: {
    width: wp('25%'),
    height: hp('12.5%'),
  },
});
