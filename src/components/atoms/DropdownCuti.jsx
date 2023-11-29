/* eslint-disable prettier/prettier */

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

/**
 * Komponen DropdownCuti digunakan untuk membuat dropdown pilihan jenis cuti.
 *
 * @param {function} data - Fungsi untuk mengirim nilai jenis cuti yang dipilih ke komponen induk.
 * @param {function} idTypeCuti - Fungsi untuk mengirim ID jenis cuti yang dipilih ke komponen induk.
 * @param {Array} dataType - Array yang berisi data jenis cuti.
 * @returns {JSX.Element} - Komponen React untuk dropdown pilihan jenis cuti.
 */
const DropdownCuti = ({data, idTypeCuti, dataType}) => {
  const [type, setType] = useState('');
  const [idType, setIdtype] = useState('');
  const [dataCuti, setDataCuti] = useState([]);

  /**
   * Fungsi useEffect pertama digunakan untuk mengirim nilai jenis cuti dan ID jenis cuti yang dipilih ke komponen induk.
   */
  useEffect(() => {
    data(type);
    idTypeCuti(idType);
  }, [type, idType, data, idTypeCuti]);

  /**
   * Fungsi handlePilihType digunakan untuk menangani pemilihan jenis cuti.
   * @param {string} cutiDesc - Deskripsi jenis cuti yang dipilih.
   * @param {string} id - ID jenis cuti yang dipilih.
   */
  const handlePilihType = (cutiDesc, id) => {
    setType(cutiDesc);
    setIdtype(id);
  };

  /**
   * Fungsi useEffect kedua digunakan untuk mengatur data jenis cuti yang akan ditampilkan.
   */
  useEffect(() => {
    setDataCuti(dataType);
  }, [dataType]);

  return (
    <ScrollView style={{height: 200}} nestedScrollEnabled={true}>
      {dataCuti?.length ? (
        dataCuti.map((cutis, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePilihType(cutis.cutiDesc, cutis.id)}
            style={styles.item}>
            <Text style={styles.tempatProject}>{cutis.cutiDesc}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <ActivityIndicator size="large" color={Color.white} />
      )}
      <View style={styles.batasBawah} />
    </ScrollView>
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

export default DropdownCuti;
