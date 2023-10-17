/* eslint-disable prettier/prettier */
import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import PilihProject from '../../components/organisms/PilihProject';

const ScreenPilihProject = ({navigation}) => {
  return (
    <ScrollView>
    <View style={styles.BackgroundPilihProject}>
      <PilihProject navigation={navigation} />
    </View>
    </ScrollView>
  );
};

export default ScreenPilihProject;

const styles = StyleSheet.create({
  BackgroundPilihProject: {
    backgroundColor: Color.green,
    flex: 1,
    paddingVertical: 100,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
