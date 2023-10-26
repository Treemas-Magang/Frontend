/* eslint-disable prettier/prettier */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import IconMenu from '../atoms/IconMenu';
import {Color} from '../../utils/color';
import {text} from '@fortawesome/fontawesome-svg-core';

const MenuForm = ({
  navigation,
  wrapIcon,
  styleImage,
  styleNamaMenu,
  gap,
  box,
}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <View style={[styles.wrapperIconMenu, wrapIcon]}>
      <View
        style={[
          {
            flexDirection: 'row',
          },
          gap,
        ]}>
        <IconMenu
          image={require('../../assets/vector/Cuti.png')}
          title="Cuti"
          onPress={() => moveTo('formCuti')}
          styleImage={styleImage}
          styleNamaMenu={styleNamaMenu}
          box={box}
        />
        <IconMenu
          image={require('../../assets/vector/Sakit.png')}
          title="Sakit"
          onPress={() => moveTo('formSakit')}
          styleImage={styleImage}
          styleNamaMenu={styleNamaMenu}
          box={box}
        />
      </View>
      <View style={[{flexDirection: 'row'}, gap]}>
        <IconMenu
          image={require('../../assets/vector/Claim.png')}
          title="Claim"
          onPress={() => moveTo('formClaim')}
          styleImage={styleImage}
          styleNamaMenu={styleNamaMenu}
          box={box}
        />
        <View style={[box]} />
      </View>
    </View>
  );
};

export default MenuForm;

const styles = StyleSheet.create({
  wrapperIconMenu: {},
  notif: {
    padding: 10,
    backgroundColor: Color.red,
    position: 'absolute',
    zIndex: 2,
    right: 0,
    top: -20,
    borderRadius: 25,
    textAlign: 'center',
    borderWidth: 5,
    borderColor: Color.green,
  },
  text: {
    minWidth: 20,
    textAlign: 'center',
    color: Color.white,
    fontFamily: text.bold,
    fontSize: 12,
  },
});
