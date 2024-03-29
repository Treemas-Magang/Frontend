/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Color} from '../../utils/color';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
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
const CustomTextInput = ({label, value, onTextChange, textColor, ...rest}) => {
  const [isInputActive, setInputActive] = useState(false);
  const [textInputValue, setTextInputValue] = useState(value);
  const [hidePassword, setHidePassword] = useState(true);

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

  /**
   * Fungsi togglePasswordVisibility digunakan untuk beralih antara menampilkan dan menyembunyikan password.
   */
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
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
          {color: textColor || Color.blue},
          isInputActive || textInputValue ? {top: -6, fontSize: 19} : null,
        ]}>
        {label}
      </Text>
      {label === 'Password' || label === 'Konfirmasi Password' ? (
        <TouchableOpacity
          style={styles.toggle}
          onPress={togglePasswordVisibility}>
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
  toggle: {
    position: 'absolute',
    right: 0,
    width: 50,
  },
});

export default CustomTextInput;
