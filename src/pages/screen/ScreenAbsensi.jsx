/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapPreview from '../../components/organisms/MapPreview';

const ScreenAbsensi = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <MapPreview navigation={navigation} />
    </View>
  );
};

export default ScreenAbsensi;

const styles = StyleSheet.create({});
