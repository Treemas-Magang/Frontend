/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const SkeletonCardMember = () => {
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
    <Animated.View style={{opacity: getShimmerOpacity()}}>
      <View style={styles.cardMember}>
        <View style={styles.dataMember}>
          <View style={styles.wrapData}>
            <Text style={styles.labelData}>Jam Masuk</Text>
            <Text style={styles.titikDua}>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.data}></Text>
            </Animated.View>
          </View>
          <View style={styles.wrapData}>
            <Text style={styles.labelData}>Jam Pulang</Text>
            <Text style={styles.titikDua}>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.data}></Text>
            </Animated.View>
          </View>
        </View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.nama}></Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default SkeletonCardMember;

const styles = StyleSheet.create({
  cardMember: {
    width: 280,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Color.grey,
  },
  dataMember: {
    width: 255,
    backgroundColor: Color.lightgrey,
  },
  wrapData: {
    flexDirection: 'row',
    padding: 10,
  },
  labelData: {
    width: 100,
    fontFamily: text.semiBold,
    fontSize: 12,
    color: Color.black,
  },
  data: {
    marginLeft: 10,
    backgroundColor: Color.skeleton,
    width: 100,
    borderRadius: 5,
  },
  titikDua: {
    fontFamily: text.semiBold,
    fontSize: 12,
    color: Color.black,
  },
  nama: {
    backgroundColor: Color.skeleton,
    width: 200,
    height: 40,
    borderRadius: 5,
    marginTop: 10,
  },
});
