import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import ButtonHome from '../atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SkeletonDetailProfile = ({navigation, stylePP}) => {
  const [isWFH, setIsWFH] = useState(true);

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
    <View style={styles.backgroundDetailProfile}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                backgroundColor: Color.skeleton,
              }}></View>
          </View>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.TextTitleName}></Text>
          </View>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View>
            <Text style={styles.TextDeskripsi}></Text>
          </View>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View>
            <Text style={styles.TextDeskripsi}></Text>
          </View>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View>
            <Text style={styles.TextDeskripsi}></Text>
          </View>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View>
            <Text style={styles.TextDeskripsi}></Text>
          </View>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View>
            <Text style={styles.TextDeskripsi}></Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default SkeletonDetailProfile;

const styles = StyleSheet.create({
  backgroundDetailProfile: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('15%'),
  },
  Judul: {
    textAlign: 'center',
    fontSize: wp('6%'),
  },

  TextTitleName: {
    marginVertical: 7,
    backgroundColor: Color.skeleton,
    borderRadius: 5,
    width: 150,
  },
  TextDeskripsi: {
    textAlign: 'justify',
    backgroundColor: Color.skeleton,
    height: 50,
    borderRadius: 5,
    marginVertical: 10,
  },
});
