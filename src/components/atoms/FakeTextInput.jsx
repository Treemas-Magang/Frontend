/* eslint-disable prettier/prettier */

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

/**
 * Komponen FakeTextInput digunakan untuk membuat tampilan teks input yang tidak dapat diubah.
 *
 * @param {string} value - Nilai yang akan ditampilkan di dalam teks input.
 * @param {string} label - Label untuk teks input.
 * @returns {JSX.Element} - Komponen React untuk tampilan teks input yang tidak dapat diubah.
 */
const FakeTextInput = ({value, label}) => {
  const valueInput = value;

  return (
    <View style={{position: 'relative'}}>
      <Text style={styles.textInput}>{valueInput}</Text>
      <Text style={[styles.label, valueInput ? {top: -6, fontSize: 19} : null]}>
        {label}
      </Text>
    </View>
  );
};

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
});

export default FakeTextInput;
