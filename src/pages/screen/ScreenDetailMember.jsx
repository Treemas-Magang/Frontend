import {StyleSheet} from 'react-native';
import React from 'react';
import DetailMember from '../../components/organisms/DetailMember';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ScreenDetailMember = ({navigation}) => {
  return <DetailMember navigation={navigation} stylePP={styles.ukuranPP} />;
};

export default ScreenDetailMember;
const styles = StyleSheet.create({
  ukuranPP: {
    width: wp('25%'),
    height: hp('12.5%'),
  },
});
