/* eslint-disable prettier/prettier */
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import PilihProject from '../../components/organisms/PilihProject';
import ButtonBack from '../../components/atoms/ButtonBack';
import ButtonHome from '../../components/atoms/ButtonHome';

const ScreenPilihProject = ({navigation}) => {
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
  VectorAtasKanan: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
