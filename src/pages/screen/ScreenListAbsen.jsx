/* eslint-disable prettier/prettier */
import { View } from 'react-native';
import React from 'react';
import ListAbsen from '../../components/organisms/ListAbsen';

const ScreenListAbsen = ({navigation}) => {
  return (
    <View>
      <ListAbsen navigation={navigation} />
    </View>
  );
};
export default ScreenListAbsen;
