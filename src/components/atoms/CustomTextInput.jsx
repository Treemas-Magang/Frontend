/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Color} from '../../utils/color';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import {text} from '../../utils/text';
// Buat komponen TextInput kustom
const CustomTextInput = ({label, value, onTextChange, ...rest}) => {
  const [isInputActive, setInputActive] = useState(false);
  const [textInputValue, setTextInputValue] = useState(value);
  const [hidePassword, setHidePassword] = useState(true);

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
  const togglePasswordVisibility = () => {
    setHidePassword(true);
    if (hidePassword) {
      setHidePassword(false);
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
        secureTextEntry={hidePassword}
        {...rest}
      />
      <Text
        style={[
          styles.label,
          isInputActive || textInputValue ? {top: -6, fontSize: 19} : null,
        ]}>
        {label}
      </Text>
      {label === 'Password' ? (
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => togglePasswordVisibility()}>
          <FontAwesomeIcon
            icon={hidePassword ? faEyeSlash : faEye}
            size={40}
            color={hidePassword ? 'gray' : Color.green}
          />
        </TouchableOpacity>
      ) : (
        ''
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 275,
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: Color.green,
    borderBottomWidth: 1,
    color: Color.text,
    paddingBottom: -10,
  },
  label: {
    position: 'absolute',
    top: 11,
    left: 9,
    fontSize: 19,
    fontFamily: text.light,
    color: Color.blue,
    zIndex: -1,
  },
  toggle: {
    position: 'absolute',
    right: 0,
    width: 50,
  },
});

export default CustomTextInput;
