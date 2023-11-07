/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SkeletonCardReimburse = () => {
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
    <View style={styles.CardReimburse}>
      <View
        style={{
          width: '100%',
          paddingLeft: 20,
        }}>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text
            style={{
              backgroundColor: Color.skeleton,
              width: 150,
              borderRadius: 5,
            }}></Text>
        </Animated.View>
      </View>
      <View style={styles.CardDalemReimburseStyle}>
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: hp('1.3%'),
            color: Color.black,
            paddingTop: 10,
          }}>
          TOTAL JAM (jam)
        </Text>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.shimmerTextBold}></Text>
        </Animated.View>
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: hp('1.3%'),
            color: Color.black,
          }}>
          OVERTIME (jam)
        </Text>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.shimmerTextBold}></Text>
        </Animated.View>
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: hp('1.3%'),
            color: Color.black,
          }}>
          Transport
        </Text>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.shimmerTextBold}></Text>
        </Animated.View>
        <Text
          style={{
            fontFamily: text.lightItalic,
            fontSize: hp('1.3%'),
            color: Color.black,
          }}>
          Uang Makan
        </Text>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.shimmerTextBold}></Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardReimburse: {
    backgroundColor: Color.grey,
    width: 320,
    height: 240,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardDalemReimburseStyle: {
    backgroundColor: Color.lightgrey,
    width: 280,
    height: 179,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  shimmerTextBold: {
    fontFamily: text.semiBold,
    fontSize: 12,
    backgroundColor: Color.skeleton,
    width: 224,
    height: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default SkeletonCardReimburse;
