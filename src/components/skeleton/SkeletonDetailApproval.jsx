/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasKecil from '../atoms/VectorAtasKecil';

const SkeletonDetailApproval = ({navigation}) => {
  const shimmer = new Animated.Value(0);

  useEffect(() => {
    shimmerAnimation();
  });

  const shimmerAnimation = () => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ).start();
  };

  const getShimmerOpacity = () => {
    const inputRange = [0, 0.5, 1];
    const outputRange = [0.5, 1, 0.5]; // Adjust opacity values as needed
    return shimmer.interpolate({
      inputRange,
      outputRange,
    });
  };

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
        <Text style={styles.Judul}>Detail</Text>
        <Text style={styles.Judul}>Approval</Text>
      </View>
      <View style={styles.backgroundDetailApproval}>
        <View style={{alignItems: 'center'}}>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                backgroundColor: Color.skeleton,
              }}></View>
          </Animated.View>
        </View>
        <View>
          <Text style={styles.TextTitle}>Nik</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.TextDeskripsi}></Text>
          </Animated.View>
        </View>
        <View>
          <Text style={styles.TextTitle}>Nama</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.TextDeskripsi}></Text>
          </Animated.View>
        </View>
        <View>
          <Text style={styles.TextTitle}>Project</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.TextDeskripsi}></Text>
          </Animated.View>
        </View>
        <View>
          <Text style={styles.TextTitle}>Jam Masuk</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.TextDeskripsi}></Text>
          </Animated.View>
        </View>
        <View>
          <Text style={styles.TextTitle}>Lokasi Masuk</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text
              style={{
                textAlign: 'justify',
                width: 300,
                height: 90,
                backgroundColor: Color.skeleton,
                borderRadius: 5,
              }}></Text>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default SkeletonDetailApproval;

const styles = StyleSheet.create({
  backgroundDetailApproval: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    // marginTop: -50,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('10%'),
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  TextTitle: {
    fontFamily: text.semiBoldItalic,
    color: Color.black,
    textTransform: 'uppercase',
    marginVertical: 2,
  },
  TextDeskripsi: {
    backgroundColor: Color.skeleton,
    borderRadius: 5,
    width: 300,
    marginVertical: 2,
  },
  Text: {
    fontFamily: text.semiBold,
    fontSize: 16,
    color: Color.red,
  },
});
