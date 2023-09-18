import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

// Buat komponen TextInput kustom
const CustomTextInput = ({label, onTextChange, ...props}) => {
  const [isInputActive, setInputActive] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');

  const handleTextInputFocus = () => {
    setInputActive(true);
  };

  const handleTextInputBlur = () => {
    setInputActive(false);
  };

  const handleTextInputChange = text => {
    setTextInputValue(text);
    if (onTextChange) {
      onTextChange(text); // Mengirim nilai input kembali ke komponen induk
    }
  };

  return (
    <View style={{position: 'relative'}}>
      <TextInput
        style={[styles.input, isInputActive || textInputValue ? {} : null]}
        onFocus={handleTextInputFocus}
        onBlur={handleTextInputBlur}
        onChangeText={handleTextInputChange}
        value={textInputValue}
        {...props}
      />
      <Text
        style={[
          styles.label,
          isInputActive || textInputValue ? {top: -6, fontSize: 19} : null,
        ]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 275,
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: 'blue',
    borderBottomWidth: 1,
  },
  label: {
    position: 'absolute',
    top: 11,
    left: 9,
    fontSize: 22,
  },
});

export default CustomTextInput;
