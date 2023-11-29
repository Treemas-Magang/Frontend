/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
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
  return (
    <ScrollView contentContainerStyle={scrollViewContent}>
      <View style={[styles.wrapperIconMenu, wrapIcon]}>
        <View
          style={[
            {
              flexDirection: 'row',
            },
            gap,
          ]}>
          <IconMenu
            image={require('../../assets/vector/Reimburse.png')}
            title="Reimburse"
            onPress={() => moveTo('listReimburse')}
            styleImage={styleImage}
            styleNamaMenu={styleNamaMenu}
            box={box}
          />
          <IconMenu
            image={require('../../assets/vector/Timesheet.png')}
            title="Timesheet"
            onPress={() => moveTo('listTimesheet')}
            styleImage={styleImage}
            styleNamaMenu={styleNamaMenu}
            box={box}
          />
        </View>
        <View style={[{flexDirection: 'row'}, gap]}>
          <IconMenu
            image={require('../../assets/vector/Absen.png')}
            title="Absen"
            onPress={() => moveTo('listAbsen')}
            styleImage={styleImage}
            styleNamaMenu={styleNamaMenu}
            box={box}
          />
          <IconMenu
            image={require('../../assets/vector/Cuti.png')}
            title="Cuti"
            onPress={() => moveTo('rekapCuti')}
            styleImage={styleImage}
            styleNamaMenu={styleNamaMenu}
            box={box}
          />
        </View>
        <View style={[{flexDirection: 'row'}, gap]}>
          <IconMenu
            image={require('../../assets/vector/Sakit.png')}
            title="Sakit"
            onPress={() => moveTo('rekapSakit')}
            styleImage={styleImage}
            styleNamaMenu={styleNamaMenu}
            box={box}
          />
          <IconMenu
            image={require('../../assets/vector/Claim.png')}
            title="Claim"
            onPress={() => moveTo('rekapClaim')}
            styleImage={styleImage}
            styleNamaMenu={styleNamaMenu}
            box={box}
          />
        </View>
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
