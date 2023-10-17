/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import FormAbsenBelumPulang from '../../components/organisms/FormAbsenBelumPulang';
import ButtonBack from '../../components/atoms/ButtonBack';
import ButtonHome from '../../components/atoms/ButtonHome';

const ScreenFormAbsensi = ({navigation}) => {
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
          style={{position: 'absolute', top: 10, right: 15}}
        />
        <Image
          style={styles.VectorAtasKanan}
          source={require('../../assets/vector/VectorKananAtas.png')}
        />
        <View style={styles.wrapperForm}>
          <FormAbsenBelumPulang navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ScreenFormAbsensi;

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
