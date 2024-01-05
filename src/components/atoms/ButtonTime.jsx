/* eslint-disable prettier/prettier */
import {faClock, faClockFour} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Color} from '../../utils/color';
const ButtonTime = ({style, onData}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [defaultTime, setDefaultTime] = useState(() => {
    const defaultDate = new Date();
    defaultDate.setHours(18, 0, 0, 0);
    return defaultDate;
  });
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = time => {
    hideDatePicker();
    let waktu = time.toLocaleTimeString();
    let waktuBaru = waktu.replace(/\./g, ':');
    setSelectedTime(waktuBaru);
    console.log(waktuBaru)
    onData(waktuBaru);
  };

  return (
    <View style={style}>
      <TouchableOpacity onPress={showDatePicker}>
        <FontAwesomeIcon icon={faClock} size={25} color={Color.green} />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        date={defaultTime}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {/* <View>
        <Text>Selected Time: {selectedTime}</Text>
      </View> */}
    </View>
  );
};

export default ButtonTime;
