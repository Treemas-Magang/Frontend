import {StyleSheet} from 'react-native';
import React from 'react';
import DetailMemberCuti from '../../components/organisms/DetailMemberCuti';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ScreenDetailMemberCuti = ({navigation}) => {
  return <DetailMemberCuti navigation={navigation} stylePP={styles.ukuranPP} />;
};

export default ScreenDetailMemberCuti;
const styles = StyleSheet.create({
  ukuranPP: {
    width: wp('25%'),
    height: hp('12.5%'),
  },
});
