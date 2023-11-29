/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import {Color} from '../../utils/color';

/**
 * Komponen ButtonGallery digunakan untuk membuat tombol galeri dengan ikon gambar.
 *
 * @param {function} onPress - Fungsi yang akan dipanggil ketika tombol galeri ditekan.
 * @returns {JSX.Element} - Komponen React untuk tombol galeri.
 */
const ButtonGallery = ({onPress}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <FontAwesomeIcon icon={faImage} color={Color.green} size={50} />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonGallery;
