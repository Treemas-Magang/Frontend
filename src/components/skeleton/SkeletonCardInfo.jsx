/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SkeletonCardInfo = () => {
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
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View style={styles.card}>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.textInfo}></Text>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default SkeletonCardInfo;
const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    alignItems: 'center',
  },
  card: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('6.6%'),
    width: wp('17%'),
    backgroundColor: Color.grey,
  },
  textInfo: {
    backgroundColor: Color.skeleton,
    width: 35,
    height: 30,
    borderRadius: 5,
  },
});
