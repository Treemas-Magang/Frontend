/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {text} from '../../utils/text';
const SkeletonDataPribadi = ({stylePP, styleDataPribadi}) => {
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
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        styleDataPribadi,
      ]}>
      <View style={{gap: 10}}>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={[styles.textNama]}></Text>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={[styles.textNik]}></Text>
        </Animated.View>
      </View>
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
  );
};

export default SkeletonDataPribadi;

const styles = StyleSheet.create({
  textNama: {
    fontFamily: text.semiBold,
    color: Color.blue,
    textTransform: 'uppercase',
    width: 200,
    fontSize: wp('4.5%'),
    backgroundColor: Color.skeleton,
    borderRadius: 5,
  },
  textNik: {
    fontFamily: text.regular,
    color: Color.blue,
    fontSize: wp('4.5%'),
    backgroundColor: Color.skeleton,
    borderRadius: 5,
  },
});
