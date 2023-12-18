/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useRoute} from '@react-navigation/native';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import axios from 'axios';
import {API_URL, API_GABUNGAN} from '@env';
import {getDataFromSession} from '../../utils/getDataSession';

const DetailPengumuman = ({navigation}) => {
  const {id} = useRoute().params;
  console.log(id);
  const [dataDetailPengumuman, setDataDetailPengumuman] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const base64 = `data:image/jpeg;base64,${dataDetailPengumuman.image64}`;
  console.log('base64 : ',base64)
  const moveToPreview = () => {
    navigation.navigate('previewPhoto', {photo: base64});
  };
  useEffect(() => {
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
    setIsLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `${API_GABUNGAN}/api/master-data/announcement-view/${id}`,
        {headers},
      );
      const dataAPI = response.data.data;
      console.log(dataAPI);
      setDataDetailPengumuman(dataAPI[0]);
      setIsLoading(false);
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };
  console.log(dataDetailPengumuman.note)
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View
        style={{
          width: wp('100%'),
          height: hp('20%'),
          justifyContent: 'center',
        }}>
        <Text style={styles.Judul}>Detail </Text>
        <Text style={styles.Judul}>Pengumuman </Text>
      </View>
      <View style={styles.backgroundCardPengumuman}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={Color.green} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={{
                fontFamily: text.semiBold,
                fontSize: 18,
                textAlign: 'center',
                color: Color.blue,
              }}>
              {dataDetailPengumuman.title}
            </Text>
            <Text
              style={{
                fontFamily: text.regular,
                fontSize: 12,
                textAlign: 'justify',
                width: 350,
              }}>
              {dataDetailPengumuman.note}
            </Text>
            <Text
              style={{
                fontFamily: text.regular,
                fontSize: 12,
                width: 320,
              }}>
              Regards,
            </Text>
            <Text
              style={{
                fontFamily: text.regular,
                fontSize: 12,
                width: 320,
              }}>
              HR Division
            </Text>
            <Text
              style={{
                fontFamily: text.regular,
                fontSize: 12,
                width: 320,
              }}>
              {dataDetailPengumuman.usrCrt}
            </Text>

            {dataDetailPengumuman.image !== null ? (
              <>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 2,
                      flex: 1,
                      backgroundColor: Color.green,
                      alignSelf: 'center',
                    }}></View>
                  <Text
                    style={{
                      fontFamily: text.semiBoldItalic,
                      fontSize: 12,
                      color: Color.green,
                      textTransform: 'uppercase',
                      marginHorizontal: 10,
                    }}>
                    Lampiran
                  </Text>
                  <View
                    style={{
                      height: 2,
                      flex: 1,
                      backgroundColor: Color.green,
                      alignSelf: 'center',
                    }}></View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity onPress={moveToPreview}>
                    <Image
                      resizeMode="contain"
                      source={{uri: base64}}
                      style={{
                        width: wp('80%'),
                        height: hp('30%'),
                        borderRadius: 5,
                        borderWidth: 4,
                        borderColor: Color.green,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 2,
                      flex: 1,
                      backgroundColor: Color.green,
                      alignSelf: 'center',
                      marginTop: 10,
                    }}></View>
                </View>
              </>
            ) : (
              ''
            )}

            <View
              style={{
                width: '100%',
                height: '50%',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Image
                source={require('../../assets/icons/logo.png')}
                resizeMode="contain"
              />
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default DetailPengumuman;

const styles = StyleSheet.create({
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  backgroundCardPengumuman: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('10%'),
  },
});
