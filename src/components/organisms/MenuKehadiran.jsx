/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import IconMenu from '../atoms/IconMenu';

const MenuKehadiran = ({navigation}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.wrapperIconMenu}>
        <IconMenu
          image={require('../../assets/vector/kehadiran.png')}
          title="Absensi"
          onPress={() => moveTo('')}
        />
        <IconMenu
          image={require('../../assets/vector/member.png')}
          title="Member"
        />
        <IconMenu
          image={require('../../assets/vector/updatelistproject.png')}
          title="Update List Project"
        />
        <IconMenu
          image={require('../../assets/vector/listbelumpulang.png')}
          title="List Belum Pulang"
        />
        <IconMenu
          image={require('../../assets/vector/Cuti.png')}
          title="Cuti"
        />
        <View style={{width: 70, height: 70, marginBottom: 5}} />
      </View>
    </ScrollView>
  );
};

export default MenuKehadiran;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  wrapperIconMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 360,
    gap: 78,
    justifyContent: 'center',
    marginVertical: 50,
  },
});
