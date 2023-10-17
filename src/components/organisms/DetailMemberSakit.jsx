import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';

const DetailMemberSakit = ({navigation}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack
        navigation={navigation}
        style={{position: 'absolute', top: 20, left: 20}}
      />
      <ButtonHome
        navigation={navigation}
        style={{position: 'absolute', top: 20, right: 20}}
      />
      <Image
        style={styles.VectorAtas}
        source={require('../../assets/vector/VectorAtas.png')}
      />
      <Text style={styles.Judul}>DETAIL Member</Text>
      <View style={styles.backgrounDetailSakit}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: Color.green,
                borderRadius: 100,
                alignItems: 'center',
              }}></View>
          </View>
          <View>
            <Text style={styles.TextTitle}>Nik</Text>
            <Text style={styles.TextDeskripsi}>2912312</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Nama</Text>
            <Text style={styles.TextDeskripsi}>Azriel FachrulRezy</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Tanggal Mulai</Text>
            <Text style={styles.TextDeskripsi}>05-06-2023</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Tanggal Selesai</Text>
            <Text style={styles.TextDeskripsi}>08-06-2023</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Tanggal Masuk</Text>
            <Text style={styles.TextDeskripsi}>10-06-2023</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Total Sakit (Hari)</Text>
            <Text style={styles.TextDeskripsi}>1</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Keterangan</Text>
            <Text style={styles.TextDeskripsi}>Diare</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Alamat</Text>
            <Text style={{textAlign: 'justify'}}>
              jl. boulevard graha raya blok N1 no.21, RT.4/RW.8, Paku jaya, Kec.
              Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia
            </Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>User Approval</Text>
            <Text style={styles.TextDeskripsi}>Dede Sunandar</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Tanggal Approval</Text>
            <Text style={styles.TextDeskripsi}>19-04-2023</Text>
          </View>
          <View>
            <Text style={styles.TextTitle}>Catatan Approval</Text>
            <Text style={styles.TextDeskripsi}>GWS</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailMemberSakit;

const styles = StyleSheet.create({
  backgrounDetailSakit: {
    backgroundColor: Color.white,
    paddingTop: 50,
    paddingHorizontal: 29,
    flex: 1,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    marginTop: -50,
  },
  Judul: {
    textAlign: 'center',
    marginVertical: 112,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 26,
    color: Color.blue,
    textTransform: 'uppercase',
  },
  VectorAtas: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
  TextTitle: {
    fontFamily: text.semiBoldItalic,
    color: Color.black,
    textTransform: 'uppercase',
    marginVertical: 2,
  },
  TextDeskripsi: {
    fontFamily: text.light,
    marginVertical: 2,
  },
});
