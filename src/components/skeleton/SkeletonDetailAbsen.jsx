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
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasKecil from '../atoms/VectorAtasKecil';

const SkeletonDetailAbsen = ({navigation}) => {
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
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View
        style={{
          width: wp('100%'),
          height: hp('20%'),
          justifyContent: 'center',
        }}>
        <Text style={styles.Judul}>Detail Absen</Text>
      </View>
      <View style={styles.backgroundCardAbsen}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.TextTitle}>Nik</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.TextDeskripsi}></Text>
            </Animated.View>
          </View>
          <View>
            <Text style={styles.TextTitle}>Nama</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.TextDeskripsi}></Text>
            </Animated.View>
          </View>
          <View>
            <Text style={styles.TextTitle}>Hari</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.TextDeskripsi}></Text>
            </Animated.View>
          </View>
          <View>
            <Text style={styles.TextTitle}>Tanggal</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.TextDeskripsi}></Text>
            </Animated.View>
          </View>
          <View>
            <Text style={styles.TextTitle}>Fleg Keterangan</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.TextDeskripsi}></Text>
            </Animated.View>
          </View>
          <View>
            <Text style={styles.TextTitle}>Project</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.TextDeskripsi}></Text>
            </Animated.View>
          </View>
          <View>
            <Text style={styles.TextTitle}>Jam Masuk</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.TextDeskripsi}></Text>
            </Animated.View>
          </View>
          <View>
            <Text style={styles.TextTitle}>Catatan Telat</Text>
            <Animated.View style={{opacity: getShimmerOpacity()}}>
              <Text style={styles.TextDeskripsi}></Text>
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SkeletonDetailAbsen;

const styles = StyleSheet.create({
  backgroundCardAbsen: {
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
    fontSize: wp('6.5%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  TextTitle: {
    fontFamily: text.semiBoldItalic,
    color: Color.black,
    textTransform: 'uppercase',
    marginVertical: 2,
  },
  TextDeskripsi: {
    backgroundColor: Color.skeleton,
    width: 250,
    marginVertical: 2,
    borderRadius: 5,
  },
});
