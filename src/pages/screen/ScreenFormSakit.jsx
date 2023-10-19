/* eslint-disable prettier/prettier */
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import FormSakit from '../../components/organisms/FormSakit';
import ButtonBack from '../../components/atoms/ButtonBack';
import ButtonHome from '../../components/atoms/ButtonHome';

const ScreenFormSakit = ({navigation}) => {
  return (
    <View style={{height: '100%', backgroundColor: Color.green}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ButtonBack
          navigation={navigation}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
          }}
        />
        <ButtonHome
          navigation={navigation}
          style={{position: 'absolute', top: 13, right: 15}}
        />
        <Image
          style={styles.VectorAtasKanan}
          source={require('../../assets/vector/VectorKananAtas.png')}
        />
        <View style={styles.wrapperForm}>
          <FormSakit navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ScreenFormSakit;

const styles = StyleSheet.create({
  wrapperForm: {
    alignItems: 'center',
    paddingTop: 50,
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
