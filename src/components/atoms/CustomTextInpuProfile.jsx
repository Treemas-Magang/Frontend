/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

/**
 * Komponen CustomTextInput digunakan untuk membuat input teks kustom dengan label dan opsi untuk menampilkan/menyembunyikan password.
 *
 * @param {string} label - Label yang akan ditampilkan di atas input teks.
 * @param {string} value - Nilai input teks.
 * @param {function} onTextChange - Fungsi yang akan dipanggil ketika nilai input berubah.
 * @param {string} textColor - Warna teks label (opsional).
 * @returns {JSX.Element} - Komponen React untuk input teks kustom.
 */
// Import necessary components and modules

const CustomTextInputProfile = ({
  label,
  value,
  onTextChange,
  textColor,
  multiline, // Add multiline prop
  numberOfLines, // Add numberOfLines prop
  ...rest
}) => {
  const [isInputActive, setInputActive] = useState(false);
  const [textInputValue, setTextInputValue] = useState(value);

  const handleTextInputFocus = () => {
    setInputActive(true);
  };

  const handleTextInputBlur = () => {
    setInputActive(false);
  };

  const handleTextInputChange = text => {
    setTextInputValue(text);
    if (onTextChange) {
      onTextChange(text);
    }
  };

  return (
    <View style={{position: 'relative'}}>
      <TextInput
        style={[
          styles.input,
          isInputActive || textInputValue ? {} : null,
          multiline && styles.multilineInput, // Apply multilineInput style if multiline prop is true
        ]}
        onFocus={handleTextInputFocus}
        onBlur={handleTextInputBlur}
        onChangeText={handleTextInputChange}
        value={textInputValue}
        multiline={multiline} // Set multiline prop
        numberOfLines={numberOfLines} // Set numberOfLines prop
        {...rest}
      />

      <Text
        style={[
          styles.label,
          {color: textColor || Color.blue},
          isInputActive || textInputValue ? {top: -6, fontSize: 19} : null,
        ]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 323,
    height: 55,
    paddingHorizontal: 10,
    borderBottomColor: Color.green,
    borderBottomWidth: 1,
    paddingBottom: -10,
  },
  label: {
    position: 'absolute',
    top: 11,
    left: 9,
    fontSize: 19,
    fontFamily: text.light,
    zIndex: -1,
  },
  multilineInput: {
    height: 'auto', // Set height to auto for multiline input
    minHeight: 70, // Set a minimum height for better appearance
    marginTop: 10,
  },
});

export default CustomTextInputProfile;
