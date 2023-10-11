/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import FormCuti from '../../components/organisms/FormCuti';
import { Color } from '../../utils/color';

const ScreenFormCuti = ({navigation}) => {
  return (
    <View style={{height: '100%', backgroundColor: Color.green}}>
    <ScrollView>
      <FormCuti navigation={navigation} />
    </ScrollView>
    </View>
  );
};

export default ScreenFormCuti;

const styles = StyleSheet.create({})