/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const SkeletonCardApproval = ({navigation}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
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
      <View style={styles.CardApprovalStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textTittle}>NIK</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.textDeskripsi}></Text>
          </Animated.View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textTittle}>NAMA</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.textDeskripsi}></Text>
          </Animated.View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textTittle}>Tanggal</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.textDeskripsi}></Text>
          </Animated.View>
        </View>
      </View>
    </Animated.View>
  );
};

export default SkeletonCardApproval;

const styles = StyleSheet.create({
  CardApprovalStyle: {
    backgroundColor: Color.grey,
    width: '100%',
    height: 80,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 3,
  },
  textTittle: {
    fontFamily: text.regular,
    fontSize: 12,
    width: 80,
  },
  textDeskripsi: {
    backgroundColor: Color.skeleton,
    width: 150,
    borderRadius: 5,
  },
});
