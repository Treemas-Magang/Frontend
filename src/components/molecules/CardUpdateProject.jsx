/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Color} from '../../utils/color';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFileInvoice} from '@fortawesome/free-solid-svg-icons';

const CardUpdateProject = ({title, alamat, value, onValueChange}) => {

  return (
        <View style={{flexDirection: 'column'}}>
          <View
            style={styles.cardUpdate}>
            <FontAwesomeIcon
              icon={faFileInvoice}
              size={50}
              color={Color.white}
            />
            <View style={{width: 180}}>
              <Text>{title}</Text>
              <Text style={{textAlign:'justify'}} numberOfLines={3}>{alamat}</Text>
            </View>
            <CheckBox
              value={value}
              onValueChange={onValueChange}
            />
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
    cardUpdate:{
              backgroundColor: Color.green,
              height: 90,
              width: 295,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
              gap: 8,
              borderRadius: 10
            }
})

export default CardUpdateProject;
