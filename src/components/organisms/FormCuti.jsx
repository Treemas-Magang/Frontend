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
import {cekTglAkhirCutiSpesial} from '../../utils/cekTglAkhirCutiSpesial';
import KalenderCuti from '../molecules/KalenderCuti';
import {AlertNotificationSuccess} from '../atoms/AlertNotification';
import ButtonLoading from '../atoms/ButtonLoading';

const FormCuti = ({
  style,
  styleCard,
  styleContainerCard,
  styleInfo,
  styleTitle,
}) => {
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.FormCutiReducer);
  const [awalCuti, setAwalCuti] = useState(form.tanggal_cuti);
  const [showKalender, setShowKalender] = useState(false);
  const [uploadBerhasil, setUploadBerhasil] = useState(false);
  const [inputKosong, setInputKosong] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
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
    setInputKosong(false);
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
      dispatch(
        setFormCuti(
          'jmlCutiBersama',
          data.jumlahCutiBersama + data.jumlahTanggalMerah,
        ),
      );
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
        // setBtnLoading(false);
      }
    };
    fetchData();
  }, []);

  const kirimDataKeAPI = async () => {
    console.log('sedang kirim data');
    // setIsServerError(false);
    try {
      //mengambil token untuk otorisasi
      const token = await getDataFromSession('token');
      if (token !== null) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        try {
          const response = await axios.post(
            API_GABUNGAN + '/api/detail-data/cuti-form/add',
            form,
            {headers},
          );
          console.log('berhasil di kirim');
          console.log(response.data.success);
          console.log(uploadBerhasil);
          setBtnLoading(false);
          setUploadBerhasil(true);
          // setIsLoading(false);
          //saat berhasil kirim data kosongkan reducer
        } catch (error) {
          console.log(error.response);
          const errorCode = error.response.status;
          switch (errorCode) {
            case 400:
              console.log('gagal kirim form cuti');
              // setIsLoading(false);
              break;
            case 403:
              console.log('error aja');
              // setIsLoading(false);
              break;
            case 404:
              // setIsLoading(false);
              break;
            case 500:
              // setIsLoading(false);
              // setIsServerError(true);
              console.log('Kesalahan server');
              break;
            default:
              // setIsLoading(false);
              console.log(error.response);
              console.log('gagal ajukan cuti');
              // setShowErrorAlert(true);
              break;
          }
        }
      } else {
        console.log('Data tidak ditemukan di session.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      setBtnLoading(false);
    }
  };

  const sendData = async () => {
    if (
      form.alamatCuti !== '' &&
      form.jmlCuti !== null &&
      form.keperluanCuti !== '' &&
      form.selectedMasterCutiId !== '' &&
      form.tglKembaliKerja !== '' &&
      form.tglMulai !== '' &&
      form.tglSelesai !== ''
    ) {
      setInputKosong(false);
      console.log('kirim data : ', form);
      await kirimDataKeAPI();
      // setBtnLoading(true);
    } else {
      setInputKosong(true);
      // console.warn('tidak boleh ada data yang kosong');
      console.log('ini dari reducer : ', form);
    }
  };

  // const sendData = async () => {
  //   if (
  //     form.alamatCuti !== '' &&
  //     form.jmlCuti !== null &&
  //     form.keperluanCuti !== '' &&
  //     form.selectedMasterCutiId !== '' &&
  //     form.tglKembaliKerja !== '' &&
  //     form.tglMulai !== '' &&
  //     form.tglSelesai !== ''
  //   ) {
  //     setInputKosong(false);
  //     console.log('kirim data : ', form);
  //     setBtnLoading(true);

  //     try {
  //       // Kirim data ke server di sini (gunakan axios atau metode lainnya)
  //       // Pastikan untuk menangani respons dari server dan menangkap kesalahan jika ada

  //       // Simulasikan pengiriman data dengan menggunakan setTimeout
  //       // Anda bisa menggantinya dengan kode yang sesuai dengan logika pengiriman data sebenarnya
  //       setTimeout(() => {
  //         setUploadBerhasil(true);
  //         setBtnLoading(false);
  //       }, 2000); // Waktu simulasi pengiriman data (dalam milidetik)
  //     } catch (error) {
  //       console.error('Terjadi Kesalahan:', error);
  //       setBtnLoading(false);
  //       // Tambahkan penanganan kesalahan jika diperlukan
  //     }
  //   } else {
  //     setInputKosong(true);
  //     console.log('ini dari reducer : ', form);
  //   }
  // };

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
    setMaxDurasiCuti(jmlhSemuaCuti);
  }, [statistik]);

  // const close = async () => {
  //   setUploadBerhasil(false);
  // };
  return (
    <TouchableWithoutFeedback onPress={handleClickOutside}>
      <View style={styles.formCuti}>
        {uploadBerhasil ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <AlertNotificationSuccess
              buttonAlert="Close"
              textBodyAlert="Berhasil Mengajukan Cuti"
              titleAlert="Success"
              onPress={close}
            />
          </View>
        ) : (
          ''
        )}
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
                style={
                  openDropdown
                    ? styles.dropdownTrue
                    : inputKosong
                    ? styles.dropdownSalah
                    : styles.dropdown
                }>
                <TouchableOpacity
                  onPress={handleOpenDropdown}
                  style={styles.tombolDropdown}>
                  <Text
                    style={
                      inputKosong
                        ? styles.textDropdownSalah
                        : styles.textDropdown
                    }>
                    {String(cutiDesc) === '' ? 'Pilih Type Cuti' : cutiDesc}
                  </Text>
                  {inputKosong ? (
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      size={25}
                      color={openDropdown ? Color.white : Color.red}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      size={25}
                      color={openDropdown ? Color.white : Color.green}
                    />
                  )}
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
            <View style={{position: 'relative', gap: 20}}>
              {/* <CustomTextInput
              label="tgl awal - akhir cuti"
              value={awalCuti === '' ? 'haha' : 'hehehe'}
              secureTextEntry={false}
            /> */}
              <FakeTextInput
                value={
                  form.tglMulai !== '' && form.tglSelesai !== ''
                    ? `${form.tglMulai} - ${form.tglSelesai}`
                    : '-'
                }
                label="Tgl Awal - Akhir Cuti"
                textColor={inputKosong ? Color.red : Color.blue}
                style={inputKosong ? styles.fieldSalah : styles.fieldBener}
                dataKosong={inputKosong}
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
                {inputKosong ? (
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    size={25}
                    color={Color.red}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    size={25}
                    color={Color.green}
                  />
                )}
              </TouchableOpacity>
              {/* <CustomTextInput label="tgl masuk kerja" editable={false} /> */}
              <FakeTextInput
                value={
                  form.tglKembaliKerja == '' ? '-' : `${form.tglKembaliKerja}`
                }
                label="Tgl Masuk Kerja"
                textColor={inputKosong ? Color.red : Color.blue}
                style={inputKosong ? styles.fieldSalah : styles.fieldBener}
                dataKosong={inputKosong}
              />
              <CustomTextInput
                label="Keperluan Cuti"
                value={form.keperluanCuti}
                secureTextEntry={false}
                textColor={inputKosong ? Color.red : Color.blue}
                style={inputKosong ? styles.fieldSalah : styles.fieldBener}
                onTextChange={value => onChangeText(value, 'keperluanCuti')}
              />
              <CustomTextInput
                label="Alamat Cuti"
                value={form.alamatCuti}
                secureTextEntry={false}
                textColor={inputKosong ? Color.red : Color.blue}
                style={inputKosong ? styles.fieldSalah : styles.fieldBener}
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
            {inputKosong ? (
              <Text style={styles.labelSalah}>Field Tidak Boleh Kosong!</Text>
            ) : (
              ''
            )}
            {btnLoading ? (
              <ButtonLoading style={{width: 269}} />
            ) : (
              <ButtonAction
                title="KIRIM"
                onPress={sendData}
                style={{width: 269}}
              />
            )}
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
  dropdownSalah: {
    width: '86.6%',
    minHeight: 50,
    // backgroundColor: Color.blue,
    borderBottomWidth: 2,
    borderBottomColor: Color.red,
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
  fieldSalah: {
    width: 275,
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: Color.red,
    borderBottomWidth: 1,
    paddingBottom: -10,
  },
  fieldBener: {
    width: 275,
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: Color.green,
    borderBottomWidth: 1,
    paddingBottom: -10,
  },
  textDropdownSalah: {
    fontSize: 19,
    fontFamily: text.light,
    color: Color.red,
    right: 10,
  },
  labelSalah: {
    fontFamily: text.semiBold,
    fontSize: 14,
    color: Color.red,
    textAlign: 'center',
  },
});
