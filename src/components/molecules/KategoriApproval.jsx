/* eslint-disable prettier/prettier */
/* eslint-disable jsx-quotes */
import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import ButtonPilihKategori from '../atoms/ButtonPilihKategori';
import {Color} from '../../utils/color';
import { useSelector } from 'react-redux';

const KategoriApproval = ({keyKategori}) => {
    const {
      sakit,
      cuti,
      absen_pulang,
      absen_web,
      reimburse,
      cuti_web,
      cancel_cuti,
      libur,
      lembur,
    } = useSelector(state => state.jmlNotifMasingMasingApprovalReducer);
    console.log('jumlah absen web', absen_web);
  const [typeApproval, setTypeApproval] = useState('');
  const [kategoriList, setKategoriList] = useState([
    {key: 'sakit', label: 'SAKIT', jmlNotif: sakit , active: true},
    {key: 'cuti', label: 'CUTI', jmlNotif: cuti , active: false},
    {key: 'absen-pulang', label: 'ABSEN PULANG', jmlNotif: absen_pulang , active: false},
    {key: 'absen-web', label: 'ABSENSI WEB', jmlNotif: absen_web , active: false},
    {key: 'reimburse', label: 'REIMBURSE', jmlNotif: reimburse , active: false},
    {key: 'cuti-web', label: 'CUTI WEB', jmlNotif: cuti_web , active: false},
    {key: 'cancel-cuti', label: 'CANCEL CUTI', jmlNotif: cancel_cuti , active: false},
    {key: 'libur', label: 'LIBUR', jmlNotif: libur , active: false},
    {key: 'lembur', label: 'LEMBUR', jmlNotif: lembur , active: false},
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
              jmlNotif={kategori.jmlNotif}
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
