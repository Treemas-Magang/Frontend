/* eslint-disable prettier/prettier */
import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import ButtonBack from '../../components/atoms/ButtonBack';
import ButtonHome from '../../components/atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasKecil from '../../components/atoms/VectorAtasKecil';
import {useRoute} from '@react-navigation/native';

const ScreenPreviewPhoto = ({navigation}) => {
  const route = useRoute();
  const {photo} = route.params;
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
      <View style={styles.SectionPreview}>
        <Image
          source={{uri: photo}}
          style={{
            height: hp('90%'),
            width: wp('90%'),
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default ScreenPreviewPhoto;

const styles = StyleSheet.create({
  SectionPreview: {
    height: hp('100%'),
    width: wp('100%'),
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: Color.black,
    // backgroundColor: 'tomato',
  },
});
