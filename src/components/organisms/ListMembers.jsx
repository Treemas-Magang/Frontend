/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CardMember from '../molecules/CardMember';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowDownShortWide} from '@fortawesome/free-solid-svg-icons';
import DropdownList from '../atoms/DropdownList';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import VectorAtasBesar from '../atoms/VectorAtasBesar';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {getDataFromSession} from '../../utils/getDataSession';
import SkeletonCardMember from '../skeleton/SkeletonCardMember';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import {API_URL, API_URL_WEB} from '@env';

const ListMembers = ({navigation}) => {
  const {projectId, projectName} = useRoute().params;
  console.log(projectId);
  const [isDropdown, setIsDropdown] = useState(false);
  const [dataListMembers, setDataListMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true
  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
    console.log(isDropdown);
  };
  const handleClickOutside = () => {
    setIsDropdown(false);
  };

  const getDataMembers = async headers => {
    try {
      const projId = projectId;
      console.log('ini project id : ', projId);
      const response = await axios.get(
        API_URL + `/api/member/get-member-project?projectId=${projId}`,
        {headers},
      );
      const dataAPI = response.data.data;
      setDataListMembers(dataAPI);
      setIsLoading(false);
      console.log(`data member dari project ${projectId} :`, dataAPI);
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataFromSession('token')
      .then(token => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        getDataMembers(headers);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleClickOutside}>
      <View style={styles.listMember}>
        <ButtonBack navigation={navigation} />
        <ButtonHome navigation={navigation} />
        <VectorAtasBesar />
        <View style={{paddingVertical: 55}}></View>
        <View style={styles.wrapListMember}>
          {isDropdown ? <DropdownList /> : ''}
          <TouchableOpacity onPress={handleDropdown} style={styles.iconDrop}>
            <FontAwesomeIcon
              icon={faArrowDownShortWide}
              size={30}
              color={Color.blue}
            />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '74%',
              // height: '15%',
            }}>
            <Text style={styles.judul}>Member</Text>
            <Text style={styles.judul}>{projectName}</Text>
          </View>
          <View style={styles.wrapStatus}>
            <View style={styles.labelKet}>
              <View
                style={[
                  styles.simbolStatus,
                  {backgroundColor: Color.cardMasuk},
                ]}
              />
              <Text>Hadir</Text>
            </View>
            <View style={styles.labelKet}>
              <View
                style={[styles.simbolStatus, {backgroundColor: Color.cardCuti}]}
              />
              <Text>Cuti</Text>
            </View>
            <View style={styles.labelKet}>
              <View
                style={[
                  styles.simbolStatus,
                  {backgroundColor: Color.cardTidakMasuk},
                ]}
              />
              <Text>Tidak masuk</Text>
            </View>
            <View style={styles.labelKet}>
              <View
                style={[
                  styles.simbolStatus,
                  {backgroundColor: Color.cardSakit},
                ]}
              />
              <Text>Sakit/izin</Text>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {isLoading ? (
              <View style={{gap: 20}}>
                <SkeletonCardMember />
                <SkeletonCardMember />
                <SkeletonCardMember />
              </View>
            ) : dataListMembers.length > 0 ? (
              dataListMembers.map((member, index) => (
                <View style={{gap: 20}} key={index}>
                  <CardMember
                    navigation={navigation}
                    jamMsk={member.jamMsk}
                    nama={member.nama}
                    jamPlg={member.jamPlg}
                    status={
                      member.jamMsk !== null
                        ? 'hadir'
                        : member.isSakit !== null
                        ? 'sakit'
                        : member.isCuti !== null
                        ? 'cuti'
                        : member.jamMsk &&
                          member.isSakit &&
                          member.isCuti === null
                        ? 'tidakMasuk'
                        : ''
                    }
                  />
                </View>
              ))
            ) : (
              <View style={styles.wrapDataNotFound}>
                <LottieView
                  source={require('../../assets/animation/dataNotFound.json')}
                  autoPlay
                  style={{
                    width: '100%',
                    height: '70%',
                  }}></LottieView>
                <Text style={styles.textDataNotFound}>
                  Belum Ada Yang Absen
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ListMembers;

const styles = StyleSheet.create({
  listMember: {
    backgroundColor: Color.green,
    width: '100%',
    height: '100%',
  },
  wrapListMember: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    position: 'relative',
    paddingVertical: 5,
  },
  judul: {
    fontFamily: text.semiBold,
    fontSize: 20,
    color: Color.blue,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  iconDrop: {
    position: 'absolute',
    left: 15,
    top: 20,
  },
  wrapStatus: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    marginBottom: 5,
  },
  simbolStatus: {
    width: 15,
    height: 15,
    borderRadius: 15,
  },
  labelKet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  wrapDataNotFound: {
    width: wp('70%'),
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
