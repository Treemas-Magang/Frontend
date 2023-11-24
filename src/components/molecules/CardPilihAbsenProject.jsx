/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { setIsWFH } from '../../redux';
const CardPilihAbsenProject = ({navigation}) => {
    const dispatch = useDispatch();
    const {dataProject} = useSelector(state => state.ProjectYangDipilihReducer);
    console.log('dataProject dari reducer : ', dataProject);
  const moveTo = (tujuan, isWFH) => {
    dispatch(setIsWFH('isWFH', isWFH));
    navigation.navigate(tujuan);
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => moveTo('absensi', '0')}
        style={styles.CardPilihProject}>
        <Text style={styles.Text}>ON SITE</Text>
        <Text style={styles.TextDeskripsi}>
          {dataProject.alamat}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.CardPilihProject}
        onPress={() => moveTo('absensi', '1')}>
        <Text style={styles.Text}>WORK FROM HOME</Text>
        <Text style={styles.TextDeskripsi}>
          jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
          Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardPilihAbsenProject;

const styles = StyleSheet.create({
  CardPilihProject: {
    backgroundColor: 'transparent',
    borderColor: Color.green,
    borderWidth: 2,
    width: wp('70%'),
    minHeight: hp('15'),
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontFamily: text.semiBold,
    fontSize: 16,
    color: Color.green,
    paddingVertical: 10,
  },
  TextDeskripsi: {
    fontFamily: text.extraLight,
    fontSize: 10,
    marginBottom: 20,
    color: Color.black,
    paddingHorizontal: 20,
    textAlign: 'justify',
  },
});
