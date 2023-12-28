/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {API_URL, API_GABUNGAN} from '@env';
import { getDataFromSession } from '../../utils/getDataSession';
import axios from 'axios';
const Kalender = ({onDataTglHariIni}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [dataTglCutiBersama, setDataTglCutiBersama] = useState([]);
  const [dataTglMerah, setDataTglMerah] = useState([]);

  const minDate = new Date(); // Hari ini
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear(), 11, 31 + 90);

  const hari = ['sen', 'sel', 'rab', 'kam', 'jum', 'sab', 'min'];

  const onDateChange = date => {
    setSelectedStartDate(date);

    const rawDate = date ? date.date() : '';
    const formattedDate = date
      ? rawDate < 10
        ? `${date.year()}-${date.month() + 1}-0${date.date()}`
        : `${date.year()}-${date.month() + 1}-${date.date()}`
      : null;

    onDataTglHariIni(formattedDate);
  };
    useEffect(() => {
      getDataFromSession('token').then(token => {
        getData(token);
      });
      const getData = async token => {
        // setIsLoading(true);
        try {
          const headers = {
            // Authorization: `Bearer ${token}`,
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.get(
            API_GABUNGAN + '/api/master-data/libur-view',
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
          setDataTglMerah(tanggalLiburNonCutiBersama);
          setDataTglCutiBersama(tanggalLiburCutiBersama);
          // setIsLoading(false);
        } catch (error) {
          console.error('Terjadi kesalahan:', error);
        }
      };
    }, []);
      const getCustomDatesStyles = () => {
        const customStyles = [];

        // Tambahkan gaya untuk tanggal libur
        dataTglCutiBersama.forEach(tglCutiBersama => {
          customStyles.push({
            date: tglCutiBersama, // Tanggal libur
            style: {backgroundColor: Color.cardTelatMasuk}, // Warna latar belakang
            textStyle: {color: 'white'}, // Warna teks
          });
        });

        // Tambahkan gaya untuk tanggal cuti bersama
        dataTglMerah.forEach(tglMerah => {
          customStyles.push({
            date: tglMerah, // Tanggal cuti bersama
            style: {backgroundColor: Color.red}, // Warna latar belakang
            textStyle: {color: 'white'}, // Warna teks
          });
        });

        return customStyles;
      };

  return (
    <View style={styles.container}>
      <CalendarPicker
        startFromMonday={true}
        // minDate={minDate}
        // maxDate={maxDate}
        customDatesStyles={getCustomDatesStyles()}
        todayBackgroundColor={Color.green}
        selectedDayColor={Color.blue}
        textStyle={text.regular}
        selectedDayTextColor="#ffffff"
        onDateChange={onDateChange}
        allowRangeSelection={false} // Set to false to allow only single date selection
        nextTitle="selanjutnya"
        previousTitle="sebelumnya"
        weekdays={hari}
        showDayStragglers={true}
        scrollable={true}
        width={wp('75%')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    marginTop: 100,
    borderWidth: 2,
    borderColor: Color.blue,
    borderRadius: 10,
  },
});

export default Kalender;
