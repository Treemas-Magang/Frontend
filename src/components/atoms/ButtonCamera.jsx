/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {Color} from '../../utils/color';

/**
 * Komponen ButtonCamera digunakan untuk membuat tombol kamera dengan ikon kamera.
 *
 * @param {function} onPress - Fungsi yang akan dipanggil ketika tombol kamera ditekan.
 * @returns {JSX.Element} - Komponen React untuk tombol kamera.
 */
const ButtonCamera = ({onPress}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <FontAwesomeIcon icon={faCamera} color={Color.green} size={50} />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonCamera;
