/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import CustomTextInput from '../atoms/CustomTextInput';
import ButtonAction from '../atoms/ButtonAction';
import KalenderRange from '../molecules/KalenderRange';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarDays, faCamera} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {setFormSakit} from '../../redux';
import FakeTextInput from '../atoms/FakeTextInput';
import ButtonCamera from '../atoms/ButtonCamera';
import ButtonGalery from '../atoms/ButtonGalery';
import {openCamera, openGalerImg} from '../../utils/getPhoto';
import { getDataFromSession } from '../../utils/getDataSession';
import axios from 'axios';
import {API_URL, API_GABUNGAN} from '@env';

const FormSakit = ({navigation}) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log('loading : ', isLoading);
  let base64ImageData = null;
  if (capturedImage && capturedImage.base64 && capturedImage.fileSize) {
    base64ImageData = `data:image/jpeg;base64,${capturedImage.base64}`;
    console.log('ini file size : ', capturedImage.fileSize);
  } else {
    console.log("imageData tidak ada atau tidak memiliki properti 'base64'");
  }
  useEffect(() => {
    if (capturedImage && capturedImage.base64) {
      dispatch(setFormSakit('image', capturedImage.base64));
    } else {
      console.log("imageData tidak ada atau tidak memiliki properti 'base64'");
    }
  }, [dispatch, capturedImage]);
  console.log('ini base64Image : ', base64ImageData);
  const dispatch = useDispatch();
  const {form_sakit} = useSelector(state => state.FormSakitReducer);
  //   console.log('ini dari reducer : ', form);
  const [showKalender, setShowKalender] = useState(false);
  const [uploadBerhasil, setUploadBerhasil] = useState(false);
  const [adaSuratDokter, setAdaSuratDoker] = useState(false);
  const [data, setData] = useState({
    jumlahCutiAtauSakit: 0,
    jumlahCutiBersama: 0,
    jumlahTanggalMerah: 0,
    tanggalMasuk: '',
    startDate: '',
    endDate: '',
  });
  const openKalender = () => {
    setShowKalender(!showKalender);
  };
  const suratDokter = () => {
    setAdaSuratDoker(!adaSuratDokter);
  };
  console.log(adaSuratDokter);
  // useEffect(() => {
  //   const kirimFotoKeReducer = () => {
  //     dispatch(setFormSakit('foto', capturedImage));
  //   };
  //   kirimFotoKeReducer();
  // }, [capturedImage, dispatch]);
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
      dispatch(setFormSakit('tglMulai', newData.startDate));
      dispatch(setFormSakit('tglSelesai', newData.endDate));
      dispatch(setFormSakit('tglKembaliKerja', newData.tanggalMasuk));
      dispatch(setFormSakit('jmlCuti', newData.jumlahCutiAtauSakit));
    }
  };
  const onChangeText = (value, inputType) => {
    dispatch(setFormSakit(inputType, value));
  };
  // const handleImageCapture = image => {
  //   setTimeout(() => {
  //     setCapturedImage(image); // Update capturedImage with the captured image
  //   }, 2000); // Simulating a 2-second delay for image capture
  // };

  const openKamera = () => {
    setCapturedImage(null);
    setIsLoading(true);
    openCamera()
      .then(imageData => {
        setCapturedImage(imageData);
        setIsLoading(false);
        // Lakukan sesuatu dengan imageData (misalnya, tampilkan gambar)
      })
      .catch(error => {
        // Tangani kesalahan
        setIsLoading(false);
        // console.error(error);
      });
  };
  const openGalery = () => {
    setCapturedImage(null);
    setIsLoading(true);
    openGalerImg()
      .then(imageData => {
        setCapturedImage(imageData);
        setIsLoading(false);
      })
      .catch(error => {
        // Tangani kesalahan
        setIsLoading(false);
        // console.error(error);
      });
  };
const kirimDataKeAPI = async () => {
  try {
    //mengambil token untuk otorisasi
    const token = await getDataFromSession('token');
    if (token !== null) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        //melakukan hit ke API untuk kirim data Absen
        const response = await axios.post(
          API_GABUNGAN + '/api/detail-data/sakit-form/add',
          form_sakit,
          {headers},
        );
        console.log(response.data.success);
        console.log('berhasil mengajukan izin sakit');
        console.log(uploadBerhasil);
        setUploadBerhasil(true);
        setIsLoading(false);
        //saat berhasil kirim data kosongkan reducer
      } catch (error) {
        console.log(error.response);
        const errorCode = error.response.status;
        switch (errorCode) {
          case 403:
            console.log('error aja');
            setIsLoading(false);
            break;
          case 404:
            setIsLoading(false);
            break;
          case 500:
            setIsLoading(false);
            console.log('Kesalahan server');
            break;
          default:
            setIsLoading(false);
            console.log(error.response);
            console.log('gagal ajukan claim');
            break;
        }
      }
    } else {
      console.log('Data tidak ditemukan di session.');
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
};
  const sendData = async () => {
    console.log('kirim data : ', form_sakit);
    await kirimDataKeAPI();
  };
  const handleClickOutside = () => {
    setShowKalender(false);
  };
  const moveToPreview = () => {
    navigation.navigate('previewPhoto', {photo: base64ImageData});
  };
  return (
    <TouchableWithoutFeedback onPress={handleClickOutside}>
      <View style={styles.formCuti}>
        {showKalender && (
          <View style={{position: 'absolute', top: 0, right: 55, zIndex: 2}}>
            <KalenderRange onDataReady={handleDataReady} adaSuratDokter={adaSuratDokter} iniFormSakit={true} />
          </View>
        )}
        <View style={styles.cardFormCuti}>
          <Text style={styles.judul}>Form Sakit</Text>
          <View style={styles.wrapInputForm}>
            <View style={{position: 'relative', gap: 10}}>
              <FakeTextInput label="Surat Dokter" />
              <TouchableOpacity
                onPress={suratDokter}
                style={[
                  adaSuratDokter
                    ? styles.suratDokterFalse
                    : styles.suratDokterTrue,
                ]}>
                <Text
                  style={[
                    adaSuratDokter
                      ? {color: Color.white}
                      : {color: Color.green},
                  ]}>
                  ADA
                </Text>
              </TouchableOpacity>
              <FakeTextInput
                value={`${form_sakit.tglMulai} - ${form_sakit.tglSelesai}`}
                label="tgl awal - akhir cuti"
              />
              <TouchableOpacity
                onPress={openKalender}
                style={{
                  position: 'absolute',
                  top: 67,
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
                value={form_sakit.tglKembaliKerja}
                label="tgl masuk kerja"
              />
              <FakeTextInput value={form_sakit.jmlCuti} label="Jumlah hari" />
              <CustomTextInput
                label="Alasan"
                secureTextEntry={false}
                value={form_sakit.keperluanCuti}
                onTextChange={value => onChangeText(value, 'keperluanCuti')}
              />
            </View>

            {adaSuratDokter ? (
              <>
                <View style={styles.kotakPreviewKosong}>
                  <View style={styles.previewKosong}>
                    {base64ImageData === null ? (
                      <>
                        {isLoading ? (
                          <ActivityIndicator size="large" color={Color.black} />
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faCamera} size={50} />
                            <Text>Preview</Text>
                          </>
                        )}
                      </>
                    ) : (
                      <TouchableOpacity
                        style={styles.previewKosong}
                        onPress={moveToPreview}>
                        <Image
                          source={{uri: base64ImageData}}
                          style={{
                            height: '100%',
                            width: '100%',
                            borderRadius: 10,
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <View style={styles.wrapperButton}>
                  <ButtonCamera
                    // onImageCapture={image => setCapturedImage(image)}
                    // onImageCapture={handleImageCapture}
                    // loading={loading => setIsLoading(loading)}
                    onPress={openKamera}
                  />
                  <ButtonGalery
                    // onImageGalery={image => setCapturedImage(image)}
                    onPress={openGalery}
                  />
                  <ButtonAction
                    title="kirim"
                    style={{width: 148}}
                    onPress={() => sendData()}
                  />
                </View>
              </>
            ) : (
              <ButtonAction
                title="KIRIM"
                onPress={() => sendData()}
                style={{width: 269}}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FormSakit;

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
  kotakPreviewKosong: {
    width: 275,
    height: 161,
    backgroundColor: Color.grey,
    borderRadius: 10,
  },
  wrapperButton: {flexDirection: 'row', gap: 10},
  previewKosong: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suratDokterTrue: {
    position: 'absolute',
    top: 10,
    right: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Color.green,
    borderRadius: 5,
  },
  suratDokterFalse: {
    position: 'absolute',
    top: 10,
    right: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Color.green,
    backgroundColor: Color.green,
    borderRadius: 5,
  },
});
