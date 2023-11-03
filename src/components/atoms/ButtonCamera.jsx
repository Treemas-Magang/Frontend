/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {Color} from '../../utils/color';
const ButtonCamera = ({onPress}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <FontAwesomeIcon icon={faCamera} color={Color.green} size={50} />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonCamera;
