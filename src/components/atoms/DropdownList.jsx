/* eslint-disable prettier/prettier */

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

/**
 * Komponen DropdownList digunakan untuk membuat dropdown pilihan sorting.
 *
 * @returns {JSX.Element} - Komponen React untuk dropdown pilihan sorting.
 */
const DropdownList = () => {
  const [isSort, setIsSort] = useState('');

  /**
   * Fungsi handleOption digunakan untuk menangani pemilihan opsi sorting.
   * @param {string} value - Nilai opsi sorting yang dipilih.
   */
  const hendleOption = value => {
    setIsSort(value);
  };
  console.log(isSort);

  return (
    <View style={[styles.dropdown]}>
      <TouchableOpacity
        onPress={() => hendleOption('nama')}
        style={styles.option}>
        <Text style={styles.textOption}>Nama</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => hendleOption('jam_kehadiran')}
        style={styles.option}>
        <Text style={styles.textOption}>Jam Kehadiran</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => hendleOption('project')}
        style={styles.option}>
        <Text style={styles.textOption}>Project</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => hendleOption('work_from_home')}
        style={styles.option}>
        <Text style={styles.textOption}>Work From Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => hendleOption('cuti')}
        style={styles.option}>
        <Text style={styles.textOption}>Cuti / Sakit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => hendleOption('tidak_masuk')}
        style={styles.option}>
        <Text style={styles.textOption}>Tidak masuk</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: 200,
    backgroundColor: Color.green,
    position: 'absolute',
    zIndex: 10,
    top: 60,
    left: 30,
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
  option: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.white,
  },
  textOption: {
    fontFamily: text.regular,
    fontSize: 12,
    color: Color.white,
  },
});

export default DropdownList;
