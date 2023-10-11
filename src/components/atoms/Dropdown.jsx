/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
const Dropdown = ({nama_dropdown}) => {
  const [dataJenisCuti, setDataJenisCuti] = useState('');
  const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
  return (
    <View>
      <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        buttonStyle={styles.buttonStyle}
        defaultButtonText={nama_dropdown}
        buttonTextStyle={styles.buttonTextStyle}
        dropdownIconPosition="right"
        renderDropdownIcon={() => (
          <FontAwesomeIcon icon={faCaretDown} size={30} color={Color.green} />
        )}
        dropdownStyle={styles.dropdown}
        rowTextStyle={styles.rowTextStyle}
      />
      {/* <FontAwesomeIcon icon={faCaretDown} size={30} color={Color.green} style={{position:'absolute', top: 10, right: 5, zIndex:-1}} /> */}
    </View>
  );
};
export default Dropdown;
const styles = StyleSheet.create({
  buttonStyle: {
    borderBottomWidth: 1,
    borderColor: Color.green,
    backgroundColor: 'transparent',
    width: 275,
  },
  buttonTextStyle: {
    textAlign: 'left',
    color: Color.blue,
    fontSize: 19,
    fontFamily: text.light,
  },
  dropdown: {
    backgroundColor: Color.green,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  rowTextStyle: {
    color: Color.white,
    textAlign: 'left',
  },
});
