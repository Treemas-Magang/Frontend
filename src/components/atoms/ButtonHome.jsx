/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouseUser} from '@fortawesome/free-solid-svg-icons';
import {Color} from '../../utils/color';

const ButtonHome = ({navigation, style}) => {
  const goHome = () => {
    navigation.navigate('dashboard');
  };
  return (
    <TouchableOpacity style={style} onPress={goHome}>
      <FontAwesomeIcon
        icon={faHouseUser}
        color={Color.green}
        size={40}
      />
    </TouchableOpacity>
  );
};

export default ButtonHome;
