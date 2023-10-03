/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';
import IconMenu from '../atoms/IconMenu';

const MenuKehadiran = ({ navigation }) => {
  const moveTo = (tujuan) => {
    navigation.navigate(tujuan);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.wrapperIconMenu}>
        <IconMenu
          image={require('../../assets/vector/Reimburse.png')}
          title="Reimburse"
          onPress={() => moveTo('')}
        />
        <IconMenu
          image={require('../../assets/vector/Timesheet.png')}
          title="Timesheet"
        />
        <IconMenu
          image={require('../../assets/vector/Absen.png')}
          title="Absen"
        />
        <IconMenu
          image={require('../../assets/vector/Cuti.png')}
          title="Cuti"
        />
        <IconMenu
          image={require('../../assets/vector/Sakit.png')}
          title="Sakit"
        />
        <IconMenu
          image={require('../../assets/vector/Claim.png')}
          title="Claim"
        />
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
