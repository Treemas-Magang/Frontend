/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import KategoriApproval from '../molecules/KategoriApproval';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import DropdownApproval from '../atoms/DropdownApproval';
import CardApproval from '../molecules/CardApproval';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';
import {API_GABUNGAN} from '@env';
import SkeletonCardApproval from '../skeleton/SkeletonCardApproval';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

const ListApproval = ({navigation}) => {
  const [openDropdownApproval, setOpenDropdownApproval] = useState(false);
  const [tempatProject, setTempatProject] = useState('');
  const [idProject, setIdProject] = useState(null);
  const [kategori, setKategori] = useState('sakit');
  const [isLoading, setIsLoading] = useState(true);
  const [dataApp, setDataApp] = useState([]);
  const [onDropdown, setOnDropdown] = useState(false);

  const handleOpenDropdownApproval = () => {
    setOpenDropdownApproval(!openDropdownApproval);
  };

  useEffect(() => {
    if (tempatProject !== '') {
      setOpenDropdownApproval(false);
    }
  }, [tempatProject]);

  const getDataApproval = async (headers, type, id) => {
    try {
      const apiUrl = `${API_GABUNGAN}/api/notif/get-approval?by=${type}&projectId=${id}`;
      const response = await axios.get(apiUrl, {headers});
      console.log('ayam : ',response.data.data);

      let dataAPI;
      switch (type) {
        case 'sakit':
          // Custom logic for 'sakit'
          dataAPI = response.data.data.sakitApproval;
          const cutiDataSakit = dataAPI.filter(item => item.flgKet === 'sakit');
          setDataApp(cutiDataSakit);
          break;

        case 'absen-pulang':
          // Custom logic for 'absen-pulang'
          dataAPI = response.data.data.absenPulangApproval;
          // Additional logic specific to 'absen-pulang'
          setDataApp(dataAPI);
          break;

        case 'absen':
          // Custom logic for 'absen'
          dataAPI = response.data.data;
          // Additional logic specific to 'absen'
          setDataApp(dataAPI);
          break;

        case 'absen-web':
          // Custom logic for 'absen-web'
          dataAPI = response.data.data.absenWebApproval;
          // Additional logic specific to 'absen-web'
          setDataApp(dataAPI);
          break;

        case 'reimburse':
          // Custom logic for 'reimburse'
          dataAPI = response.data.data.reimburseApproval;
          // Additional logic specific to 'reimburse'
          setDataApp(dataAPI);
          break;

        case 'cuti':
          // Custom logic for 'cuti'
          dataAPI = response.data.data.cutiApproval;
          // Additional logic specific to 'cuti'
          const cutiDataCuti = dataAPI.filter(item => item.flgKet === 'cuti');
          setDataApp(cutiDataCuti);
          break;

        case 'cuti-web':
          // Custom logic for 'cuti-web'
          dataAPI = response.data.data.cutiApprovalWeb;
          // Additional logic specific to 'cuti-web'
          setDataApp(dataAPI);
          break;

        case 'general-param':
          // Custom logic for 'general-param'
          dataAPI = response.data.data.generalParamApproval;
          // Additional logic specific to 'general-param'
          setDataApp(dataAPI);
          break;

        case 'cancel-cuti':
          // Custom logic for 'cancel-cuti'
          dataAPI = response.data.data;
          // Additional logic specific to 'cancel-cuti'
          setDataApp(dataAPI);
          break;

        case 'libur':
          // Custom logic for 'libur'
          dataAPI = response.data.data;
          // Additional logic specific to 'libur'
          setDataApp(dataAPI);
          break;

        case 'lembur':
          // Custom logic for 'lembur'
          dataAPI = response.data.data;
          // Additional logic specific to 'lembur'
          setDataApp(dataAPI);
          break;

        default:
          // Handle the default case if necessary
          break;
      }
      
      console.log('data app: ', dataApp);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error.response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataFromSession('token')
      .then(token => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        getDataApproval(headers, kategori, idProject);
      })
      .catch(error => console.log(error));

    // Now, isCategoryIncluded contains the result of the condition
    // console.log('hello : ',isCategoryIncluded);
  }, [kategori, idProject]);

  useEffect(() => {
    const isCategoryIncluded = [
      'cuti',
      'cuti-web',
      'general-param',
      'sakit',
    ].includes(kategori);
    setOnDropdown(isCategoryIncluded);
  }, [kategori]);

  const moveTo = (tujuan, id) => {
    navigation.navigate(tujuan, {id: id, kategori:kategori});
  };


  return (
    <View style={styles.listApproval}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View style={styles.wrapJudul}>
        <Text style={styles.judul}>APPROVAL</Text>
      </View>
      <View
        style={[
          styles.wrapList,
          onDropdown ? {height: '100%'} : {height: '85%'},
        ]}>
        <View style={styles.kategoriApproval}>
          <KategoriApproval keyKategori={key => setKategori(key)} />
        </View>
        {onDropdown ? null : (
          <View style={styles.wrapDropdown}>
            <View style={styles.dropdown}>
              <TouchableOpacity
                onPress={handleOpenDropdownApproval}
                style={styles.tombolDropdown}>
                <Text style={styles.lokasiProject}>
                  {tempatProject === ''
                    ? 'Pilih Lokasi Project'
                    : tempatProject}
                </Text>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  size={25}
                  color={Color.white}
                />
              </TouchableOpacity>
              {openDropdownApproval ? (
                <DropdownApproval
                  dataPilihanProjact={data => setTempatProject(data)}
                  idProject={id => setIdProject(id)}
                />
              ) : (
                ''
              )}
            </View>
          </View>
        )}
        <View style={styles.wrapCardApproval}>
          {isLoading ? (
            <View>
              <SkeletonCardApproval />
              <SkeletonCardApproval />
              <SkeletonCardApproval />
              <SkeletonCardApproval />
              <SkeletonCardApproval />
            </View>
          ) : (
            <ScrollView
              style={{width: '90%'}}
              showsVerticalScrollIndicator={false}>
              {dataApp.length > 0 ? (
                dataApp.map((item, index) => (
                  <CardApproval
                    onPress={() => moveTo('detailApproval', item.id)}
                    key={index}
                    nama={item.nama}
                    nik={item.nik}
                    tgl={item.dtmCrt || item.dtmUpd || item.dtmcrt}
                    navigation={navigation}
                  />
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
                    Tidak Ada Data Approval
                  </Text>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

export default ListApproval;

const styles = StyleSheet.create({
  listApproval: {
    backgroundColor: Color.green,
    height: '100%',
    position: 'relative',
  },
  judul: {
    fontFamily: text.semiBold,
    fontSize: 26,
    color: Color.blue,
  },
  wrapList: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingBottom: 180,
  },
  wrapJudul: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kategoriApproval: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  wrapDropdown: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    position: 'relative',
    marginBottom: 70,
  },
  dropdown: {
    width: '90%',
    minHeight: 50,
    backgroundColor: Color.blue,
    borderRadius: 5,
    paddingHorizontal: 20,
    position: 'absolute',
    zIndex: 10,
  },
  tombolDropdown: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lokasiProject: {
    fontFamily: text.semiBold,
    fontSize: 15,
    color: Color.white,
  },
  wrapCardApproval: {
    alignItems: 'center',
    width: '100%',
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
});
