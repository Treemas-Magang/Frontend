/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasKecil from '../atoms/VectorAtasKecil';

const SkeletonDetailApproval = ({navigation}) => {
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
    <View style={styles.backgroundDetailApproval}>
      <View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextTitle}></Text>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextDeskripsi}></Text>
        </Animated.View>
      </View>
      <View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextTitle}></Text>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextDeskripsi}></Text>
        </Animated.View>
      </View>
      <View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextTitle}></Text>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextDeskripsi}></Text>
        </Animated.View>
      </View>
      <View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextTitle}></Text>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextDeskripsi}></Text>
        </Animated.View>
      </View>
      <View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextTitle}></Text>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextDeskripsi}></Text>
        </Animated.View>
      </View>
      <View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextTitle}></Text>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextDeskripsi}></Text>
        </Animated.View>
      </View>
      <View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextTitle}></Text>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextDeskripsi}></Text>
        </Animated.View>
      </View>
      <View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextTitle}></Text>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextDeskripsi}></Text>
        </Animated.View>
      </View>
      <View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextTitle}></Text>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextDeskripsi}></Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default SkeletonDetailApproval;

const styles = StyleSheet.create({
  backgroundDetailApproval: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    // marginTop: -50,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('10%'),
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  TextTitle: {
    backgroundColor: Color.skeleton,
    borderRadius: 5,
    width: 100,
    marginVertical: 4,
  },
  TextDeskripsi: {
    backgroundColor: Color.skeleton,
    borderRadius: 5,
    width: 300,
    marginVertical: 4,
  },
  Text: {
    fontFamily: text.semiBold,
    fontSize: 16,
    color: Color.red,
  },
});
