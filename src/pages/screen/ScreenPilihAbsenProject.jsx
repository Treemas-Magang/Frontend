/* eslint-disable prettier/prettier */
import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import PilihAbsenProject from '../../components/organisms/PilihAbsenProject';
import ButtonBack from '../../components/atoms/ButtonBack';
import ButtonHome from '../../components/atoms/ButtonHome';

const ScreenPilihAbsenProject = ({navigation}) => {
  return (
    <View style={styles.BackgroundPilihProject}>
      <ButtonBack
        navigation={navigation}
        style={{
          position: 'absolute',
          top: 20,
          left: 15,
        }}
      />
      <ButtonHome
        navigation={navigation}
        style={{position: 'absolute', top: 20, right: 15}}
      />
      <Image
        style={styles.VectorAtasKanan}
        source={require('../../assets/vector/VectorKananAtas.png')}
      />
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
  VectorAtasKanan: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
