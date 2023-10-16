/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { Color } from '../../utils/color';
import FormSakit from '../../components/organisms/FormSakit';

const ScreenFormSakit = ({navigation}) => {
  return (
    <View style={{height: '100%', backgroundColor: Color.green}}>
    <ScrollView>
      <FormSakit navigation={navigation} />
    </ScrollView>
    </View>
  );
};

export default ScreenFormSakit;

const styles = StyleSheet.create({})