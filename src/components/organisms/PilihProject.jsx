/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import ButtonAction from '../../components/atoms/ButtonAction';
import {Color} from '../../utils/color';
import CardPilihProject from '../molecules/CardPilihProject';
import {text} from '../../utils/text';

const PilihProject = ({navigation, ukuranWrappPilihProject}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <View>
      <View style={[styles.wrappPilihProject, ukuranWrappPilihProject]}>
        <Text
          style={{
            fontFamily: text.semiBold,
            textTransform: 'uppercase',
            fontSize: 17,
            color: Color.blue,
          }}>
          Project Yang Di Pilih
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CardPilihProject
            navigation={navigation}
            onPress={() => moveTo('pilihAbsenProject')}
          />
          <CardPilihProject navigation={navigation} />
          <CardPilihProject navigation={navigation} />
          <CardPilihProject navigation={navigation} />
          <CardPilihProject navigation={navigation} />
        </ScrollView>
      </View>
    </View>
  );
};

export default PilihProject;

const styles = StyleSheet.create({
  wrappPilihProject: {
    backgroundColor: Color.white,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 30,
  },
  VectorAtasKanan: {
    position: 'absolute',
    top: -120,
    right: -40,
    zIndex: -1,
  },
});
