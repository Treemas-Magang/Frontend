/* eslint-disable prettier/prettier */
/* eslint-disable jsx-quotes */
import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import ButtonPilihKategori from '../atoms/ButtonPilihKategori';

const KategoriApproval = ({keyKategori}) => {
  const [typeApproval, setTypeApproval] = useState('');

  const kategoriList = [
    {key: 'absen-pulang', label: 'ABSEN PULANG'},
    {key: 'absen', label: 'ABSEN'},
    {key: 'absen-web', label: 'ABSENSI WEB'},
    {key: 'reimburse', label: 'REIMBURSE'},
    {key: 'cuti', label: 'CUTI'},
    {key: 'cuti-web', label: 'CUTI WEB'},
    {key: 'sakit', label: 'SAKIT'},
    {key: 'general-param', label: 'GENERAL PARAM'},
    {key: 'cancel-cuti', label: 'CANCEL CUTI'},
  ];
  const handleTypeApproval = value => {
    setTypeApproval(value);
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
