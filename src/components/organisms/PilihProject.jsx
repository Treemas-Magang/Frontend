import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ButtonAction from '../../components/atoms/ButtonAction';
import {Color} from '../../utils/color';
import CardPilihProject from '../molecules/CardPilihProject';

const PilihProject = ({navigation}) => {
  const moveTo = screen => {
    navigation.navigate(screen);
  };
  return (
    <View>
      <View style={styles.CardUpdateTimesheet}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
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
});
