/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color} from '../../utils/color';
import CardInfo from '../molecules/CardInfo';
import {text} from '../../utils/text';
import Dropdown from '../atoms/Dropdown';
import CustomTextInput from '../atoms/CustomTextInput';
import ButtonAction from '../atoms/ButtonAction';
import KalenderRange from '../molecules/KalenderRange';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {setFormCuti} from '../../redux';
import FakeTextInput from '../atoms/FakeTextInput';

const jenis_cuti = [
  {id_cuti: "CD1", keterangan_cuti: 'cuti 1'},
  {id_cuti: "CD2", keterangan_cuti: 'cuti 2'},
  {id_cuti: "CD3", keterangan_cuti: 'cuti 3'},
  {id_cuti: "CD4", keterangan_cuti: 'cuti 4'},

];



const FormCuti = () => {
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.FormCutiReducer);
  console.log('ini dari reducer : ', form);
  const [awalCuti, setAwalCuti] = useState(form.tanggal_cuti);
  const [showKalender, setShowKalender] = useState(false);
  const [data, setData] = useState({
    jumlahCuti: 0,
    jumlahCutiBersama: 0,
    jumlahTanggalMerah: 0,
    tanggalMasuk: '',
    startDate: '',
    endDate: '',
  });
  const openKalender = () => {
    setShowKalender(!showKalender);
  };
  console.log(showKalender);

  const handleDataReady = newData => {
    if (
      newData.jumlahCuti !== data.jumlahCuti ||
      newData.jumlahCutiBersama !== data.jumlahCutiBersama ||
      newData.jumlahTanggalMerah !== data.jumlahTanggalMerah ||
      newData.tanggalMasuk !== data.tanggalMasuk ||
      newData.startDate !== data.startDate ||
      newData.endDate !== data.endDate
    ) {
      setData(newData);
      dispatch(setFormCuti('tanggal_cuti', newData.startDate));
      dispatch(setFormCuti('tanggal_selesai', newData.endDate));
      dispatch(setFormCuti('tanggal_masuk', newData.tanggalMasuk));
      dispatch(setFormCuti('jml_cuti', newData.jumlahCuti));
      setAwalCuti(newData.startDate);
    }
  };
  const onChangeText = (value, inputType) => {
    dispatch(setFormCuti(inputType, value));
  };
    const sendData = () => {
    console.log('kirim data : ', form);
  };

  return (
    <View style={styles.formCuti}>
      {showKalender && (
        <View style={{position: 'absolute', top: 0, right: 55, zIndex: 2}}>
          <KalenderRange onDataReady={handleDataReady} />
        </View>
      )}
      <View style={styles.cardFormCuti}>
        <Text style={styles.judul}>Form Cuti</Text>
        <View style={styles.wrapInfoCuti}>
          <CardInfo title="sisa cuti" color={Color.cardMasuk} cardInfo="11" />
          <CardInfo
            title="cuti bersama"
            color={Color.cardTelatMasuk}
            cardInfo="11"
          />
          <CardInfo
            title="cuti penganti"
            color={Color.cardPulangCepat}
            cardInfo="11"
          />
        </View>
        <View style={styles.wrapInputForm}>
          <Dropdown nama_dropdown="jenis cuti" jenis_cuti={jenis_cuti} />
          <View style={{position: 'relative'}}>
            {/* <CustomTextInput
              label="tgl awal - akhir cuti"
              value={awalCuti === '' ? 'haha' : 'hehehe'}
              secureTextEntry={false}
            /> */}
            <FakeTextInput
              value={`${form.tanggal_cuti} - ${form.tanggal_selesai}`}
              label="tgl awal - akhir cuti"
            />
            <TouchableOpacity
              onPress={openKalender}
              style={{
                position: 'absolute',
                top: 10,
                right: 5,
                paddingLeft: 250,
                paddingVertical: 5,
              }}>
              <FontAwesomeIcon
                icon={faCalendarDays}
                size={25}
                color={Color.green}
              />
            </TouchableOpacity>
            {/* <CustomTextInput label="tgl masuk kerja" editable={false} /> */}
            <FakeTextInput value={form.tanggal_masuk} label="tgl masuk kerja" />
            <CustomTextInput
              label="Keperluan cuti"
              secureTextEntry={false}
              value={form.keperluan_cuti}
              onTextChange={value => onChangeText(value, 'keperluan_cuti')}
            />
            <CustomTextInput
              label="alamat cuti"
              secureTextEntry={false}
              value={form.alamat_cuti}
              onTextChange={value => onChangeText(value, 'alamat_cuti')}
            />
          </View>
          <View style={styles.catatanCuti}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.label}>Jumlah Cuti</Text>
              <Text style={styles.textValue}>
                {data.jumlahCuti !== 0 ? data.jumlahCuti : '-'}
              </Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.label}>Hari Libur</Text>
              <Text style={styles.textValue}>
                {data.jumlahTanggalMerah !== 0 ? data.jumlahTanggalMerah : '-'}
              </Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.label}>Jumlah Cuti Bersama</Text>
              <Text style={styles.textValue}>
                {data.jumlahCutiBersama !== 0 ? data.jumlahCutiBersama : '-'}
              </Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.label}>Tanggal Cuti</Text>
              <Text style={styles.textValue}>
                {data.startDate && data.endDate
                  ? `${data.startDate} - ${data.endDate}`
                  : '-'}
              </Text>
            </View>
          </View>
          <ButtonAction title="KIRIM" onPress={() => sendData()} style={{width: 269}} />
        </View>
      </View>
    </View>
  );
};

export default FormCuti;

const styles = StyleSheet.create({
  formCuti: {
    height: '100%',
    width: '100%',
    paddingTop: 140,
    alignItems: 'center',
    position: 'relative',
  },
  cardFormCuti: {
    width: 320,
    paddingVertical: 20,
    backgroundColor: Color.white,
    borderRadius: 10,
  },
  wrapInfoCuti: {
    flexDirection: 'row',
    gap: 25,
    justifyContent: 'center',
    marginBottom: 20,
  },
  judul: {
    fontFamily: text.semiBold,
    fontSize: 26,
    color: Color.blue,
    width: '100%',
    textAlign: 'center',
    marginBottom: 10,
  },
  wrapInputForm: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  catatanCuti: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    backgroundColor: Color.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.black,
    width: 280,
    marginVertical: 20,
    padding: 10,
    justifyContent: 'flex-start',
  },
  label: {
    fontFamily: text.italic,
    color: Color.black,
    fontSize: 10,
  },
  textValue: {
    fontFamily: text.semiBold,
    color: Color.black,
  },
});
