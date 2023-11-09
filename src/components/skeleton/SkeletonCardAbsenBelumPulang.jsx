/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const SkeletonCardAbsenBelumPulang = () => {
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
      <View style={styles.CardAbsenBelumPulangStyle}>
        <View
          style={{
            width: '100%',
            paddingLeft: 20,
          }}>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text
              style={{
                backgroundColor: Color.skeleton,
                width: 130,
                borderRadius: 5,
                marginHorizontal: 15,
                paddingTop: 10,
              }}></Text>
          </Animated.View>
        </View>
        <View style={styles.CardDalemTimesheetStyle}>
          <View style={{flexDirection: 'row', gap: 20}}>
            <View>
              <Text style={styles.textTitle}>Jam Masuk</Text>
              <Animated.View style={{opacity: getShimmerOpacity()}}>
                <Text style={styles.textDeskripsi}></Text>
              </Animated.View>
            </View>
            <View>
              <Text style={styles.textTitle}>Project</Text>
              <Animated.View style={{opacity: getShimmerOpacity()}}>
                <Text style={styles.textDeskripsi}></Text>
              </Animated.View>
            </View>
          </View>
          <Text style={styles.textTitle}>Note Telat</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.textDeskripsi}></Text>
          </Animated.View>
          <Text style={styles.textTitle}>Lokasi</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text
              style={{
                backgroundColor: Color.skeleton,
                width: 230,
                height: 70,
                borderRadius: 5,
                textAlign: 'justify',
              }}></Text>
          </Animated.View>
        </View>
      </View>
    </Animated.View>
  );
};

export default SkeletonCardAbsenBelumPulang;

const styles = StyleSheet.create({
  CardAbsenBelumPulangStyle: {
    backgroundColor: Color.grey,
    width: 320,
    height: 250,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardDalemTimesheetStyle: {
    backgroundColor: Color.lightgrey,
    width: 260,
    height: 180,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  textTitle: {
    fontFamily: text.lightItalic,
    fontSize: 12,
  },
  textDeskripsi: {
    backgroundColor: Color.skeleton,
    width: 100,
    borderRadius: 5,
  },
});
