/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setDataUserAPI, fetchDataUserError} from '../../redux';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';

const dataUser = [{
    nik: 1343431291829,
    nama_karyawan: 'rizki febriansyah',
}]
const DataPribadi = () => {
  const [isNik, setIsNik] = useState('')
const [isNama_karyawan, setIsNamaKaryawan] = useState('')
 const dispatch = useDispatch();
const {data} = useSelector((state) => state.userReducer);
  useEffect(() => {
    // Dispatch the action to set dataUser in Redux store
    dispatch(setDataUserAPI(dataUser));
  }, []);

  useEffect(() => {
  // Pastikan data sudah tersedia sebelum mengaksesnya
  if (data && data.length > 0) {
    const { nik, nama_karyawan } = data[0];
    setIsNik(nik)
    setIsNamaKaryawan(nama_karyawan)
  }
}, [data]);
  return (
    <View
      style={{
        flexDirection: 'row',
        width: 310,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View>
        <Text style={styles.textNama}>{isNama_karyawan}</Text>
        <Text style={styles.textNik}>{isNik}</Text>
      </View>
      <View
        style={{
          width: 83,
          height: 83,
          backgroundColor: Color.blue,
          borderRadius: 100,
        }}></View>
    </View>
  );
};

export default DataPribadi;

const styles = StyleSheet.create({
  textNama: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Color.blue,
    textTransform: 'uppercase',
    width: 200,
  },
  textNik: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Color.blue,
  },
});
