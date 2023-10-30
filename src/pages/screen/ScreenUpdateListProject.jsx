/* eslint-disable prettier/prettier */
import {View} from 'react-native';
import React from 'react';
import UpdateListProject from '../../components/organisms/UpdateListProject';

const ScreenUpdateListProject = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <UpdateListProject navigation={navigation} />
    </View>
  );
};

export default ScreenUpdateListProject;
