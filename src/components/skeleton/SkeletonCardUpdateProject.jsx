/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import {Color} from '../../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const SkeletonCardUpdateProject = () => {
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
    <View style={{flexDirection: 'column'}}>
      <Animated.View style={{opacity: getShimmerOpacity()}}>
        <View style={styles.cardUpdate}>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <View
              style={{
                backgroundColor: Color.skeleton,
                width: 50,
                height: 50,
                marginLeft: 20,
                borderRadius: 5,
              }}></View>
          </Animated.View>
          <View style={{width: wp('45%'), gap: 5}}>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text
                style={{
                  backgroundColor: Color.skeleton,
                  borderRadius: 5,
                }}></Text>
            </Animated.View>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text
                style={{
                  backgroundColor: Color.skeleton,
                  paddingTop: 5,
                  height: 40,
                  borderRadius: 5,
                }}
                numberOfLines={3}></Text>
            </Animated.View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardUpdate: {
    backgroundColor: Color.grey,
    height: hp('13%'),
    width: wp('75%'),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 10,
  },
});

export default SkeletonCardUpdateProject;
