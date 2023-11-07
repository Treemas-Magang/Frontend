/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import CardNotif from '../molecules/CardNotif';
import {Color} from '../../utils/color';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';
import SkeletonCardNotif from '../skeleton/SkeletonCardNotif';

const ListPengumuman = ({navigation}) => {
  const [isOpen, setIsopen] = useState(true);
  const [dataPengumuman, setDataPengumuman] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getDataFromSession('token')
      .then(token => {
        if (token !== null) {
          getData(token); // Panggil getData setelah menerima token
        } else {
          console.log('Data tidak ditemukan di session.');
        }
      })
      .catch(error => {
        console.error('Terjadi kesalahan dalam getDataFromSession:', error);
      });
  }, []);

  const getData = async token => {
    console.log('ini token : ', token);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        'https://treemas-api-403500.et.r.appspot.com/api/master-data/announcement-view',
        {headers},
      );
      const data = response.data.data;
      setDataPengumuman(data);
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };
  const moveTo = (tujuan, judul, deskripsi, usrCrt, image) => {
    navigation.navigate(tujuan, {
      judul: judul,
      deskripsi: deskripsi,
      usrCrt: usrCrt,
      image: image,
    });
  };
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <Image
        style={styles.VectorAtas}
        source={require('../../assets/vector/VectorAtas.png')}
      />
      <View
        style={{
          width: wp('100%'),
          height: hp('20%'),
          justifyContent: 'center',
        }}>
        <Text style={styles.Judul}>Pengumuman</Text>
      </View>
      <View style={styles.backgroundCardNotif}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <>
              <SkeletonCardNotif />
              <SkeletonCardNotif />
              <SkeletonCardNotif />
              <SkeletonCardNotif />
              <SkeletonCardNotif />
            </>
          ) : (
            dataPengumuman.map((Pengumuman, index) => (
              <CardNotif
                key={index}
                onPress={() =>
                  moveTo(
                    'detailPengumuman',
                    Pengumuman.header,
                    Pengumuman.note,
                    Pengumuman.usrCrt,
                    Pengumuman.image64,
                  )
                }
                deskripsi={Pengumuman.note}
                tanggal={Pengumuman.tglUpload}
                judul={Pengumuman.header}
                navigation={navigation}
              />
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ListPengumuman;

const styles = StyleSheet.create({
  backgroundCardNotif: {
    backgroundColor: Color.white,
    paddingTop: 50,
    alignItems: 'center',
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    height: hp('90%'),
    paddingBottom: 90,
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  VectorAtas: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
