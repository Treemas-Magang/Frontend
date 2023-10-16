/* eslint-disable prettier/prettier */
import {View} from 'react-native';
import React from 'react';
import ListMemberProject from '../../components/organisms/ListMemberProject';

const ScreenListMemberProject = ({navigation}) => {
  return (
    <View>
      <ListMemberProject navigation={navigation} />
    </View>
  );
};

export default ScreenListMemberProject;
