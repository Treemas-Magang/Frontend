/* eslint-disable prettier/prettier */
import { View} from 'react-native';
import React from 'react';
import ListApproval from '../../components/organisms/ListApproval';

const ScreenApproval = ({navigation}) => {
  return (
    <View>
      <ListApproval navigation={navigation} />
    </View>
  );
};

export default ScreenApproval;
