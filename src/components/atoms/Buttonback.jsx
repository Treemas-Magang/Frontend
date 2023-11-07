/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Color} from '../../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ButtonBack = ({navigation, style}) => {
  const goBack = () => {
    navigation.goBack();

  };
  return (
    <TouchableOpacity style={styles.ButtonBack} onPress={goBack}>
      <FontAwesomeIcon icon={faArrowLeft} color={Color.white} size={wp('8%')} />
    </TouchableOpacity>
  );
};

export default ButtonBack;
const styles = StyleSheet.create({
  ButtonBack: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 99,
  },
});
