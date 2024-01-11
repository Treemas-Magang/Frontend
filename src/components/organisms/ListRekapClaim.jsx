/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import CardRekapClaim from '../molecules/CardRekapClaim';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';
import {API_GABUNGAN} from '@env';
import LottieView from 'lottie-react-native';
import SkeletonCardRekapClaim from '../skeleton/SkeletonCardRekapClaim';

const ListRekapClaim = ({navigation}) => {
  const [claim, setClaim] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getDataClaim = async headers => {
    try {
      const response = await axios.get(
        API_GABUNGAN + '/api/rekap/get-rekap-claim',
        {
          headers,
        },
      );
      console.log(response.data.data);
      const dataAPI = response.data.data;

      console.log('data Claim : ', dataAPI);
      setClaim(dataAPI);

      setIsLoading(false);
    } catch (error) {
      console.log('Tidak dapat mengambil data ', error.response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataFromSession('token')
      .then(token => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        getDataClaim(headers);
      })
      .catch(error => console.log(error));
  }, []);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = {weekday: 'long', day: 'numeric', month: 'long'};

    let formattedDate = date.toLocaleDateString('id-ID', options);
    formattedDate = formattedDate.replace(/,/g, '');

    return formattedDate;
  };

  const moveToPreview = async id => {
    // console.log('ini id', id);
    navigation.navigate('previewPhotoAPI', {
      path: `/api/rekap/get-detail-claim?id=${id}`,
    });
  };

  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View style={styles.wrapKeteranganClaim}>
        <View
          style={{
            width: wp('100%'),
            height: hp('20%'),
            justifyContent: 'center',
          }}>
          <Text style={styles.Judul}>CLAIM</Text>
        </View>
      </View>
      <View style={styles.backgroundCardClaim}>
        {isLoading ? (
          <View style={{flex: 1}}>
            <SkeletonCardRekapClaim />
            <SkeletonCardRekapClaim />
            <SkeletonCardRekapClaim />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {claim.length > 0 ? (
              claim.map((claim, index) => (
                <View key={index} style={{flexDirection: 'column'}}>
                  <CardRekapClaim
                    navigation={navigation}
                    tanggal={formatDate(claim.tanggal) || '-'}
                    type={claim.tipeClaimEntity?.keterangan || '-'}
                    keterangan={claim.keterangan || '-'}
                    nominal={claim.nominal || '-'}
                    image64={claim.gambarnya}
                    onPress={() => moveToPreview(claim.id)}
                  />
                </View>
              ))
            ) : (
              // Handle the case when dataApp is not an array
              <View style={styles.wrapDataNotFound}>
                <LottieView
                  source={require('../../assets/animation/dataNotFound.json')}
                  autoPlay
                  style={{
                    width: '100%',
                    height: '70%',
                  }}></LottieView>
                <Text style={styles.textDataNotFound}>
                  Tidak Ada Data Rekap Claim
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default ListRekapClaim;

const styles = StyleSheet.create({
  backgroundCardClaim: {
    backgroundColor: Color.white,
    paddingTop: 50,
    alignItems: 'center',
    flex: 1,
    gap: 10,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('7%'),
    color: Color.blue,
    textTransform: 'uppercase',
  },
  wrapKeteranganClaim: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapDataNotFound: {
    width: wp('90%'),
    height: hp('55%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDataNotFound: {
    fontFamily: text.semiBold,
    color: Color.blue,
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
