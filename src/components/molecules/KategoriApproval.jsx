/* eslint-disable prettier/prettier */
/* eslint-disable jsx-quotes */
import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import ButtonPilihKategori from '../atoms/ButtonPilihKategori';

const KategoriApproval = () => {
  const [typeApproval, setTypeApproval] = useState('');
  const handleTypeApproval = value => {
    setTypeApproval(value);
  };
  if (typeApproval) {
    console.log('type : ', typeApproval);
  } else {
    console.log('typeApproval masih kosong');
  }
  return (
    <View style={styles.wrappPilihan}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ButtonPilihKategori
          onPress={() => handleTypeApproval('libur')}
          lebel="LIBUR"
        />
        <View style={styles.gap} />
        <ButtonPilihKategori
          onPress={() => handleTypeApproval('lembur')}
          lebel="LEMBUR"
        />
        <View style={styles.gap} />
        <ButtonPilihKategori
          onPress={() => handleTypeApproval('lupa pulang')}
          lebel="LUPA PULANG"
        />
        <View style={styles.gap} />
        <ButtonPilihKategori
          onPress={() => handleTypeApproval('update absensi')}
          lebel="UPDATE ABSENSI"
        />
        <View style={styles.gap} />
        <ButtonPilihKategori
          onPress={() => handleTypeApproval('absensi form')}
          lebel="ABSENSI FORM"
        />
        <View style={styles.gap} />
        <ButtonPilihKategori
          onPress={() => handleTypeApproval('cuti')}
          lebel="CUTI"
        />
        <View style={styles.gap} />
        <ButtonPilihKategori
          onPress={() => handleTypeApproval('cuti form')}
          lebel="CUTI FORM"
        />
        <View style={styles.gap} />
        <ButtonPilihKategori
          onPress={() => handleTypeApproval('sakit')}
          lebel="SAKIT"
        />
        <View style={styles.gap} />
        <ButtonPilihKategori
          onPress={() => handleTypeApproval('cancel cuti')}
          lebel="CANCEL CUTI"
        />
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
