/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Color} from '../../utils/color';
import CardUpdateProject from '../molecules/CardUpdateProject';
import ButtonAction from '../atoms/ButtonAction';
import {text} from '../../utils/text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const UpdateListProject = () => {
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
      title: 'BANK BTPN',
      alamat:
        'jl. boulevard graha raya blok N1  no.21, RT.4/RW.8, Paku jaya, Kec. Serpong utara, Kota Tangerang Selatan, Banten 15326, Indonesia',
      value: false,
    },
  ]);

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
      }}>
      <View
        style={{
          backgroundColor: Color.white,
          width: wp('85%'),
          height: hp('75%'),
          paddingVertical: 10,
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
