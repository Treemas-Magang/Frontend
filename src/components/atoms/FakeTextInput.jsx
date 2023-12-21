/* eslint-disable prettier/prettier */

import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

/**
 * Komponen FakeTextInput digunakan untuk membuat tampilan teks input yang tidak dapat diubah.
 *
 * @param {string} value - Nilai yang akan ditampilkan di dalam teks input.
 * @param {string} label - Label untuk teks input.
 * @returns {JSX.Element} - Komponen React untuk tampilan teks input yang tidak dapat diubah.
 */
const FakeTextInput = ({label, value, onTextChange, textColor, ...rest}) => {
  const [valueInput, setValueInput] = useState('');
  useEffect(() => {
    setValueInput(value);
  }, [value]);
  const [textInputValue, setTextInputValue] = useState(value);
  const [isInputActive, setInputActive] = useState(false);

  /**
   * Fungsi handleTextInputFocus digunakan untuk menangani fokus pada input teks.
   */
  const handleTextInputFocus = () => {
    setInputActive(true);
  };

  /**
   * Fungsi handleTextInputBlur digunakan untuk menangani hilangnya fokus pada input teks.
   */
  const handleTextInputBlur = () => {
    setInputActive(false);
  };

  /**
   * Fungsi handleTextInputChange digunakan untuk menangani perubahan nilai input teks.
   * @param {string} text - Nilai baru input teks.
   */
  const handleTextInputChange = text => {
    setTextInputValue(text);
    if (onTextChange) {
      onTextChange(text); // Mengirim nilai input kembali ke komponen induk
    }
  };

  return (
    <View style={{position: 'relative'}}>
      <Text
        style={[
          styles.textInput,
          isInputActive || textInputValue ? {} : null,
          {...rest},
        ]}
        onFocus={handleTextInputFocus}
        onBlur={handleTextInputBlur}
        onChangeText={handleTextInputChange}
        value={textInputValue}>
        {valueInput}
      </Text>
      <Text
        style={[
          styles.label,
          {color: textColor || Color.blue},
          isInputActive || textInputValue ? {top: -10, fontSize: 19} : null,
        ]}>
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
