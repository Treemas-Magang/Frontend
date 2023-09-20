import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const IconMenu = ({image, title}) => {
  return (
    <View style={styles.boxImage}>
      <Image source={image} style={styles.image} />
      <Text style={{fontFamily: 'Poppins-SemiBold'}}>{title}</Text>
    </View>
  );
};

export default IconMenu;

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
  },
  boxImage: {
    alignItems: 'center',
  },
});
