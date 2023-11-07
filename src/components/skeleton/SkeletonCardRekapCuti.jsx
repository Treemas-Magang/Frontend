/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SkeeltonCardRekapCuti = () => {
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
      <View style={styles.cardRekapCuti}>
        <View style={styles.status}>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.statusTextTitle}></Text>
          </Animated.View>
        </View>
        <View style={styles.cardData}>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Dari tanggal</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Animated.View style={{opacity: getShimmerOpacity()}}>
                <Text style={styles.textData}></Text>
              </Animated.View>
            </Animated.View>
          </View>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Sampai tanggal</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.textData}></Text>
            </Animated.View>
          </View>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Tanggal Masuk</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.textData}></Text>
            </Animated.View>
          </View>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Jumlah Hari</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.textData}></Text>
            </Animated.View>
          </View>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Jumlah Cuti Bersama</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.textData}></Text>
            </Animated.View>
          </View>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Jumlah Cuti Khusus</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.textData}></Text>
            </Animated.View>
          </View>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Keterangan</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.textData}></Text>
            </Animated.View>
          </View>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Catatan Diseteujui</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.textData}></Text>
            </Animated.View>
          </View>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Tanggal Disetujui</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.textData}></Text>
            </Animated.View>
          </View>
          <View style={styles.data}>
            <Text style={styles.lebelData}>Disetujui Oleh</Text>
            <Text>:</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.textData}></Text>
            </Animated.View>
          </View>
        </View>
        <View style={styles.status}>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.statusText}></Text>
          </Animated.View>
        </View>
      </View>
    </Animated.View>
  );
};

export default SkeeltonCardRekapCuti;

const styles = StyleSheet.create({
  cardRekapCuti: {
    backgroundColor: Color.grey,
    width: wp('92%'),
    height: hp('55%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  cardData: {
    paddingHorizontal: 25,
    height: hp('40%'),
    width: wp('80%'),
    backgroundColor: Color.lightgrey,
    justifyContent: 'center',
    borderRadius: 5,
    gap: 5,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  statusText: {
    backgroundColor: Color.skeleton,
    borderRadius: 5,
    width: 230,
    height: 40,
  },
  statusTextTitle: {
    backgroundColor: Color.skeleton,
    marginBottom: 7,
    borderRadius: 5,
    width: 150,
  },
  data: {
    flexDirection: 'row',
    gap: 10,
  },
  lebelData: {
    width: 140,
    fontSize: hp('2%'),
  },
  textData: {
    width: wp('28%'),
    backgroundColor: Color.skeleton,
    borderRadius: 5,
  },
});
