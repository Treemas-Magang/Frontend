/* eslint-disable prettier/prettier */
/* eslint-disable jsx-quotes */
import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import ButtonPilihKategori from '../atoms/ButtonPilihKategori';
import {Color} from '../../utils/color';

const KategoriApproval = ({keyKategori}) => {
  const [typeApproval, setTypeApproval] = useState('');
  const [kategoriList, setKategoriList] = useState([
    {key: 'sakit', label: 'SAKIT', active: true},
    {key: 'cuti', label: 'CUTI', active: false},
    {key: 'absen-pulang', label: 'ABSEN PULANG', active: false},
    {key: 'absen-web', label: 'ABSENSI WEB', active: false},
    {key: 'reimburse', label: 'REIMBURSE', active: false},
    {key: 'cuti-web', label: 'CUTI WEB', active: false},
    {key: 'general-param', label: 'GENERAL PARAM', active: false},
    {key: 'cancel-cuti', label: 'CANCEL CUTI', active: false},
    {key: 'libur', label: 'LIBUR', active: false},
    {key: 'lembur', label: 'LEMBUR', active: false},
  ]);

  

  const handleTypeApproval = value => {
    setTypeApproval(value);
    const updatedKategoriList = kategoriList.map(kategori =>
      kategori.key === value
        ? {...kategori, active: true}
        : {...kategori, active: false},
    );
    setKategoriList(updatedKategoriList);
  };

  if (typeApproval) {
    keyKategori(typeApproval);
    console.log('type : ', typeApproval);
  } else {
    console.log('typeApproval masih kosong');
  }

  return (
    <View style={styles.wrappPilihan}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {kategoriList.map(kategori => (
          <React.Fragment key={kategori.key}>
            <ButtonPilihKategori
              onPress={() => handleTypeApproval(kategori.key)}
              lebel={kategori.label}
              warna={kategori.active ? Color.skeleton : Color.green}
            />
            <View style={styles.gap} />
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

export default KategoriApproval;

const styles = StyleSheet.create({
  wrappPilihan: {
    width: '90%',
  },
  gap: {
    marginHorizontal: 5,
  },
});
