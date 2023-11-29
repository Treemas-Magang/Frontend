/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import ButtonBack from '../../components/atoms/ButtonBack';
import ButtonHome from '../../components/atoms/ButtonHome';
import VectorAtasBesar from '../../components/atoms/VectorAtasBesar';
import FormBelumAbsenPulang from '../../components/organisms/FormBelumAbsenPulang';

const ScreenFormBelumAbsenPulang = ({navigation}) => {
  return (
    <View style={{height: '100%', backgroundColor: Color.green}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ButtonBack navigation={navigation} />
        <ButtonHome navigation={navigation} />
        <VectorAtasBesar />
        <View style={styles.wrapperForm}>
          <FormBelumAbsenPulang navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ScreenFormBelumAbsenPulang;

const styles = StyleSheet.create({
  wrapperForm: {
    alignItems: 'center',
    paddingTop: 140,
    width: '100%',
    height: '100%',
  },
  VectorAtasKanan: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
