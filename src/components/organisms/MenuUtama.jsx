import {StyleSheet, View} from 'react-native';
import React from 'react';
import IconMenu from '../atoms/IconMenu';

const MenuUtama = ({navigation}) => {
  const handleMenu = namaMenu => {
    navigation.navigate(namaMenu);
  };
  return (
    <View style={styles.wrapperIconMenu}>
      <IconMenu
        image={require('../../assets/vector/schedule.png')}
        title="Kehadiran"
        onPress={() => handleMenu('Schedule')}
      />
      <IconMenu
        image={require('../../assets/vector/rekap.png')}
        title="rekap"
        onPress={() => handleMenu('Rekap')}
      />
      <IconMenu
        image={require('../../assets/vector/folders.png')}
        title="form"
        onPress={() => handleMenu('Folder')}
      />
      <IconMenu
        image={require('../../assets/vector/announcement.png')}
        title="pengumuman"
        onPress={() => handleMenu('dashboardNotif')}
      />
    </View>
  );
};

export default MenuUtama;

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
