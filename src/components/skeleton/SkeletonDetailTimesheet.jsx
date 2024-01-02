/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SkeletonDetailTimesheet = ({navigation}) => {
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
    <View style={styles.content}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.shimmerTextTittle}>Hari</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.shimmerTextDeskripsi}></Text>
          </Animated.View>
        </View>
        <View>
          <Text style={styles.shimmerTextTittle}>Tanggal</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.shimmerTextDeskripsi}></Text>
          </Animated.View>
        </View>
        <View>
          <Text style={styles.shimmerTextTittle}>Project</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.shimmerTextDeskripsi}></Text>
          </Animated.View>
        </View>
        <View>
          <Text style={styles.shimmerTextTittle}>Lokasi</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text
              style={{
                textAlign: 'justify',
                fontFamily: text.light,
                backgroundColor: Color.skeleton,
                borderRadius: 5,
                height: 50,
              }}></Text>
          </Animated.View>
        </View>
        <View>
          <Text style={styles.shimmerTextTittle}>Keterangan</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.shimmerTextDeskripsi}></Text>
          </Animated.View>
        </View>
        <View>
          <Text style={styles.shimmerTextTittle}>Jam Masuk</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.shimmerTextDeskripsi}></Text>
          </Animated.View>
        </View>
        <View>
          <Text style={styles.shimmerTextTittle}>Jam Keluar</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.shimmerTextDeskripsi}></Text>
          </Animated.View>
        </View>
        <View>
          <Text style={styles.shimmerTextTittle}>Reguler Hours</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.shimmerTextDeskripsi}></Text>
          </Animated.View>
        </View>
        <View>
          <Text style={styles.shimmerTextTittle}>Overtime</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.shimmerTextDeskripsi}></Text>
          </Animated.View>
        </View>
        <View>
          <Text style={styles.shimmerTextTittle}>Total Jam Kerja</Text>
          <Animated.View style={{opacity: getShimmerOpacity()}}>
            <Text style={styles.shimmerTextDeskripsi}></Text>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    // marginTop: -50,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('11%'),
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  shimmerTextTittle: {
    fontFamily: text.semiBoldItalic,
    color: Color.black,
    textTransform: 'uppercase',
    marginVertical: 2,
    fontSize: hp('2%'),
    borderRadius: 5,
  },
  shimmerTextDeskripsi: {
    marginVertical: 2,
    backgroundColor: Color.skeleton,
    borderRadius: 5,
  },
});

export default SkeletonDetailTimesheet;
