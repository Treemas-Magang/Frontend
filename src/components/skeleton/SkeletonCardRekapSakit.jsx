/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';

const SkeletonCardRekapSakit = () => {
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
      <View style={styles.cardRekapSakit}>
        <View style={styles.cardData}>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Dari tanggal</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.labelDeskripsi}></Text>
            </Animated.View>
          </View>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Sampai tanggal</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.labelDeskripsi}></Text>
            </Animated.View>
          </View>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Kembali Kerja</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.labelDeskripsi}></Text>
            </Animated.View>
          </View>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Jumlah Hari</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.labelDeskripsi}></Text>
            </Animated.View>
          </View>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Keterangan</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.labelDeskripsi}></Text>
            </Animated.View>
          </View>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Disetujui Oleh</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.labelDeskripsi}></Text>
            </Animated.View>
          </View>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Catatan Disetujui</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.labelDeskripsi}></Text>
            </Animated.View>
          </View>
        </View>
        <View style={styles.status}>
          <FontAwesomeIcon icon={faImage} size={50} color={Color.white} />
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.statusText}></Text>
          </Animated.View>
        </View>
      </View>
    </Animated.View>
  );
};

export default SkeletonCardRekapSakit;

const styles = StyleSheet.create({
  cardRekapSakit: {
    backgroundColor: Color.grey,
    width: 280,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  cardData: {
    paddingHorizontal: 10,
    height: 148,
    backgroundColor: Color.lightgrey,
    justifyContent: 'center',
    borderRadius: 5,
    gap: 2,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  statusText: {
    backgroundColor: Color.skeleton,
    width: 180,
    height: 40,
    borderRadius: 5,
  },
  data: {
    flexDirection: 'row',
    gap: 10,
  },
  lebelData: {
    width: 110,
  },
  labelDeskripsi: {
    backgroundColor: Color.skeleton,
    width: 100,
    borderRadius: 5,
  },
});
