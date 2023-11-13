/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect} from 'react';
import {Color} from '../../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const SkeletonCardPilihProject = () => {
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
      <View style={styles.CardPilihProject}>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.Text}></Text>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.TextDeskripsi} numberOfLines={4}></Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default SkeletonCardPilihProject;

const styles = StyleSheet.create({
  CardPilihProject: {
    backgroundColor: Color.grey,
    width: wp('70%'),
    minHeight: hp('15%'),
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    width: wp('60%'),
    backgroundColor: Color.skeleton,
    borderRadius: 5,
  },
  TextDeskripsi: {
    backgroundColor: Color.skeleton,
    width: wp('60%'),
    height: 50,
    marginTop: 5,
    borderRadius: 5,
  },
});
