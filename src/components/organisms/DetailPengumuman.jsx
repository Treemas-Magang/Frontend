/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useRoute} from '@react-navigation/native';
import VectorAtasKecil from '../atoms/VectorAtasKecil';

const DetailPengumuman = ({navigation}) => {
  const {judul, deskripsi, usrCrt, image} = useRoute().params;

  console.log(image, '-asu-');
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View
        style={{
          width: wp('100%'),
          height: hp('20%'),
          justifyContent: 'center',
        }}>
        <Text style={styles.Judul}>Detail </Text>
        <Text style={styles.Judul}>Pengumuman </Text>
      </View>
      <View style={styles.backgroundCardPengumuman}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              fontFamily: text.semiBold,
              fontSize: 18,
              textAlign: 'center',
              color: Color.blue,
            }}>
            {judul}
          </Text>
          <Text
            style={{
              fontFamily: text.regular,
              fontSize: 12,
              textAlign: 'justify',
              width: 320,
            }}>
            {deskripsi}
          </Text>
          <Text
            style={{
              fontFamily: text.regular,
              fontSize: 12,
              width: 320,
            }}>
            Regards,
          </Text>
          <Text
            style={{
              fontFamily: text.regular,
              fontSize: 12,
              width: 320,
            }}>
            HR Division
          </Text>
          <Text
            style={{
              fontFamily: text.regular,
              fontSize: 12,
              width: 320,
            }}>
            {usrCrt}
          </Text>
          <View style={{width: wp('100%')}}>
            <Image
              source={{uri: `data:image/jpeg;base64,${image}`}}
              style={{
                width: 200,
                height: 107,
              }}
            />
          </View>
        </ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Image source={require('../../assets/icons/logo.png')} />
        </View>
      </View>
    </View>
  );
};

export default DetailPengumuman;

const styles = StyleSheet.create({
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  backgroundCardPengumuman: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    // marginTop: -50,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('10%'),
  },
  VectorAtas: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
