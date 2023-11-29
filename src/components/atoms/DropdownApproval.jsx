/* eslint-disable prettier/prettier */

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

/**
 * Komponen DropdownApproval digunakan untuk membuat dropdown pilihan tempat proyek.
 *
 * @param {function} dataPilihanProjact - Fungsi untuk mengirim nilai tempat proyek yang dipilih ke komponen induk.
 * @returns {JSX.Element} - Komponen React untuk dropdown pilihan tempat proyek.
 */
const DropdownApproval = ({dataPilihanProjact}) => {
  const [tempatProject, setTempatProject] = useState('');

  /**
   * Fungsi handlePilihTempatProject digunakan untuk menangani pemilihan tempat proyek.
   * @param {string} value - Nilai tempat proyek yang dipilih.
   */
  const handlePilihTempatProject = value => {
    setTempatProject(value);
  };

  // Mengirim nilai tempat proyek yang dipilih ke komponen induk
  dataPilihanProjact(tempatProject);

  return (
    <View>
      <TouchableOpacity
        onPress={() => handlePilihTempatProject('BANK JAGO REGULER SHIFT')}
        style={styles.item}>
        <Text style={styles.tempatProject}>BANK JAGO REGULER SHIFT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePilihTempatProject('BANK JAGO EOD SHIFT')}
        style={styles.item}>
        <Text style={styles.tempatProject}>BANK JAGO EOD SHIFT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePilihTempatProject('TREEMAS SOLUSI UTAMA')}
        style={styles.item}>
        <Text style={styles.tempatProject}>TREEMAS SOLUSI UTAMA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePilihTempatProject('BANK UOB')}
        style={styles.item}>
        <Text style={styles.tempatProject}>BANK UOB</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePilihTempatProject('CTBC BANK')}
        style={styles.item}>
        <Text style={styles.tempatProject}>CTBC BANK</Text>
      </TouchableOpacity>
      <View style={styles.batasBawah} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderColor: Color.white,
    paddingVertical: 10,
  },
  tempatProject: {
    color: Color.white,
    fontFamily: text.regular,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  batasBawah: {
    marginVertical: 10,
  },
});

export default DropdownApproval;
