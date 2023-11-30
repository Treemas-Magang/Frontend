/* eslint-disable prettier/prettier */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import VectorAtasBesar from '../atoms/VectorAtasBesar';
import CardMemberProject from '../molecules/CardMemberProject';
import {getDataFromSession} from '../../utils/getDataSession';
import axios from 'axios';
import SkeletonCardMemberProject from '../skeleton/SkeletonCardMemberProject';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {API_URL, API_URL_WEB} from '@env';

const ListMemberProject = ({navigation}) => {
  const [namaProjectMembers, setNamaProjectMember] = useState([]);
  const [isRole, setIsRole] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true
  const getDataFromSessionAndSetRole = async () => {
    try {
      const data = await getDataFromSession('role');
      console.log('role: ', data);
      setIsRole(data);
    } catch (error) {
      console.log('Error fetching role:', error);
    }
  };

  const getDataProjects = async (headers, url) => {
    try {
      const response = await axios.get(url, {headers});
      const dataAPI = response.data.data;
      console.log(dataAPI);
      setNamaProjectMember(dataAPI);
      setIsLoading(false);
    } catch (error) {
      console.log(`Error fetching projects: ${url}`, error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getDataFromSession('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        if (isRole === 'LEADER') {
          await getDataProjects(headers, API_URL + '/api/member/get-project');
        }
        if (isRole === 'HEAD') {
          await getDataProjects(
            headers,
            API_URL + '/api/absen/get-all-projects',
          );
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isRole]);

  useEffect(() => {
    getDataFromSessionAndSetRole();
  }, []);
  const moveTo = (tujuan, projId, namaProj) => {
    navigation.navigate(tujuan, {projectId: projId, projectName: namaProj});
  };
  return (
    <View style={styles.listMember}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasBesar />
      <View style={{paddingVertical: 55}}></View>
      <View style={styles.wrapListMember}>
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <Text style={styles.judul}>MEMBER</Text>
          <Text style={styles.judul}>PROJECT</Text>
        </View>
        <View style={styles.wrapStatus}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <View
              style={[styles.simbolStatus, {backgroundColor: Color.cardMasuk}]}
            />
            <Text>Hadir</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <View
              style={[styles.simbolStatus, {backgroundColor: Color.cardCuti}]}
            />
            <Text>Cuti</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <View
              style={[
                styles.simbolStatus,
                {backgroundColor: Color.cardTidakMasuk},
              ]}
            />
            <Text>Tidak masuk</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <View
              style={[styles.simbolStatus, {backgroundColor: Color.cardSakit}]}
            />
            <Text>Sakit/izin</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <View>
              <SkeletonCardMemberProject />
              <SkeletonCardMemberProject />
              <SkeletonCardMemberProject />
              <SkeletonCardMemberProject />
              <SkeletonCardMemberProject />
            </View>
          ) : namaProjectMembers.length > 0 ? (
            namaProjectMembers.map((namaProjMember, index) => (
              <View key={index}>
                <CardMemberProject
                  nama={namaProjMember.projectName}
                  onPress={() =>
                    moveTo(
                      'listMembers',
                      namaProjMember.projectId,
                      namaProjMember.projectName,
                    )
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
              <Text style={styles.textDataNotFound}>Data Member Tidak Ada</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ListMemberProject;

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
    fontSize: 24,
    color: Color.blue,
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
