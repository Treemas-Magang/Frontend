/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
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
const UpdateListProject = ({navigation}) => {
  const [dataAllProject, setDataAllProject] = useState([]);
  const [patch, setPatch] = useState([]);
  const getData = async (headers) => {
    const res = await axios.get('http://192.168.10.31:8081/api/absen/get-all-projects',{headers});
    console.log('data : ', res.data.success);
    const dataApi = res.data.data;

  const newData = dataApi.map(item => ({
    ...item,
    value: item.active === '1' ? true : false,
  }));

    console.log('data baru : ',newData)

    setDataAllProject(newData)
  };

  useEffect(() => {
    const patchData = dataAllProject.map(item => ({
      active: item.value ? '1' : '0',
      projectId: item.projectId,
    }));
    setPatch(patchData)
  }, [dataAllProject])
console.log('ini pacth project : ',patch)
  useEffect(() => {
    getDataFromSession('token')
      .then(token => {
        console.log(token);
      const headers = {
        Authorization: `Bearer ${token}`,
        contentType: 'application/json', // Use camelCase
      };
        getData(headers);
      })
      .catch(error => console.log(error));
  }, []);
  console.log('data aja : ', dataAllProject)

  const toggleCheckbox = index => {
    const updatedCheckboxes = [...dataAllProject];
    updatedCheckboxes[index].value = !updatedCheckboxes[index].value;
    updatedCheckboxes[index].active = updatedCheckboxes[index].value ? '1' : '0';
    setDataAllProject(updatedCheckboxes);
  };

const dataYangAkanDikirim = async (headers, patch) => {
  try {
    const res = await axios.patch(
      'http://192.168.10.31:8081/api/absen/update-penempatan',
      {selectedProjects: patch},
      {headers},
    );

    if (res.data.success) {
      console.log('success :', res.data.success);
    } else {
      console.log('success :',res.data.success);
      console.log('Gagal');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const sandData = async () => {
  try {
    const token = await getDataFromSession('token');
    console.log(token);

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Menggunakan camelCase sesuai standar HTTP
    };

    await dataYangAkanDikirim(headers, patch);
  } catch (error) {
    console.log(error);
  }
};


  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.green,
        paddingTop: 50,
      }}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasBesar />
      <View
        style={{
          backgroundColor: Color.white,
          width: wp('85%'),
          height: hp('67%'),
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: text.semiBold,
            textTransform: 'uppercase',
            fontSize: 26,
            color: Color.blue,
            textAlign: 'center',
            marginVertical: 10,
          }}>
          DAFTAR PROJECT
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {dataAllProject.map((dataProjects, index) => (
            <View key={index}>
              <CardUpdateProject
                alamat={dataProjects.projectAddress}
                title={dataProjects.projectName}
                onValueChange={() => toggleCheckbox(index)}
                value={dataProjects.value}
              />
            </View>
          ))}
          {/* <Text>Selected options:</Text>
      {checkboxes
        .filter(checkbox => checkbox.value)
        .map((checkbox, index) => (
          <View key={index}>
            <Text>{checkbox.title}</Text>
            <Text>{checkbox.alamat}</Text>
          </View>
        ))} */}
        </ScrollView>
        <ButtonAction
          title="UPDATE"
          style={{marginVertical: 10, width: wp('75%'), height: hp('8%')}}
          onPress={sandData}
        />
      </View>
    </View>
  );
};

export default UpdateListProject;

// <View>
//   <Text>Select multiple options:</Text>
//   {checkboxes.map((checkbox, index) => (
//     <View key={index} style={{flexDirection: 'column'}}>
//       <View
//         style={{
//           backgroundColor: Color.green,
//           height: 90,
//           width: 295,
//           flexDirection: 'row',
//           justifyContent: 'center',
//           alignItems: 'center',
//           marginVertical: 10,
//           gap: 8
//         }}>
//         <FontAwesomeIcon
//           icon={faFileInvoice}
//           size={50}
//           color={Color.white}
//         />
//         <View style={{width: 180}}>
//           <Text>{checkbox.title}</Text>
//           <Text style={{textAlign:'justify'}} numberOfLines={3}>{checkbox.alamat}</Text>
//         </View>
//         <CheckBox
//           value={checkbox.value}
//           onValueChange={() => toggleCheckbox(index)}
//         />
//       </View>
//     </View>
//   ))}
//   <Text>Selected options:</Text>
//   {checkboxes
//     .filter(checkbox => checkbox.value)
//     .map((checkbox, index) => (
//       <View key={index}>
//         <Text>{checkbox.title}</Text>
//         <Text>{checkbox.alamat}</Text>
//       </View>
//     ))}
// </View>
