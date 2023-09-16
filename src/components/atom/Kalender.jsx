/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const Kalender = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const minDate = new Date(); // Hari ini
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear(), 11, 31);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';
console.log(startDate);
console.log(endDate)
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  return (
    <View style={styles.container}>
      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
        minDate={minDate}
        maxDate={maxDate}
        todayBackgroundColor="#000000"
        selectedDayColor="#730e6"
        selectedDayTextColor="#FFFFFF"
        onDateChange={onDateChange}
      />

      <View>
        <Text>SELECTED START DATE: {startDate}</Text>
        <Text>SELECTED END DATE: {endDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
    // position: 'absolute'
  },
});
export default Kalender;
