/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import FormClaim from '../../components/organisms/FormClaim';
import ButtonBack from '../../components/atoms/ButtonBack';
import ButtonHome from '../../components/atoms/ButtonHome';
import VectorAtasBesar from '../../components/atoms/VectorAtasBesar';

const ScreenFormClaim = ({navigation}) => {
  return (
    <View style={{height: '100%', backgroundColor: Color.green}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ButtonBack navigation={navigation} />
        <ButtonHome navigation={navigation} />
        <VectorAtasBesar />
        <View style={styles.wrapperForm}>
          <FormClaim navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ScreenFormClaim;

const styles = StyleSheet.create({
  wrapperForm: {
    alignItems: 'center',
    paddingTop: 120,
    width: '100%',
    height: '100%',
    marginBottom: 50,
  },
});
