/* eslint-disable prettier/prettier */
import {View} from 'react-native';
import React from 'react';
import ListMembers from '../../components/organisms/ListMembers';

const ScreenListMembers = ({navigation}) => {
  return (
    <View>
      <ListMembers navigation={navigation} />
    </View>
  );
};

export default ScreenListMembers;
