/* eslint-disable prettier/prettier */
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import React from 'react';
import FormCuti from '../../components/organisms/FormCuti';
import {Color} from '../../utils/color';
import ButtonBack from '../../components/atoms/ButtonBack';
import ButtonHome from '../../components/atoms/ButtonHome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasBesar from '../../components/atoms/VectorAtasBesar';

const ScreenFormCuti = ({navigation}) => {
  return (
    <View style={{backgroundColor: Color.green, flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ButtonBack navigation={navigation} />
        <ButtonHome navigation={navigation} />
        <VectorAtasBesar />
        <View style={styles.wrapperForm}>
          <FormCuti
            navigation={navigation}
            styleContainerCard={styles.styleConatinerCard}
            styleCard={styles.ukuranCard}
            styleInfo={styles.styleInfo}
            styleTitle={styles.titleInfo}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ScreenFormCuti;

const styles = StyleSheet.create({
  wrapperForm: {
    alignItems: 'center',
    paddingTop: 30,
    width: '100%',
    height: '100%',
  },
  styleConatinerCard: {
    height: hp('6.6%'),
    width: wp('22%'),
  },
  ukuranCard: {
    height: hp('6.6%'),
    width: wp('17%'),
  },
  styleInfo: {
    fontSize: hp('2%'),
  },
  titleInfo: {
    fontSize: hp('1.3%'),
  },
});
