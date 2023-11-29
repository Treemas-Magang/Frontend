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
 * Komponen DropdownClaim digunakan untuk membuat dropdown pilihan jenis klaim.
 *
 * @param {function} data - Fungsi untuk mengirim nilai jenis klaim yang dipilih ke komponen induk.
 * @param {function} idTypeClaim - Fungsi untuk mengirim ID jenis klaim yang dipilih ke komponen induk.
 * @param {Array} dataType - Array yang berisi data jenis klaim.
 * @returns {JSX.Element} - Komponen React untuk dropdown pilihan jenis klaim.
 */
const DropdownClaim = ({data, idTypeClaim, dataType}) => {
  const [type, setType] = useState('');
  const [idType, setIdtype] = useState('');
  const [dataClaim, setDataClaim] = useState([]);

  /**
   * Fungsi useEffect pertama digunakan untuk mengirim nilai jenis klaim dan ID jenis klaim yang dipilih ke komponen induk.
   */
  useEffect(() => {
    data(type);
    idTypeClaim(idType);
  }, [type, idType, data, idTypeClaim]);

  /**
   * Fungsi handlePilihType digunakan untuk menangani pemilihan jenis klaim.
   * @param {string} keterangan - Keterangan jenis klaim yang dipilih.
   * @param {string} id - ID jenis klaim yang dipilih.
   */
  const handlePilihType = (keterangan, id) => {
    setType(keterangan);
    setIdtype(id);
  };

  /**
   * Fungsi useEffect kedua digunakan untuk mengatur data jenis klaim yang akan ditampilkan.
   */
  useEffect(() => {
    setDataClaim(dataType);
  }, [dataType]);

  return (
    <ScrollView style={{height: 200}} nestedScrollEnabled={true}>
      {dataClaim?.length ? (
        dataClaim.map((claims, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePilihType(claims.keterangan, claims.idClaim)}
            style={styles.item}>
            <Text style={styles.tempatProject}>{claims.keterangan}</Text>
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

export default DropdownClaim;
