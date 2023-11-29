/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import CardCekCuti from '../molecules/CardCekCuti';
import {text} from '../../utils/text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import Kalender from '../molecules/Kalender';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import VectorAtasKecil from '../atoms/VectorAtasKecil';

const ListCekCuti = ({navigation}) => {
  const [showKalender, setShowKalender] = useState(false);
  const [cekCutis, setcekCutis] = useState([
    {
      nik: '2010210',
      nama: 'Azriel FachrulRezy',
    },
    {
      nik: '2012412',
      nama: 'Rizki',
    },
    {
      nik: '213114',
      nama: 'Andi',
    },
    {
      nik: '214122',
      nama: 'Aliy',
    },
    {
      nik: '213445',
      nama: 'Diva',
    },
    {
      nik: '34223',
      nama: 'asda',
    },
    {
      nik: '342113',
      nama: 'dsfas',
    },
    {
      nik: '13221',
      nama: 'qwrwq',
    },
  ]);

  const handleCalender = () => {
    setShowKalender(!showKalender);
  };
  console.log(showKalender);
  return (
    <View style={styles.background}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View style={styles.wrapCekCuti}>
        <Text style={styles.judul}>CEK CUTI</Text>
      </View>
      <View style={styles.backgroundCardCekCuti}>
        <View style={styles.wrapTanggal}>
          <Text style={{fontFamily: text.semiBold, color: Color.black}}>
            Tanggal
          </Text>
          <Text style={{fontFamily: text.semiBoldItalic, color: Color.black}}>
            September 15 2023
          </Text>
        </View>
        <ScrollView
          style={{maxHeight: 570}}
          showsVerticalScrollIndicator={false}>
          {cekCutis.map((cekCuti, index) => (
            <View key={index} style={{flexDirection: 'column'}}>
              <CardCekCuti nik={cekCuti.nik} nama={cekCuti.nama} />
            </View>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={{position: 'absolute', bottom: 30, right: 34}}
        onPress={handleCalender}>
        <FontAwesomeIcon icon={faCalendarAlt} size={50} color={Color.blue} />
      </TouchableOpacity>
      {showKalender && (
        <View style={{position: 'absolute', bottom: 80, right: 34}}>
          <Kalender />
        </View>
      )}
    </View>
  );
};

export default ListCekCuti;

const styles = StyleSheet.create({
  background: {
    backgroundColor: Color.green,
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  wrapCekCuti: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCardCekCuti: {
    flex: 6,
    backgroundColor: Color.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    position: 'relative',
  },
  judul: {
    fontFamily: text.semiBold,
    fontSize: 26,
    color: Color.blue,
  },
  Kalender: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    backgroundColor: Color.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.black,
    width: 280,
    marginVertical: 20,
    padding: 10,
    alignItems: 'center',
  },
  wrapTanggal: {
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    left: 45,
  },
});
