import React from 'react';
import DetailMemberSakit from '../../components/organisms/DetailMemberSakit';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ScreenDetailMemberSakit = ({navigation}) => {
  return (
    <DetailMemberSakit navigation={navigation} stylePP={styles.ukuranPP} />
  );
};

export default ScreenDetailMemberSakit;
const styles = StyleSheet.create({
  ukuranPP: {
    width: wp('25%'),
    height: hp('12.5%'),
  },
});
