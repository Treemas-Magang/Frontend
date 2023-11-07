/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SkeletonCardRekapClaim = () => {
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
    <View style={styles.CardRekapClaimStyle}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text
            style={{
              backgroundColor: Color.skeleton,
              borderRadius: 5,
              width: 150,
              marginBottom: 5,
            }}></Text>
        </Animated.View>
      </View>
      <View style={styles.CardDalemReimburseStyle}>
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: 12,
            paddingTop: 20,
          }}>
          Type
        </Text>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text
            style={{
              backgroundColor: Color.skeleton,
              borderRadius: 5,
              width: 230,
            }}></Text>
        </Animated.View>
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: 12,
          }}>
          Keterangan
        </Text>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text
            style={{
              backgroundColor: Color.skeleton,
              borderRadius: 5,
              width: 230,
            }}></Text>
        </Animated.View>
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: 12,
          }}>
          Nominal
        </Text>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text
            style={{
              backgroundColor: Color.skeleton,
              borderRadius: 5,
              width: 230,
            }}></Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default SkeletonCardRekapClaim;

const styles = StyleSheet.create({
  CardRekapClaimStyle: {
    width: wp('85%'),
    height: hp('35%'),
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.grey,
    borderRadius: 5,
  },
  CardDalemReimburseStyle: {
    width: wp('80%'),
    height: hp('25%'),
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Color.lightgrey,
    borderRadius: 5,
  },
});
