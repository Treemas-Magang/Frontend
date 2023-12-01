/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Color} from '../../utils/color';
import CardUpdateProject from '../molecules/CardUpdateProject';
import ButtonAction from '../atoms/ButtonAction';
import {text} from '../../utils/text';
import VectorAtasBesar from '../atoms/VectorAtasBesar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {getDataFromSession} from '../../utils/getDataSession';
import axios from 'axios';
import SkeletonCardUpdateProject from '../skeleton/SkeletonCardUpdateProject';
import LottieView from 'lottie-react-native';
import {AlertNotificationSuccess} from '../atoms/AlertNotification';
import ButtonLoading from '../atoms/ButtonLoading';
import {API_URL, API_GABUNGAN} from '@env';

const UpdateListProject = ({navigation}) => {
  const [uploadBerhasil, setUploadBerhasil] = useState(false);
  const [dataAllProject, setDataAllProject] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [patch, setPatch] = useState([]);
  const [patchBlmUpdt, setPatchBlmUpdt] = useState([]);
  const [initialDataAllProjectBlmUpdt, setInitialDataAllProjectBlmUpdt] =
    useState([]);
  const [changedDataState, setChangedDataState] = useState([]);

  const getData = async headers => {
    try {
      const res = await axios.get(
        API_GABUNGAN + '/api/absen/get-all-projects',
        {
          headers,
        },
      );
      console.log('data : ', res.data.success);
      const dataApi = res.data.data;

      const newData = dataApi.map(item => ({
        ...item,
        value: item.active === '1' ? true : false,
      }));

      console.log('data baru : ', newData);
      setDataAllProject(newData);
      setInitialDataAllProjectBlmUpdt(JSON.parse(JSON.stringify(newData))); // Deep copy of the array
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const patchData = dataAllProject.map(item => ({
      active: item.value ? '1' : '0',
      projectId: item.projectId,
    }));
    setPatch(patchData);

    // Using deep copy for the initial data
    const patchDataBlmUpdt = initialDataAllProjectBlmUpdt.map(item => ({
      active: item.value ? '1' : '0',
      projectId: item.projectId,
    }));
    setPatchBlmUpdt(patchDataBlmUpdt);
  }, [dataAllProject, initialDataAllProjectBlmUpdt]);

  useEffect(() => {
    getDataFromSession('token')
      .then(token => {
        console.log(token);
        const headers = {
          Authorization: `Bearer ${token}`,
          contentType: 'application/json',
        };
        getData(headers);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false); // Set loading to false in case of error
      });
  }, []);

  const toggleCheckbox = index => {
    const updatedCheckboxes = [...dataAllProject];
    updatedCheckboxes[index].value = !updatedCheckboxes[index].value;
    updatedCheckboxes[index].active = updatedCheckboxes[index].value
      ? '1'
      : '0';
    setDataAllProject(updatedCheckboxes);
  };

  const dataYangAkanDikirim = async (headers, dtPatch) => {
    try {
      const res = await axios.patch(
        API_GABUNGAN + '/api/absen/update-penempatan',
        {projectTerpilih: dtPatch},
        {headers},
      );

      console.log('success :', res.data.success);
      setUploadBerhasil(true);
      setBtnLoading(false);
    } catch (error) {
      console.error('Error:', error.response);
      setBtnLoading(false);
    }
  };
  useEffect(() => {
    // Assuming patchDataBlmUpdt and patchData are your original arrays
    const findChangedData = () => {
      const changedData = [];

      patchBlmUpdt.forEach(itemBlmUpdt => {
        const correspondingItem = patch.find(
          item => item.projectId === itemBlmUpdt.projectId,
        );

        // Check if the corresponding item exists and has a different 'active' value
        if (
          correspondingItem &&
          itemBlmUpdt.active !== correspondingItem.active
        ) {
          changedData.push(itemBlmUpdt);
        }
      });

      return changedData;
    };

    // Call findChangedData to get the initial changed data
    const initialChangedData = findChangedData();

    // Set the state with the initial changed data
    setChangedDataState(initialChangedData);
  }, [patchBlmUpdt, patch]);

  // Watch for changes in patchBlmUpdt
  useEffect(() => {
    // Assuming patchDataBlmUpdt and patchData are your original arrays
    const findChangedData = () => {
      const changedData = [];

      patch.forEach(itemPatch => {
        const correspondingItem = patchBlmUpdt.find(
          item => item.projectId === itemPatch.projectId,
        );

        // Check if the corresponding item exists and has a different 'active' value
        if (
          correspondingItem &&
          itemPatch.active !== correspondingItem.active
        ) {
          changedData.push(itemPatch);
        }
      });

      return changedData;
    };

    // Call findChangedData to get the changed data
    const updatedChangedData = findChangedData();

    // Set the state with the changed data
    setChangedDataState(updatedChangedData);
  }, [patchBlmUpdt, patch]);

  console.log('Changed Data State:', changedDataState);

  const sendData = async () => {
    setBtnLoading(true);
    try {
      const token = await getDataFromSession('token');
      console.log(token);

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      await dataYangAkanDikirim(headers, changedDataState);
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
    }
  };
  const close = () => {
    setUploadBerhasil(false);
  };
  return (
    <View style={styles.wrapScreenDaftarProject}>
      {uploadBerhasil ? (
        <View style={{position: 'absolute'}}>
          <AlertNotificationSuccess
            buttonAlert="Close"
            textBodyAlert="Project Berhasil Di Update"
            titleAlert="Success"
            onPress={close}
          />
        </View>
      ) : (
        ''
      )}
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasBesar />
      <View style={styles.wrapCardDaftarProject}>
        <Text style={styles.textTitleDaftarProject}>DAFTAR PROJECT</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <View style={{gap: 15}}>
              <SkeletonCardUpdateProject />
              <SkeletonCardUpdateProject />
              <SkeletonCardUpdateProject />
            </View>
          ) : dataAllProject.length > 0 ? (
            dataAllProject.map((dataProjects, index) => (
              <View key={index}>
                <CardUpdateProject
                  alamat={dataProjects.projectAddress}
                  title={dataProjects.projectName}
                  onValueChange={() => toggleCheckbox(index)}
                  value={dataProjects.value}
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
                Tidak Ada Data Project
              </Text>
            </View>
          )}
        </ScrollView>
        {btnLoading ? (
          <ButtonLoading
            style={{marginVertical: 10, width: wp('75%'), height: hp('8%')}}
          />
        ) : (
          <ButtonAction
            title="UPDATE"
            style={{marginVertical: 10, width: wp('75%'), height: hp('8%')}}
            onPress={sendData}
          />
        )}
      </View>
    </View>
  );
};

export default UpdateListProject;

const styles = StyleSheet.create({
  wrapScreenDaftarProject: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.green,
    paddingTop: 50,
  },
  wrapCardDaftarProject: {
    backgroundColor: Color.white,
    width: wp('85%'),
    height: hp('67%'),
    alignItems: 'center',
    borderRadius: 10,
  },
  textTitleDaftarProject: {
    fontFamily: text.semiBold,
    textTransform: 'uppercase',
    fontSize: 26,
    color: Color.blue,
    textAlign: 'center',
    marginVertical: 10,
  },
  wrapDataNotFound: {
    width: wp('70%'),
    height: hp('45%'),
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
