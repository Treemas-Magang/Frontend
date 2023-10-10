/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color } from '../../utils/color';

const FormCuti = () => {
  return (
    <View style={styles.formCuti}>
      <Text>hello</Text>
    </View>
  );
};

export default FormCuti;

const styles = StyleSheet.create({
    formCuti:{
        flex: 1,
        height: '100%',
        borderStartColor: Color.green,
    },
});
