import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import PilihAbsenProject from '../../components/organisms/PilihAbsenProject';

const ScreenPilihAbsenProject = ({navigation}) => {
  return (
    <View style={styles.BackgroundPilihProject}>
      <PilihAbsenProject navigation={navigation} />
      <Image
        style={styles.VectorBawah}
        source={require('../../assets/vector/VectorBawah.png')}
      />
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
    height: '100%',
  },
  VectorBawah: {
    position: 'absolute',
    bottom: -80,
    left: 0,
    zIndex: -1,
    width: '100%',
  },
});
