/* eslint-disable prettier/prettier */
import {View} from 'react-native';
import React from 'react';
import ListRekapCuti from '../../components/organisms/ListRekapCuti';

const ScreenRekapCuti = ({navigation}) => {
  return (
    <View>
      <ListRekapCuti navigation={navigation} />
    </View>
  );
};

export default ScreenRekapCuti;
