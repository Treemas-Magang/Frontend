/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  const {judul, deskripsi, usrCrt, image, id} = useRoute().params;
  const base64 = `data:image/jpeg;base64,${image}`;
  const moveToPreview = () => {
    navigation.navigate('previewPhoto', {photo: base64});
  };

  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack navigation={navigation} />
      {/* <ButtonBackBaru navigation={navigation} tujuan={'notifPengumuman'} /> */}
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
              width: 350,
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
          {/* ////////////////////////////////////// */}
          {image !== null ? (
            <>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    height: 2,
                    flex: 1,
                    backgroundColor: Color.green,
                    alignSelf: 'center',
                  }}></View>
                <Text
                  style={{
                    fontFamily: text.semiBoldItalic,
                    fontSize: 12,
                    color: Color.green,
                    textTransform: 'uppercase',
                    marginHorizontal: 10,
                  }}>
                  Lampiran
                </Text>
                <View
                  style={{
                    height: 2,
                    flex: 1,
                    backgroundColor: Color.green,
                    alignSelf: 'center',
                  }}></View>
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={moveToPreview}>
                  <Image
                    resizeMode="contain"
                    source={{uri: `data:image/jpeg;base64,${image}`}}
                    style={{
                      width: wp('80%'),
                      height: hp('30%'),
                      borderRadius: 5,
                      borderWidth: 4,
                      borderColor: Color.green,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    height: 2,
                    flex: 1,
                    backgroundColor: Color.green,
                    alignSelf: 'center',
                    marginTop: 10,
                  }}></View>
              </View>
            </>
          ) : (
            ''
          )}

          {/* ///////////////////////////////// */}
          <View
            style={{
              width: '100%',
              height: '50%',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Image
              source={require('../../assets/icons/logo.png')}
              resizeMode="contain"
            />
          </View>
        </ScrollView>
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
  buttonUpdate: {
    width: wp('80%'),
    maxHeight: hp('10%'),
    alignItems: 'center',
  },
});
