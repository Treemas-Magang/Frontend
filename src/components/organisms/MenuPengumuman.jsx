/* eslint-disable prettier/prettier */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import IconMenu from '../atoms/IconMenu';

const MenuPengumuman = ({navigation}) => {
  const moveTo = screen => {
    navigation.navigate(screen);
  };
  return (
    <View style={styles.wrapperIconMenu}>
      <IconMenu
        image={require('../../assets/vector/announcement.png')}
        title="pengumuman"
        onPress={() => moveTo('notifPengumuman')}
      />
      <IconMenu
        image={require('../../assets/vector/aprroval.png')}
        title="approval"
        onPress={() => moveTo('approval')}
      />
    </View>
  );
};

export default MenuPengumuman;

const styles = StyleSheet.create({
  wrapperIconMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 360,
    gap: 78,
    justifyContent: 'center',
    marginVertical: 50,
  },
});
