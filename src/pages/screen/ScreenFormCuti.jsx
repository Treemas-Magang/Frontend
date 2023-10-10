/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FormCuti from '../../components/organisms/FormCuti';

const ScreenFormCuti = ({navigation}) => {
  return (
    <View>
      <FormCuti navigation={navigation} />
    </View>
  );
};

export default ScreenFormCuti;

const styles = StyleSheet.create({})