import {StyleSheet, View} from 'react-native';
import React from 'react';
import IconMenu from '../atoms/IconMenu';

const MenuUtama = ({navigation}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <View style={styles.wrapperIconMenu}>
      <IconMenu
        image={require('../../assets/vector/schedule.png')}
        title="Kehadiran"
      />
      <IconMenu
        image={require('../../assets/vector/rekap.png')}
        title="rekap"
      />
      <IconMenu
        image={require('../../assets/vector/folders.png')}
        title="form"
      />
      <IconMenu
        image={require('../../assets/vector/announcement.png')}
        title="pengumuman"
        onPress={() => moveTo('dashboardNotif')}
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
