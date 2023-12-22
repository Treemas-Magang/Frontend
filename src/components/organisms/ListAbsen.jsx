/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';
import {API_GABUNGAN} from '@env';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowDownShortWide} from '@fortawesome/free-solid-svg-icons';

import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import CardListAbsen from '../molecules/CardListAbsen';
import SkeletonCardAbsen from '../skeleton/SkeletonCardAbsen';
import DropdownListAbsenByProject from '../atoms/DropdownListAbsenByProject';

const ListAbsen = ({navigation}) => {
  const [dataAbsens, setDataAbsens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdown, setIsDropdown] = useState(false);
  const [parentIsSort, setParentIsSort] = useState('all-project');

 const getDataAbsen = async headers => {
   try {
     const response = await axios.get(
       `${API_GABUNGAN}/api/rekap/get-rekap-absen`,
       {headers},
     );
     const dataAPI = response.data.data;

     let sortedData = [...dataAPI];

     if (parentIsSort !== 'all-project') {
       // Filter data based on projectId, ensuring projectId is not null
       sortedData = sortedData.filter(
         item => item.projectId && item.projectId.projectId === parentIsSort,
       );
     }

     console.log('Filtered Data Absen: ', sortedData);
     setDataAbsens(sortedData);

     setIsLoading(false);
   } catch (error) {
     console.error('Gagal mengambil data', error.message);
     setIsLoading(false);
   }
 };


  useEffect(() => {
    getDataFromSession('token')
      .then(token => {
        const headers = {Authorization: `Bearer ${token}`};
        getDataAbsen(headers);
      })
      .catch(error => console.error(error));
  }, [parentIsSort]);

  const moveTo = (tujuan, id) => {
    navigation.navigate(tujuan, {id});
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = {weekday: 'long', day: 'numeric', month: 'long'};

    let formattedDate = date.toLocaleDateString('id-ID', options);
    formattedDate = formattedDate.replace(/,/g, '');

    return formattedDate;
  };

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleSortOptionSelected = selectedSortOption => {
    if (selectedSortOption !== parentIsSort) {
      setParentIsSort(selectedSortOption);
    }
  };

  return (
    <View style={styles.background}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View style={styles.wrapAbsen}>
        <Text style={styles.judul}>ABSEN</Text>
      </View>
      <View style={styles.wrapCardAbsen}>
        {isDropdown && (
          <DropdownListAbsenByProject
            onSelectSortOption={handleSortOptionSelected}
          />
        )}
        <TouchableOpacity onPress={handleDropdown} style={styles.iconDrop}>
          <FontAwesomeIcon
            icon={faArrowDownShortWide}
            size={30}
            color={Color.blue}
          />
        </TouchableOpacity>
        {isLoading ? (
          <View style={styles.wrapSkeleton}>
            <SkeletonCardAbsen />
            <SkeletonCardAbsen />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {dataAbsens.length > 0 ? (
              dataAbsens.map((dataAbsen, index) => (
                <CardListAbsen
                  key={index}
                  onPress={() => moveTo('detailAbsen', dataAbsen.id)}
                  navigation={navigation}
                  tanggal_absen={formatDate(dataAbsen.tglAbsen) || '-'}
                  jam_masuk={dataAbsen.jamMsk?.substring(0, 5) || '-'}
                  jam_pulang={dataAbsen.jamPlg?.substring(0, 5) || '-'}
                  lokasi_masuk={dataAbsen.lokasiMsk || '-'}
                  lokasi_pulang={dataAbsen.lokasiPlg || '-'}
                  status={
                    dataAbsen.status === 'Absen'
                      ? 'Absen'
                      : dataAbsen.status === 'Sakit'
                      ? 'Sakit'
                      : dataAbsen.status === 'Libur'
                      ? 'Libur'
                      : ''
                  }
                />
              ))
            ) : (
              <View style={styles.wrapDataNotFound}>
                <LottieView
                  source={require('../../assets/animation/dataNotFound.json')}
                  autoPlay
                  style={{width: '100%', height: '70%'}}
                />
                <Text style={styles.textDataNotFound}>
                  Tidak Ada Data Absen
                </Text>
              </View>
            )}
          </ScrollView>
        )}
        <View style={styles.wrapStatus}>
          <View style={styles.simbolStatus} />
          <Text>Sakit/Izin</Text>
        </View>
      </View>
    </View>
  );
};

export default ListAbsen;

const styles = StyleSheet.create({
  background: {
    backgroundColor: Color.green,
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  wrapAbsen: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapCardAbsen: {
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
  wrapStatus: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    right: 45,
  },
  simbolStatus: {
    width: 15,
    height: 15,
    backgroundColor: Color.cardSakit,
    borderRadius: 15,
  },
  wrapDataNotFound: {
    width: wp('90%'),
    height: hp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDataNotFound: {
    fontFamily: text.semiBold,
    color: Color.blue,
    fontSize: 16,
    textTransform: 'uppercase',
  },
  wrapSkeleton: {
    backgroundColor: Color.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    gap: 10,
  },
  iconDrop: {
    position: 'absolute',
    left: 15,
    top: 20,
  },
});
