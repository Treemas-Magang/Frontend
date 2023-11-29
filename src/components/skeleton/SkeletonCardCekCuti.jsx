/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const SkeletonCardCekCuti = () => {
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
    <View style={styles.CardCekCutiStyle}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{gap: 5, marginLeft: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{width: 70}}>NIK</Text>
            <Animated.View
              style={[styles.shimmerCard, {opacity: getShimmerOpacity()}]}>
              <Text style={styles.shimmerText}></Text>
            </Animated.View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{width: 70}}>Nama</Text>
            <Animated.View
              style={[styles.shimmerCard, {opacity: getShimmerOpacity()}]}>
              <Text style={styles.shimmerText}></Text>
            </Animated.View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardCekCutiStyle: {
    width: 320,
    height: 80,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    backgroundColor: Color.grey,
  },
  shimmerCard: {
    width: '100',
    height: '100',
    backgroundColor: Color.grey,
  },
  shimmerText: {
    fontFamily: text.lightItalic,
    fontSize: 10,
    backgroundColor: Color.skeleton,
    width: 200,
    height: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default SkeletonCardCekCuti;
