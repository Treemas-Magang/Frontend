/* eslint-disable prettier/prettier */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FormCatatanKerjaHariini from '../../components/organisms/FormCatatanKerjaHariini';
import ButtonBack from '../../components/atoms/ButtonBack';
import ButtonHome from '../../components/atoms/ButtonHome';
import {Color} from '../../utils/color';
import VectorAtasBesar from '../../components/atoms/VectorAtasBesar';

const ScreenFormAbsenPulang = ({navigation}) => {
  return (
    <View style={{height: '100%', backgroundColor: Color.green}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ButtonBack navigation={navigation} />
        <ButtonHome navigation={navigation} />
        <VectorAtasBesar />
        <View style={styles.wrapperForm}>
          <FormCatatanKerjaHariini navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ScreenFormAbsenPulang;

const styles = StyleSheet.create({
  wrapperForm: {
    alignItems: 'center',
    paddingTop: 120,
    width: '100%',
    height: '100%',
    marginBottom: 50,
  },
});
