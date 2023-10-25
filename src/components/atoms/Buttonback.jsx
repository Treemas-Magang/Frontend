/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Color} from '../../utils/color';

const ButtonBack = ({navigation, style}) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity style={style} onPress={goBack}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        color={Color.white}
        size={30}
      />
    </TouchableOpacity>
  );
};

export default ButtonBack;
