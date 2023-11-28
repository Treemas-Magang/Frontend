/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouseUser} from '@fortawesome/free-solid-svg-icons';
import {Color} from '../../utils/color';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
const ButtonHome = ({navigation, style}) => {
  const goHome = () => {
    navigation.replace('dashboard');
  };
  return (
    <TouchableOpacity style={styles.ButtonHome} onPress={goHome}>
      <FontAwesomeIcon
        icon={faHouseUser}
        color={Color.green}
        size={wp('10%')}
      />
    </TouchableOpacity>
  );
};

export default ButtonHome;
const styles = StyleSheet.create({
  ButtonHome: {
    position: 'absolute',
    top: 20,
    right: 15,
    zIndex: 999,
  },
});
