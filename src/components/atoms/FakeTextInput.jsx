/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color } from '../../utils/color';
import { text } from '../../utils/text';

const FakeTextInput = ({value, label}) => {
    const valueInput = value
  return (
    
    <View style={{ position:'relative'}} >
      <Text style={styles.textInput}>{valueInput}</Text>
      <Text
        style={[
          styles.label,
          valueInput ? {top: -6, fontSize: 19} : null,
        ]}>
        {label}
      </Text>
    </View>
  );
};

export default FakeTextInput;

const styles = StyleSheet.create({
    textInput: {
    width: 275,
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: Color.green,
    borderBottomWidth: 1,
    color: Color.black,
    paddingTop: 22,
    backgroundColor: 'transparent',
    },
    label: {
    position: 'absolute',
    top: 11,
    left: 9,
    fontSize: 19,
    fontFamily: text.light,
    color: Color.blue,
    zIndex: 1,
  },
})
