/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FormAbsensi from '../../components/organisms/FormAbsensi';
import {Color} from '../../utils/color';
import ButtonBack from '../../components/atoms/ButtonBack';
import ButtonHome from '../../components/atoms/ButtonHome';
import VectorAtasBesar from '../../components/atoms/VectorAtasBesar';
import FormUpdateAbsensi from '../../components/organisms/FormUpdateAbsensi';

const ScreenFormUpdateAbsensi = ({navigation}) => {
  return (
    <View style={{height: '100%', backgroundColor: Color.green}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ButtonBack navigation={navigation} />
        <ButtonHome navigation={navigation} />
        <VectorAtasBesar />
        <View style={styles.wrapperForm}>
          <FormUpdateAbsensi navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ScreenFormUpdateAbsensi;

const styles = StyleSheet.create({
  wrapperForm: {
    alignItems: 'center',
    paddingVertical: 80,
    width: '100%',
    height: '100%',
  },
});
