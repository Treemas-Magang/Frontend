import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import PilihProject from '../../components/organisms/PilihProject';

const ScreenPilihProject = ({navigation}) => {
  return (
    <View style={styles.BackgroundPilihProject}>
      <PilihProject navigation={navigation} />
    </View>
  );
};

export default ScreenPilihProject;

const styles = StyleSheet.create({
  BackgroundPilihProject: {
    backgroundColor: Color.green,
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
