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
// Buat komponen TextInput kustom
const CustomTextInput = ({label, onTextChange, ...rest}) => {
  const [isInputActive, setInputActive] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [hidePassword, setHidePassword] = useState(false);

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
            color={hidePassword ? 'gray' : Color.primary}
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
    borderBottomColor: Color.primary,
    borderBottomWidth: 1,
  },
  label: {
    position: 'absolute',
    top: 11,
    left: 9,
    fontSize: 22,
  },
  toggle: {
    position: 'absolute',
    right: 0,
    width: 50,
  },
});

export default CustomTextInput;
