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

const DetailAbsenPulangApp = () => {
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.CatatanApprovalReducer);

  const onChangeText = (value, inputType) => {
    dispatch(setFormApproval(inputType, value));
  };
  const sendData = () => {
    console.log('kirim data : ', form);
  };
  return (
    <View style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.TextTitle}>NIK</Text>
          <Text style={styles.TextDeskripsi}>2912312</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Nama</Text>
          <Text style={styles.TextDeskripsi}>Azriel FachrulRezy</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Hari</Text>
          <Text style={styles.TextDeskripsi}>Senin</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Tanggal Absen</Text>
          <Text style={styles.TextDeskripsi}>10-06-2023</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Lokasi Masuk</Text>
          <Text style={styles.TextDeskripsi}>Gedung A</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Jam Masuk</Text>
          <Text style={styles.TextDeskripsi}>08:00</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Lokasi Pulang</Text>
          <Text style={styles.TextDeskripsi}>Gedung A</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Jam Pulang</Text>
          <Text style={styles.TextDeskripsi}>17:00</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Note Pekerjaan</Text>
          <Text style={styles.TextDeskripsi}>Meeting dengan klien</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Note Telat Masuk</Text>
          <Text style={styles.TextDeskripsi}>-</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Note Pulang Cepat</Text>
          <Text style={styles.TextDeskripsi}>-</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Note Other</Text>
          <Text style={styles.TextDeskripsi}>-</Text>
        </View>
        <View>
          <Text style={styles.TextTitle}>Total Jam Kerja</Text>
          <Text style={styles.TextDeskripsi}>9 jam</Text>
        </View>
        <View style={{marginBottom: 20, marginTop: 10}}>
          <CustomTextInputProfile
            label="Catatan Approve"
            value={form.catatanApproval}
            multiline
            onTextChange={value => onChangeText(value, 'catatanApproval')}
          />
        </View>
        <View style={{alignItems: 'center', marginBottom: 40}}>
          <TouchableOpacity
            onPress={() => sendData()}
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
          <TouchableOpacity
            style={styles.ButtonReject}
            onPress={() => sendData()}>
            <Text style={styles.Text}>REJECT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailAbsenPulangApp;

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
