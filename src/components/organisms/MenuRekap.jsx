/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import IconMenu from '../atoms/IconMenu';

const MenuRekap = ({
  navigation,
  wrapIcon,
  styleImage,
  styleNamaMenu,
  gap,
  box,
  scrollViewContent,
}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };

  const menuItems = [
    {
      image: require('../../assets/vector/Reimburse.png'),
      title: 'Reimburse',
      onPress: () => moveTo('listReimburse'),
    },
    {
      image: require('../../assets/vector/Timesheet.png'),
      title: 'Timesheet',
      onPress: () => moveTo('listTimesheet'),
    },
    {
      image: require('../../assets/vector/Absen.png'),
      title: 'Absen',
      onPress: () => moveTo('listAbsen'),
    },
    {
      image: require('../../assets/vector/Cuti.png'),
      title: 'Cuti',
      onPress: () => moveTo('rekapCuti'),
    },
    {
      image: require('../../assets/vector/Sakit.png'),
      title: 'Sakit',
      onPress: () => moveTo('rekapSakit'),
    },
    {
      image: require('../../assets/vector/Claim.png'),
      title: 'Claim',
      onPress: () => moveTo('rekapClaim'),
    },
  ];

  return (
    <ScrollView contentContainerStyle={scrollViewContent}>
      <View style={[styles.wrapperIconMenu, wrapIcon]}>
        <View
          style={[
            {
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
            },
            gap,
          ]}>
          {menuItems.map((item, index) => (
            <IconMenu
              key={index}
              image={item.image}
              title={item.title}
              onPress={item.onPress}
              styleImage={styleImage}
              styleNamaMenu={styleNamaMenu}
              box={box}
            />
          ))}
        </View>
        <View style={{width: 70, height: 60, marginBottom: 5}} />
      </View>
    </ScrollView>
  );
};

export default MenuRekap;

const styles = StyleSheet.create({
  wrapperIconMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
