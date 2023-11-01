import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import ButtonBack from '../../components/atoms/ButtonBack';
import ButtonHome from '../../components/atoms/ButtonHome';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasKecil from '../../components/atoms/VectorAtasKecil';

const ScreenPreviewPhoto = ({navigation}) => {
  return (
    <View
      style={{
        backgroundColor: Color.green,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View
        style={{
          width: wp('100%'),
          height: hp('15%'),
          justifyContent: 'center',
        }}>
        <Text style={styles.Judul}>Priview Photo</Text>
      </View>
      <View style={styles.SectionPreview}></View>
    </View>
  );
};

export default ScreenPreviewPhoto;

const styles = StyleSheet.create({
  SectionPreview: {
    height: hp('75%'),
    width: wp('90%'),
    borderWidth: 2,
    borderColor: Color.black,
    backgroundColor: 'tomato',
  },

  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
});
