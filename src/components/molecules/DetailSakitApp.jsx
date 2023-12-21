/* eslint-disable prettier/prettier */
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {text} from '../../utils/text';
import {Color} from '../../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {setFormApproval} from '../../redux';
import CustomTextInputProfile from '../atoms/CustomTextInpuProfile';

const DetailSakitApp = ({
  kategoriCuti,
  nik,
  nama,
  tglMulai,
  tglSelesai,
  tglMasuk,
  keterangan,
  alamat,
  jmlCuti,
  jmlCutiBersama,
  jmlCutiKhusus,
  jenisCuti,
  approve,
  reject,
}) => {
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.CatatanApprovalReducer);

  const onChangeText = (value, inputType) => {
    dispatch(setFormApproval(inputType, value));
  };
  return (
    <View style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={{alignItems: 'center'}}>
          <View>
            <Image
              source={require('../../assets/vector/user.png')}
              style={[styles.pp, stylePP]}
              resizeMode="contain"
            />
          </View>
        </View> */}
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
          <Text style={styles.TextTitle}>Tanggal Mulai Kerja</Text>
          <Text style={styles.TextDeskripsi}>{tglMasuk}</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Keterangan Cuti/Sakit</Text>
          <Text style={styles.TextDeskripsi}>{keterangan}</Text>
        </View>
        {kategoriCuti === 'sakit' ? (
          ''
        ) : (
          <View>
            <Text style={styles.TextTitle}>Alamat Cuti</Text>
            <Text style={{textAlign: 'justify'}}>{alamat}</Text>
          </View>
        )}
        <View>
          <Text style={styles.TextTitle}>Jumlah Cuti</Text>
          <Text style={styles.TextDeskripsi}>{jmlCuti}</Text>
        </View>
        {kategoriCuti === 'sakit' ? (
          ''
        ) : (
          <>
            <View>
              <Text style={styles.TextTitle}>Jumlah Cuti Bersama</Text>
              <Text style={styles.TextDeskripsi}>{jmlCutiBersama}</Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Jumlah Cuti Khusus</Text>
              <Text style={styles.TextDeskripsi}>{jmlCutiKhusus}</Text>
            </View>
            <View>
              <Text style={styles.TextTitle}>Jenis Cuti</Text>
              <Text style={styles.TextDeskripsi}>{jenisCuti}</Text>
            </View>
          </>
        )}
        <View style={{marginBottom: 20, marginTop: 10}}>
          <CustomTextInputProfile
            label="Catatan Approve"
            value={form.catatanApproval}
            multiline
            onTextChange={value => onChangeText(value, 'catatanApproval')}
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

export default DetailSakitApp;

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
