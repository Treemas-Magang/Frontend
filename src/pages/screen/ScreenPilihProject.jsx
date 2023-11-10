/* eslint-disable prettier/prettier */
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import PilihProject from '../../components/organisms/PilihProject';
import ButtonBack from '../../components/atoms/ButtonBack';
import ButtonHome from '../../components/atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasBesar from '../../components/atoms/VectorAtasBesar';
const ScreenPilihProject = ({navigation}) => {
  return (
    <View style={styles.BackgroundPilihProject}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasBesar />
      <PilihProject
        navigation={navigation}
        ukuranWrappPilihProject={styles.ukuranWrappPilihProject}
      />
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
    paddingTop: 85,
  },
  ukuranWrappPilihProject: {
    width: wp('85%'),
    height: hp('75%'),
  },
});
