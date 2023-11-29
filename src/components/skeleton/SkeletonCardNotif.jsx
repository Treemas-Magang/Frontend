/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const SkeletonCardNotif = () => {
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
    <View style={styles.CardNotifStyle}>
      <Animated.View
        style={[styles.shimmerCard, {opacity: getShimmerOpacity()}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.shimmerBox} />
          <View style={{gap: 5, marginLeft: 10}}>
            <Text style={styles.shimmerText}></Text>
            <Text style={styles.shimmerText}></Text>
            <Text style={styles.shimmerText}></Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardNotifStyle: {
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
  shimmerBox: {
    width: 60,
    height: 60,
    backgroundColor: Color.skeleton,
    marginLeft: 20,
  },
  shimmerText: {
    fontFamily: text.lightItalic,
    fontSize: 10,
    backgroundColor: Color.skeleton,
    width: 200,
    height: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default SkeletonCardNotif;
