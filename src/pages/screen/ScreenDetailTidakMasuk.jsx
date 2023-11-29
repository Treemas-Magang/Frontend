import React from 'react';
import DetailMemberTidakMasuk from '../../components/organisms/DetailMemberTidakMasuk';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ScreenDetailMemberTidakMasuk = ({navigation}) => {
  return (
    <DetailMemberTidakMasuk navigation={navigation} stylePP={styles.ukuranPP} />
  );
};

export default ScreenDetailMemberTidakMasuk;
const styles = StyleSheet.create({
  ukuranPP: {
    width: wp('25%'),
    height: hp('12.5%'),
  },
});
