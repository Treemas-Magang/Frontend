import {StyleSheet, Text, View, Easing, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';

const SkeletonCardMemberProject = () => {
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
      <View style={styles.CardMemberProject}>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <Text style={styles.Text}></Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default SkeletonCardMemberProject;

const styles = StyleSheet.create({
  CardMemberProject: {
    backgroundColor: Color.grey,
    width: 280,
    minHeight: 50,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    backgroundColor: Color.skeleton,
    width: 250,
    borderRadius: 5,
  },
});
