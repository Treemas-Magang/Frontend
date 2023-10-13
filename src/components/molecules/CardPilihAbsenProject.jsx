import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import ButtonBack from '../atoms/ButtonBack';

const CardPilihAbsenProject = ({navigation}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <View>
      <ButtonBack
        navigation={navigation}
        style={{
          position: 'absolute',
          top: -250,
          left: -40,
        }}
      />
      <Image
        style={styles.VectorAtasKanan}
        source={require('../../assets/vector/VectorKananAtas.png')}
      />
      <TouchableOpacity style={styles.CardPilihProject}>
        <Text style={styles.Text}>ON SITE</Text>
        <Text style={styles.TextDeskripsi}>
          jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
          Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.CardPilihProject}
        onPress={() => moveTo('formAbsensi')}>
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
    width: 269,
    minHeight: 100,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Color.green,
    paddingVertical: 10,
  },
  TextDeskripsi: {
    fontFamily: 'Poppins-ExtraLight',
    fontSize: 10,
    marginBottom: 20,
    color: Color.black,
    paddingHorizontal: 20,
    textAlign: 'justify',
  },
  VectorAtasKanan: {
    position: 'absolute',
    top: -270,
    right: -70,
    zIndex: -1,
  },
});
