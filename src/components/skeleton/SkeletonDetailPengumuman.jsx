import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SkeletonDetailPengumuman = () => {
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
    <View style={styles.backgroundCardPengumuman}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: 200,
                height: 25,
                borderRadius: 5,
                marginBottom: 20,
                backgroundColor: Color.skeleton,
              }}></View>
          </View>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View>
            <Text style={styles.TextDeskripsi}></Text>
            <Text style={styles.TextDeskripsi}></Text>
            <Text style={styles.TextDeskripsi}></Text>
            <Text style={styles.TextDeskripsi}></Text>
            <Text style={styles.TextDeskripsi}></Text>
          </View>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View>
            <Text style={styles.TextTitle}></Text>
            <Text style={styles.TextTitle2}></Text>
            <Text style={styles.TextDeskripsi1}></Text>
          </View>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View>
            <Text
              style={{
                textAlign: 'justify',
                backgroundColor: Color.skeleton,
                height: 190,
                borderRadius: 5,
                marginTop: 40,
              }}></Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default SkeletonDetailPengumuman;

const styles = StyleSheet.create({
  backgroundCardPengumuman: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('15%'),
  },
  TextTitle: {
    fontFamily: text.semiBoldItalic,
    color: Color.black,
    textTransform: 'uppercase',
    backgroundColor: Color.skeleton,
    borderRadius: 5,
    width: 90,
    marginTop: 20,
  },
  TextTitle2: {
    fontFamily: text.semiBoldItalic,
    color: Color.black,
    textTransform: 'uppercase',
    marginVertical: 7,
    backgroundColor: Color.skeleton,
    borderRadius: 5,
    width: 120,
  },
  TextDeskripsi1: {
    fontFamily: text.light,
    marginVertical: 2,
    borderRadius: 5,
    backgroundColor: Color.skeleton,
    width: 200,
  },
  TextDeskripsi: {
    fontFamily: text.light,
    marginVertical: 2,
    borderRadius: 5,
    backgroundColor: Color.skeleton,
    marginVertical: 5,
  },
});
