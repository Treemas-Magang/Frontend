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
import VectorAtasKecil from '../atoms/VectorAtasKecil';

const SkeletonDetailMember = ({navigation, stylePP}) => {
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
    <View style={styles.backgroundDetailMember}>
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
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            gap: 5,
            right: 0,
          }}>
          <TouchableOpacity>
            <Image
              style={{width: 40, height: 40}}
              source={require('../../assets/vector/Maps.png')}
            />
          </TouchableOpacity>
          {isWFH ? (
            <TouchableOpacity>
              <FontAwesomeIcon icon={faImage} color={Color.green} size={40} />
            </TouchableOpacity>
          ) : (
            ''
          )}
        </View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View>
            <Text style={styles.TextTitle}></Text>
            <Text style={styles.TextDeskripsi}></Text>
          </View>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View>
            <Text style={styles.TextTitle}></Text>
            <Text style={styles.TextDeskripsi}></Text>
          </View>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View>
            <Text style={styles.TextTitle}></Text>
            <Text style={styles.TextDeskripsi}></Text>
          </View>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View>
            <Text style={styles.TextTitle}></Text>
            <Text style={styles.TextDeskripsi}></Text>
          </View>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View>
            <Text style={styles.TextTitle}></Text>
            <Text
              style={{
                textAlign: 'justify',
                backgroundColor: Color.skeleton,
                height: 50,
                borderRadius: 5,
              }}></Text>
          </View>
        </Animated.View>
        <Animated.View style={{opacity: getShimmerOpacity()}}>
          <View>
            <Text style={styles.TextTitle}></Text>
            <Text style={styles.TextDeskripsi}></Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default SkeletonDetailMember;

const styles = StyleSheet.create({
  backgroundDetailMember: {
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
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  TextTitle: {
    fontFamily: text.semiBoldItalic,
    color: Color.black,
    textTransform: 'uppercase',
    marginVertical: 7,
    backgroundColor: Color.skeleton,
    borderRadius: 5,
    width: 90,
  },
  TextDeskripsi: {
    fontFamily: text.light,
    marginVertical: 2,
    borderRadius: 5,
    backgroundColor: Color.skeleton,
  },
});
