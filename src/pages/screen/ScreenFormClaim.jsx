/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import FormClaim from '../../components/organisms/FormClaim';
import ButtonBack from '../../components/atoms/ButtonBack';

const ScreenFormClaim = ({navigation}) => {
  return (
    <View style={styles.wrapperForm}>
      <ButtonBack
        navigation={navigation}
        style={{
          position: 'absolute',
          top: -120,
          left: -180,
        }}
      />
      <Image
        style={styles.VectorAtasKanan}
        source={require('../../assets/vector/VectorKananAtas.png')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <FormClaim />
      </ScrollView>
    </View>
  );
};

export default ScreenFormClaim;

const styles = StyleSheet.create({
  wrapperForm: {
    backgroundColor: Color.green,
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
