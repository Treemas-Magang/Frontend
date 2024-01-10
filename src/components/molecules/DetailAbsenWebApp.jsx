/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
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
import { getDataFromSession } from '../../utils/getDataSession';

const DetailAbsenWebApp = ({
  nik,
  nama,
  hari,
  tanggalAbsen,
  lokasiMasuk,
  jamMasuk,
  jarakMsk,
  lokasiPulang,
  jamPulang,
  jarakPlg,
  notePekerjaan,
  noteTelatMasuk,
  notePulangCepat,
  noteOther,
  totalJamKerja,
  namaProject,
  approve,
  reject,
  isApprove1,
}) => {
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.CatatanApprovalReducer);
  const [isRole, setIsRole] = useState('');
    useEffect(() => {
      getDataFromSession('dataProfilUser')
        .then(data => {
          const dataProfile = JSON.parse(data);
          setIsRole(dataProfile.role);
        })
        .catch(error => console.log(error));
    }, []);

  const onChangeText = (value, inputType) => {
    dispatch(setFormApproval(inputType, value));
  };

  const sendData = () => {
    console.log('kirim data : ', form);
    // You can modify this part to send data to your server or perform other actions
  };

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
          <Text style={styles.TextTitle}>Nama Project</Text>
          <Text style={styles.TextDeskripsi}>{namaProject}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Hari</Text>
          <Text style={styles.TextDeskripsi}>{hari}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Tanggal Absen</Text>
          <Text style={styles.TextDeskripsi}>{tanggalAbsen}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Lokasi Masuk</Text>
          <Text style={styles.TextDeskripsi}>{lokasiMasuk}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Jam Masuk</Text>
          <Text style={styles.TextDeskripsi}>{jamMasuk}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Jarak Masuk</Text>
          <Text style={styles.TextDeskripsi}>{jarakMsk}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Lokasi Pulang</Text>
          <Text style={styles.TextDeskripsi}>{lokasiPulang}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Jam Pulang</Text>
          <Text style={styles.TextDeskripsi}>{jamPulang}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Jarak Pulang</Text>
          <Text style={styles.TextDeskripsi}>{jarakPlg}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Note Pekerjaan</Text>
          <Text style={styles.TextDeskripsi}>{notePekerjaan}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Note Telat Masuk</Text>
          <Text style={styles.TextDeskripsi}>{noteTelatMasuk}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Note Pulang Cepat</Text>
          <Text style={styles.TextDeskripsi}>{notePulangCepat}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Note Other</Text>
          <Text style={styles.TextDeskripsi}>{noteOther}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Total Jam Kerja</Text>
          <Text style={styles.TextDeskripsi}>{totalJamKerja}</Text>
        </View>
        {isRole === 'HEAD' ? (
          <View style={{marginBottom: 20, marginTop: 10}}>
            <CustomTextInputProfile
              label="Catatan Approve"
              multiline
              value={form.noteApp2}
              onTextChange={value => onChangeText(value, 'noteApp2')}
            />
          </View>
        ) : (
          <View style={{marginBottom: 20, marginTop: 10}}>
            <CustomTextInputProfile
              label="Catatan Approve"
              multiline
              value={form.noteApp1}
              onTextChange={value => onChangeText(value, 'noteApp1')}
            />
          </View>
        )}
        <View style={{alignItems: 'center', marginBottom: 40}}>
          {isRole === 'HEAD' ? (
            isApprove1 ? (
              <View>
                <TouchableOpacity
                  onPress={approve}
                  style={styles.ButtonApprove}>
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
            ) : (
              <View style={styles.ButtonApp2}>
                <Text style={styles.Text}>Belum Di Acc Leader</Text>
              </View>
            )
          ) : isApprove1 ? (
            <View style={styles.ButtonApp3}>
              <Text style={styles.Text2}>Anda Sudah Melakukan Approve</Text>
            </View>
          ) : (
            <View>
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
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailAbsenWebApp;

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
    textTransform: 'uppercase',
  },
  Text2: {
    fontFamily: text.semiBold,
    fontSize: 16,
    color: Color.green,
    textTransform: 'uppercase',
  },
  ButtonApp2: {
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
  ButtonApp3: {
    backgroundColor: 'transparent',
    borderColor: Color.green,
    borderWidth: 2,
    width: 269,
    minHeight: 50,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
