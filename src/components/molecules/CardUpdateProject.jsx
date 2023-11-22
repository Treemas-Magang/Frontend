/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Color} from '../../utils/color';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFileInvoice} from '@fortawesome/free-solid-svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {text} from '../../utils/text';
const CardUpdateProject = ({title, alamat, value, onValueChange}) => {
  console.log(value);
  return (
    <View style={{flexDirection: 'column'}}>
      <View style={styles.cardUpdate}>
        <FontAwesomeIcon
          icon={faFileInvoice}
          size={hp('6.5%')}
          color={Color.white}
        />
        <View style={{width: wp('45%')}}>
          <Text style={styles.textTitle}>{title}</Text>
          <Text
            style={{
              fontFamily: text.semiBold,
              fontSize: 12,
            }}
            numberOfLines={3}>
            {alamat}
          </Text>
        </View>
        <CheckBox value={value} onValueChange={onValueChange} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardUpdate: {
    backgroundColor: Color.green,
    height: hp('15%'),
    width: wp('75%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
    borderRadius: 10,
  },
  textTitle: {
    fontFamily: text.semiBold,
    fontSize: 12,
    color: Color.black,
    textTransform: 'uppercase',
    width: wp('50%'),
  },
});

export default CardUpdateProject;
