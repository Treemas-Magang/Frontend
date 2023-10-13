/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import ButtonAction from '../../components/atoms/ButtonAction';
import {Color} from '../../utils/color';
import CardPilihProject from '../molecules/CardPilihProject';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';

const PilihProject = ({navigation}) => {
  const moveTo = screen => {
    navigation.navigate(screen);
  };
  return (
    <View>
      <View style={styles.CardUpdateTimesheet}>
        <ButtonBack
          navigation={navigation}
          style={{
            position: 'absolute',
            top: -130,
            left: -180,
          }}
        />
        <Image
          style={styles.VectorAtasKanan}
          source={require('../../assets/vector/VectorKananAtas.png')}
        />
        <Text
          style={{
            fontFamily: text.semiBold,
            textTransform: 'uppercase',
            fontSize: 17,
            color: Color.blue,
          }}>
          Project Yang Di Pilih
        </Text>
        <CardPilihProject />
        <ButtonAction
          onPress={() => moveTo('pilihAbsenProject')}
          style={{width: 269, height: 50}}
          title="NEXT"
        />
      </View>
    </View>
  );
};

export default PilihProject;

const styles = StyleSheet.create({
  CardUpdateTimesheet: {
    width: 320,
    height: 600,
    backgroundColor: Color.white,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  VectorAtasKanan: {
    position: 'absolute',
    top: -100,
    right: -40,
    zIndex: -1,
  },
});
