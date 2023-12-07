/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import {faCalendarDays, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {setFormCuti} from '../../redux';
import FakeTextInput from '../atoms/FakeTextInput';
import {getDataFromSession} from '../../utils/getDataSession';
import axios from 'axios';
import DropdownCuti from '../atoms/DropdownCuti';
import {API_URL, API_GABUNGAN} from '@env';
import { cekTglAkhirCutiSpesial } from '../../utils/cekTglAkhirCutiSpesial';
import KalenderCuti from '../molecules/KalenderCuti';

const FormCuti = ({
  style,
  styleCard,
  styleContainerCard,
  styleInfo,
  styleTitle,
}) => {
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.FormCutiReducer);
  console.log('ini dari reducer : ', form);
  const [awalCuti, setAwalCuti] = useState(form.tanggal_cuti);
  const [showKalender, setShowKalender] = useState(false);
  const [data, setData] = useState({
    jumlahCutiAtauSakit: 0,
    jumlahCutiBersama: 0,
    jumlahTanggalMerah: 0,
    tanggalMasuk: '',
    startDate: '',
    endDate: '',
  });
  const [dataCuti, setDataCuti] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [dataId, setDataId] = useState('');
  const [cutiDesc, setCutiDesc] = useState('');
  const [jmlhValue, setJmlhValue] = useState(0);
  const [isCutiIstimewa, setIsCutiIstimewa] = useState(true);
  console.log('jumlah value : ', jmlhValue);
  console.log('cuti istimewa : ', isCutiIstimewa);

  useEffect(() => {
    setIsCutiIstimewa(jmlhValue === 0);
  }, [jmlhValue]);
  // console.log(dataId)

  // useEffect(() => {
  //   const tglAkhirCutiSpesial = cekTglAkhirCutiSpesial(form.tglMulai, jmlhValue);
  //   console.log('tgl akhir : ', tglAkhirCutiSpesial);
  // },[form, jmlhValue]);

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  useEffect(() => {
    if (cutiDesc !== '') {
      setOpenDropdown(false);
      // isDropdown(!openDropdown);
      // dispatch(setFormCuti('jenis_cuti', cutiDesc))
    }
  }, [cutiDesc, openDropdown]);
  useEffect(() => {
    dispatch(setFormCuti('selectedMasterCutiId', dataId));
  }, [dispatch, dataId]);
  const openKalender = () => {
    setShowKalender(!showKalender);
  };
  console.log(showKalender);

  const handleDataReady = newData => {
    if (
      newData.jumlahCutiAtauSakit !== data.jumlahCutiAtauSakit ||
      newData.jumlahCutiBersama !== data.jumlahCutiBersama ||
      newData.jumlahTanggalMerah !== data.jumlahTanggalMerah ||
      newData.tanggalMasuk !== data.tanggalMasuk ||
      newData.startDate !== data.startDate ||
      newData.endDate !== data.endDate
    ) {
      setData(newData);
      dispatch(setFormCuti('tglMulai', newData.startDate));
      dispatch(setFormCuti('tglSelesai', newData.endDate));
      dispatch(setFormCuti('tglKembaliKerja', newData.tanggalMasuk));
      dispatch(setFormCuti('jmlCuti', newData.jumlahCutiAtauSakit));
      setAwalCuti(newData.startDate);
    }
  };
  const onChangeText = (value, inputType) => {
    dispatch(setFormCuti(inputType, value));
  };

  useEffect(() => {
    if (data.jumlahCutiBersama > 0 || data.jumlahTanggalMerah > 0) {
      dispatch(setFormCuti('jmlCutiBersama', data.jumlahCutiBersama + data.jumlahTanggalMerah));
      // dispatch(setFormCuti('jmlCutiBersama', data.jumlahCutiBersama));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getDataFromSession('token');
        if (token !== null) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.get(
            API_GABUNGAN + '/api/master-data/cuti-view',
            {headers},
          );
          const dtCuti = response.data.data;
          console.log(dtCuti);
          setDataCuti(dtCuti);
        } else {
          console.log('Data token tidak di temukan');
        }
      } catch (error) {
        console.error('Terjadi Kesalahan:', error);
      }
    };
    fetchData();
  }, []);

  const sendData = () => {
    console.log('kirim data : ', form);
  };
  const handleClickOutside = () => {
    setShowKalender(false);
  };
  const initialState = {
    sisa_cuti: 2,
    cuti_bersama: 11,
    cuti_pengganti: 5,
  };
  const [statistik, setStatistik] = useState(initialState);
  const [maxDurasiCuti, setMaxDurasiCuti] = useState(0);
  useEffect(() => {
    const jmlhSemuaCuti = statistik.cuti_pengganti + statistik.sisa_cuti;
    setMaxDurasiCuti(jmlhSemuaCuti)
  }, [statistik])
  return (
    <TouchableWithoutFeedback onPress={handleClickOutside}>
      <View style={styles.formCuti}>
        {showKalender && (
          <View style={{position: 'absolute', top: 0, right: 55, zIndex: 2}}>
            <KalenderCuti
              onDataReady={handleDataReady}
              range={isCutiIstimewa}
              iniFormCuti={true}
              jmlhValueCuti={jmlhValue}
              maxDurasiCuti={maxDurasiCuti}
            />
          </View>
        )}
        <View style={styles.cardFormCuti}>
          <Text style={styles.judul}>Form Cuti</Text>
          <View style={[styles.info, style]}>
            <CardInfo
              title="sisa cuti"
              color={Color.cardMasuk}
              cardInfo={statistik.sisa_cuti}
              styleCard={styleCard}
              styleContainerCard={styleContainerCard}
              styleInfo={styleInfo}
              styleTitle={styleTitle}
            />
            <CardInfo
              title="cuti bersama"
              color={Color.cardTelatMasuk}
              cardInfo={statistik.cuti_bersama}
              styleCard={styleCard}
              styleContainerCard={styleContainerCard}
              styleInfo={styleInfo}
              styleTitle={styleTitle}
            />
            <CardInfo
              title="cuti penganti"
              color={Color.cardPulangCepat}
              cardInfo={statistik.cuti_pengganti}
              styleCard={styleCard}
              styleContainerCard={styleContainerCard}
              styleInfo={styleInfo}
              styleTitle={styleTitle}
            />
          </View>
          <View style={styles.wrapInputForm}>
            <View style={styles.wrapDropdown}>
              <View
                style={openDropdown ? styles.dropdownTrue : styles.dropdown}>
                <TouchableOpacity
                  onPress={handleOpenDropdown}
                  style={styles.tombolDropdown}>
                  <Text style={styles.textDropdown}>
                    {String(cutiDesc) === '' ? 'Pilih Type Cuti' : cutiDesc}
                  </Text>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    size={25}
                    color={openDropdown ? Color.white : Color.green}
                  />
                </TouchableOpacity>
                {openDropdown ? (
                  <DropdownCuti
                    data={dataCt => setCutiDesc(dataCt)}
                    idTypeCuti={dt => setDataId(dt)}
                    dataType={dataCuti}
                    valueCuti={dtValue => setJmlhValue(dtValue)}
                  />
                ) : (
                  ''
                )}
              </View>
            </View>
            <View style={{position: 'relative', gap: 10}}>
              {/* <CustomTextInput
              label="tgl awal - akhir cuti"
              value={awalCuti === '' ? 'haha' : 'hehehe'}
              secureTextEntry={false}
            /> */}
              <FakeTextInput
                value={`${form.tglMulai} - ${form.tglSelesai}`}
                label="Tgl Awal - Akhir Cuti"
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
              <FakeTextInput
                value={form.tglKembaliKerja}
                label="Tgl Masuk Kerja"
              />
              <CustomTextInput
                label="Keperluan Cuti"
                secureTextEntry={false}
                value={form.keperluanCuti}
                onTextChange={value => onChangeText(value, 'keperluanCuti')}
              />

              <CustomTextInput
                label="Alamat Cuti"
                secureTextEntry={false}
                value={form.alamatCuti}
                onTextChange={value => onChangeText(value, 'alamatCuti')}
              />
            </View>
            <View style={styles.catatanCuti}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.label}>Jumlah Cuti</Text>
                <Text style={styles.textValue}>
                  {jmlhValue !== 0
                    ? jmlhValue
                    : data.jumlahCutiAtauSakit !== 0
                    ? data.jumlahCutiAtauSakit
                    : '-'}
                </Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.label}>Hari Libur</Text>
                <Text style={styles.textValue}>
                  {data.jumlahTanggalMerah !== 0
                    ? data.jumlahTanggalMerah
                    : '-'}
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
            <ButtonAction
              title="KIRIM"
              onPress={() => sendData()}
              style={{width: 269}}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FormCuti;

const styles = StyleSheet.create({
  formCuti: {
    height: '100%',
    width: '100%',
    // paddingTop: 140,
    paddingVertical: 70,
    alignItems: 'center',
    position: 'relative',
  },
  cardFormCuti: {
    width: 320,
    paddingVertical: 20,
    backgroundColor: Color.white,
    borderRadius: 10,
  },
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 25,
  },
  judul: {
    fontFamily: text.semiBold,
    fontSize: 26,
    color: Color.blue,
    width: '100%',
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
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
  wrapDropdown: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    position: 'relative',
    marginBottom: 70,
  },
  dropdown: {
    width: '86.6%',
    minHeight: 50,
    // backgroundColor: Color.blue,
    borderBottomWidth: 2,
    borderBottomColor: Color.green,
    borderRadius: 5,
    paddingHorizontal: 20,
    // paddingVertical: 10,
    position: 'absolute',
    zIndex: 10,
  },
  dropdownTrue: {
    width: '86.6%',
    minHeight: 50,
    backgroundColor: Color.green,
    // borderBottomWidth: 2,
    // borderBottomColor: Color.green ,
    borderRadius: 5,
    paddingHorizontal: 20,
    // paddingVertical: 10,
    position: 'absolute',
    zIndex: 10,
  },
  tombolDropdown: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textDropdown: {
    fontSize: 19,
    fontFamily: text.light,
    color: Color.blue,
    right: 10,
  },
});
