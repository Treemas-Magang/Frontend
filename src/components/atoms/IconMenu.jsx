import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';

const IconMenu = ({image, title, onPress}) => {
  return (
    <TouchableOpacity style={styles.boxImage} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          color: Color.blue,
          fontSize: 12,
          textTransform: 'uppercase',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default IconMenu;

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    marginBottom: 5,
  },
  boxImage: {
    alignItems: 'center',
  },
});
