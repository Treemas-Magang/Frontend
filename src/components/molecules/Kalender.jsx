/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const Kalender = ({onDataTglHariIni}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const minDate = new Date(); // Hari ini
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear(), 11, 31);

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

  return (
    <View style={styles.container}>
      <CalendarPicker
        startFromMonday={true}
        minDate={minDate}
        maxDate={maxDate}
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
        width={300}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    marginTop: 100,
  },
});

export default Kalender;
