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
  const [checkboxes, setCheckboxes] = useState([
    {
      title: 'ARTHAASIA FINANCE',
      alamat:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      value: false,
    },
    {
      title: 'BANK OF TOKYO',
      alamat:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      value: false,
    },
    {
      title: 'BANK BTPN',
      alamat:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      value: false,
    },
    {
      title: 'BANK BTPN',
      alamat:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      value: false,
    },
    {
      title: 'BANK BTPN',
      alamat:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      value: false,
    },
    {
      title: 'TREEMAS SOLUSI UTAMA',
      alamat:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      value: false,
    },
  ]);
  useEffect(() => {
    getDataFromSession('token')
      .then(token => {
        console.log(token);
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = axios.get(
          'http://192.168.10.31:8081/api/absen/get-all-projects',
          {headers},
        );
        // const message = response._j.data.message;
        const {data, message} = response;
        console.log('data : ', message);
        setDataAllProject(response);
        console.log('data project :', dataAllProject);
      })
      .catch(error => console.log(error));
  }, []);

  const toggleCheckbox = index => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index].value = !updatedCheckboxes[index].value;
    setCheckboxes(updatedCheckboxes);
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
          {checkboxes.map((checkbox, index) => (
            <View key={index}>
              <CardUpdateProject
                alamat={checkbox.alamat}
                title={checkbox.title}
                onValueChange={() => toggleCheckbox(index)}
                value={checkbox.value}
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
