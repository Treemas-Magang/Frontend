/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const SkeletonCardTimesheet = () => {
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
    <View style={styles.CardTimesheet}>
      <View
        style={{
          width: '100%',
          paddingLeft: 30,
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
      <View style={styles.CardDalemTimesheetStyle}>
        <Text style={{fontFamily: text.lightItalic, fontSize: 12}}>
          Penempatan
        </Text>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.shimmerText}></Text>
        </Animated.View>
        <View style={{marginVertical: 5}}></View>
        <Text style={{fontFamily: text.lightItalic, fontSize: 12}}>Lokasi</Text>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.shimmerTextBold}></Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardTimesheet: {
    backgroundColor: Color.grey,
    width: 320,
    height: 204,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardDalemTimesheetStyle: {
    backgroundColor: Color.lightgrey,
    width: 260,
    height: 149,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  shimmerText: {
    fontFamily: text.lightItalic,
    fontSize: 12,
    backgroundColor: Color.skeleton,
    width: 200,
    height: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  shimmerTextBold: {
    fontFamily: text.semiBold,
    fontSize: 12,
    backgroundColor: Color.skeleton,
    width: 224,
    height: 50,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default SkeletonCardTimesheet;
