/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {text} from '../../utils/text';
import {Color} from '../../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {setFormApproval} from '../../redux';
import CustomTextInputProfile from '../atoms/CustomTextInpuProfile';
import {getDataFromSession} from '../../utils/getDataSession';

const DetailCutiWebApp = ({
  nik,
  nama,
  tglMulai,
  tglSelesai,
  tglKembaliKerja,
  keperluanCuti,
  alamatCuti,
  approve,
  reject,
}) => {
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.CatatanApprovalReducer);
  const [isRole, setIsRole] = useState('');
  const onChangeText = (value, inputType) => {
    dispatch(setFormApproval(inputType, value));
  };
  useEffect(() => {
    getDataFromSession('dataProfilUser')
      .then(data => {
        const dataProfile = JSON.parse(data);
        setIsRole(dataProfile.role);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.TextTitle}>NIK</Text>
          <Text style={styles.TextDeskripsi}>{nik}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Nama</Text>
          <Text style={styles.TextDeskripsi}>{nama}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Tanggal Mulai</Text>
          <Text style={styles.TextDeskripsi}>{tglMulai}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Tanggal Selesai</Text>
          <Text style={styles.TextDeskripsi}>{tglSelesai}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Tanggal Kembali Kerja</Text>
          <Text style={styles.TextDeskripsi}>{tglKembaliKerja}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Keperluan Cuti</Text>
          <Text style={styles.TextDeskripsi}>{keperluanCuti}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Alamat Cuti</Text>
          <Text style={styles.TextDeskripsi}>{alamatCuti}</Text>
        </View>

        <View style={{marginBottom: 20, marginTop: 10}}>
          <CustomTextInputProfile
            label="Catatan Approve"
            value={form.noteApp}
            multiline
            onTextChange={value => onChangeText(value, 'noteApp')}
            maxLength={50}
          />
        </View>
        <View style={{alignItems: 'center', marginBottom: 40}}>
          <TouchableOpacity onPress={approve} style={styles.ButtonApprove}>
            <Text
              style={{
                fontFamily: text.semiBold,
                fontSize: 16,
                color: Color.white,
              }}>
              APPROVE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ButtonReject} onPress={reject}>
            <Text style={styles.Text}>REJECT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailCutiWebApp;

const styles = StyleSheet.create({
  background: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('15%'),
  },
  TextTitle: {
    fontFamily: text.semiBoldItalic,
    color: Color.black,
    textTransform: 'uppercase',
    marginVertical: 2,
  },
  TextDeskripsi: {
    fontFamily: text.light,
    marginVertical: 2,
  },
  ButtonReject: {
    backgroundColor: 'transparent',
    borderColor: Color.red,
    borderWidth: 2,
    width: 269,
    minHeight: 50,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonApprove: {
    backgroundColor: Color.green,
    width: 269,
    minHeight: 50,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontFamily: text.semiBold,
    fontSize: 16,
    color: Color.red,
  },
});
