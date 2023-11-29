/* eslint-disable prettier/prettier */
import React from 'react';
import DetailAbsen from '../../components/organisms/DetailAbsen';
import {View} from 'react-native';

const ScreenDetailAbsen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <DetailAbsen navigation={navigation} />
    </View>
  );
};

export default ScreenDetailAbsen;
