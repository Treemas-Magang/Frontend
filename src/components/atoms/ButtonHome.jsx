/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouseUser} from '@fortawesome/free-solid-svg-icons';
import {Color} from '../../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ButtonHome = ({navigation, style}) => {
  const goHome = () => {
    navigation.navigate('dashboard');
  };
  return (
    <TouchableOpacity style={style} onPress={goHome}>
      <FontAwesomeIcon
        icon={faHouseUser}
        color={Color.green}
        size={wp('10%')}
      />
    </TouchableOpacity>
  );
};

export default ButtonHome;
