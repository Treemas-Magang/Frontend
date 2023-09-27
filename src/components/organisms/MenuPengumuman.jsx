import {StyleSheet, View} from 'react-native';
import React from 'react';
import IconMenu from '../atoms/IconMenu';

const MenuPengumuman = () => {
  return (
    <View style={styles.wrapperIconMenu}>
      <IconMenu
        image={require('../../assets/vector/announcement.png')}
        title="pengumuman"
      />
      <IconMenu
        image={require('../../assets/vector/aprroval.png')}
        title="approval"
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
