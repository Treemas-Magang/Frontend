/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable semi */
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const SkeletonCardAbsen = () => {
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
    <View style={styles.card}>
      <Animated.View style={{opacity: getShimmerOpacity()}}>
        <Text style={styles.judul}></Text>
      </Animated.View>
      <View style={styles.wrapper}>
        <View style={styles.wrap}>
          <Text style={styles.labelJam}>Jam Masuk</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.jam}></Text>
          </Animated.View>
          <Text style={styles.labelLokasi}>Lokasi Masuk</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.alamat} numberOfLines={5}></Text>
          </Animated.View>
        </View>
        <View style={styles.wrap}>
          <Text style={styles.labelJam}>Jam Pulang</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.jam}></Text>
          </Animated.View>
          <Text style={styles.labelLokasi}>Lokasi Pulang</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.alamat} numberOfLines={5}></Text>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default SkeletonCardAbsen;

const styles = StyleSheet.create({
  card: {
    width: 320,
    paddingVertical: 20,
    borderRadius: 5,
    backgroundColor: Color.grey,
  },
  wrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    backgroundColor: Color.white,
    width: 148,
    paddingVertical: 10,
    borderRadius: 5,
    padding: 5,
    backgroundColor: Color.lightgrey,
  },
  judul: {
    width: 150,
    marginLeft: 6,
    marginBottom: 7,
    backgroundColor: Color.skeleton,
    borderRadius: 5,
  },
  labelJam: {
    fontFamily: text.lightItalic,
    fontSize: 12,
    color: Color.black,
  },
  jam: {
    fontFamily: text.semiBold,
    fontSize: 12,
    color: Color.black,
    backgroundColor: Color.skeleton,
    borderRadius: 5,
  },
  labelLokasi: {
    fontFamily: text.lightItalic,
    fontSize: 12,
    color: Color.black,
  },
  alamat: {
    fontFamily: text.light,
    fontSize: 12,
    textAlign: 'justify',
    backgroundColor: Color.skeleton,
    height: 50,
    borderRadius: 5,
  },
});
