/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Color } from '../../utils/color';
import { text } from '../../utils/text';
import moment from 'moment';
import axios from 'axios';
const KalenderRange = (props) => {
const [selectedStartDate, setSelectedStartDate] = useState(null);
const [selectedEndDate, setSelectedEndDate] = useState(null);
const [dataTglLibur, setDataTglLibur] = useState([]);
const [dataTglCutiBersama, setDataTglCutiBersama] = useState([]);
const minDate = new Date(); // Hari ini
const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear(), 11, 31);
const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
};

//get data tanggal libur dari API

useEffect(() => {
  const getData = async () => {
    // setIsLoading(true);
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAxIiwiaWF0IjoxNzAwMDM4Nzc2LCJleHAiOjE3MDAxMjUxNzZ9.DVH7JQtomcx6B1RKOjrPZxLbjbn-u1NCBAWmdD17x0U';
    try {
      const headers = {
        // Authorization: `Bearer ${token}`,
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        'https://treemas-api-403500.et.r.appspot.com/api/master-data/libur-view',
        {headers},
      );
      const data = response.data.data;
      // Ambil hanya tanggal libur dari data dan setel ke dalam state
      // Filter objek berdasarkan isCutiBersama dan ambil hanya tanggal liburnya
      const tanggalLiburNonCutiBersama = data
        .filter(item => item.isCutiBersama === '0')
        .map(item => item.tglLibur);

      const tanggalLiburCutiBersama = data
        .filter(item => item.isCutiBersama !== '0')
        .map(item => item.tglLibur);

      // Simpan kedua kelompok tanggal libur dalam state
      setDataTglCutiBersama(tanggalLiburNonCutiBersama);
      setDataTglLibur(tanggalLiburCutiBersama);
      // setIsLoading(false);
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };
  getData()
}, []);

console.log('tgl merah : ', dataTglLibur)
console.log('tgl cuti bersama : ',dataTglCutiBersama)
// Daftar tanggal yang ingin diabaikan
const cutiBersama = dataTglCutiBersama;
const tanggalMerah = dataTglLibur;

const startDate = selectedStartDate ? formatDate(selectedStartDate) : '';
const endDate = selectedEndDate ? formatDate(selectedEndDate) : '';

const objStartDate = moment(startDate, 'YYYY-MM-DD').toDate();
const objEndDate = moment(endDate, 'YYYY-MM-DD').toDate();

// console.log('tanggal awal cuti', startDate);
// console.log('tanggal selesai cuti', endDate);

if (!objStartDate || !objEndDate) {
  console.log('Format tanggal tidak valid');
} else {

  let jumlahCutiAtauSakit = 0;
  let jumlahCutiBersama = 0;
  let jumlahTanggalMerah = 0;
  let currentDate = moment(objStartDate);

  while (currentDate.isSameOrBefore(objEndDate)) {
    // Periksa apakah tanggal saat ini ada dalam daftar cuti bersama
    if (cutiBersama.includes(currentDate.format('YYYY-MM-DD'))) {
      jumlahCutiBersama++; // Tanggal diabaikan
    }
    // Periksa apakah tanggal saat ini ada dalam daftar tanggal merah
    else if (tanggalMerah.includes(currentDate.format('YYYY-MM-DD'))) {
      jumlahTanggalMerah++;
    }
    // Jika tidak termasuk dalam cuti bersama atau tanggal merah dan bukan hari Sabtu/Minggu
    else if (currentDate.day() !== 6 && currentDate.day() !== 0) {
      jumlahCutiAtauSakit++;
    }
    currentDate.add(1, 'days');
  }

  // console.log('Jumlah cuti: ', jumlahCutiAtauSakit);
  // console.log('Jumlah cuti bersama: ', jumlahCutiBersama);
  // console.log('Jumlah tanggal merah: ', jumlahTanggalMerah);

  // Cari tanggal setelah endDate yang juga bukan termasuk dalam cuti bersama atau tanggal merah
let nextDate = currentDate.clone();
let tanggalMasuk = '';
while (true) {
  nextDate.add(1, 'days');
  if (!nextDate.isValid()) {
    // Tanggal tidak valid, hentikan perulangan
    break;
  }
  if (
    !cutiBersama.includes(nextDate.format('YYYY-MM-DD')) &&
    !tanggalMerah.includes(nextDate.format('YYYY-MM-DD')) &&
    (nextDate.day() !== 6 && nextDate.day() !== 0)
  ) {
    tanggalMasuk = nextDate.format('YYYY-MM-DD');
    console.log('Tanggal Masuk : ', tanggalMasuk);
    break;
  }
}
 if (props.onDataReady) {
      props.onDataReady({
        jumlahCutiAtauSakit,
        jumlahCutiBersama,
        jumlahTanggalMerah,
        tanggalMasuk,
        startDate,
        endDate,
         // Anda perlu mengisinya dengan nilai yang sesuai
      });
    }
}

const hari = ['sen', 'sel', 'rab', 'kam', 'jum', 'sab', 'min'];



  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

const customDatesStyles = {};
  cutiBersama.forEach((date) => {
    customDatesStyles[moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')] = {
      textStyle: { color: 'red' }, // Warna merah untuk tanggal yang diabaikan
    };
  });

  return (
    <View style={styles.container}>
      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
        minDate={minDate}
        maxDate={maxDate}
        todayBackgroundColor= {Color.green}
        selectedDayColor={Color.blue}
        textStyle={text.regular}
        selectedDayTextColor="#ffffff"
        onDateChange={onDateChange}
        nextTitle="selanjutnya"
        previousTitle="sebelumnya"
        maxRangeDuration={12}
        weekdays={hari}
        showDayStragglers={true}
        scrollable={true}
        width={300}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    marginTop: 100,
    // position: 'absolute'
  },
});
export default KalenderRange;
