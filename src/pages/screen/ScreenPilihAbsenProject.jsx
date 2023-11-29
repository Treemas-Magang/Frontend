/* eslint-disable prettier/prettier */
import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import PilihAbsenProject from '../../components/organisms/PilihAbsenProject';
import ButtonBack from '../../components/atoms/ButtonBack';
import ButtonHome from '../../components/atoms/ButtonHome';
import VectorAtasBesar from '../../components/atoms/VectorAtasBesar';
const ScreenPilihAbsenProject = ({navigation}) => {
  return (
    <View style={styles.BackgroundPilihProject}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasBesar />
      <PilihAbsenProject navigation={navigation} />
    </View>
  );
};

export default ScreenPilihAbsenProject;

const styles = StyleSheet.create({
  BackgroundPilihProject: {
    backgroundColor: Color.green,
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
