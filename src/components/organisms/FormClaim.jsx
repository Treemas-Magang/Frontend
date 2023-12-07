/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import CustomTextInput from '../atoms/CustomTextInput';
import ButtonCamera from '../atoms/ButtonCamera';
import ButtonGalery from '../atoms/ButtonGalery';
import ButtonAction from '../atoms/ButtonAction';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {setFormClaim} from '../../redux';
import {openCamera, openGalerImg} from '../../utils/getPhoto';
import DropdownClaim from '../atoms/DropdownClaim';
import {getDataFromSession} from '../../utils/getDataSession';
import axios from 'axios';
import {API_URL, API_GABUNGAN} from '@env';
import {
  AlertNotificationDanger,
  AlertNotificationSuccess,
  AlertNotificationWarning,
} from '../atoms/AlertNotification';
import ButtonLoading from '../atoms/ButtonLoading';

const FormClaim = ({navigation}) => {
  // const [itemSelect, setItemSelect] = useState('');
  const dispatch = useDispatch();
  const {form_claim} = useSelector(state => state.FormClaimReducer);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log('loading : ', isLoading);
  const [openDropdownClaim, setOpenDropdownClaim] = useState(false);
  const [keterangan, setKeterangan] = useState('');
  const [dataId, setDataId] = useState('');
  const [dataClaim, setDataClaim] = useState([]);
  const [uploadBerhasil, setUploadBerhasil] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const handleOpenDropdownClaim = () => {
    setOpenDropdownClaim(!openDropdownClaim);
    setShowErrorAlert(false);
  };
  useEffect(() => {
    if (keterangan !== '') {
      setOpenDropdownClaim(false);
    }
  }, [keterangan]);
  let base64ImageData = null;
  if (capturedImage && capturedImage.base64 && capturedImage.fileSize) {
    base64ImageData = `data:image/jpeg;base64,${capturedImage.base64}`;
    console.log('ini file size : ', capturedImage.fileSize);
  } else {
    console.log("imageData tidak ada atau tidak memiliki properti 'base64'");
  }
  useEffect(() => {
    // try {
    //   // getDataFromSession('nik')
    //   //   .then(nik => dispatch(setFormClaim('nik', nik)))
    //   //   .catch(() => console.log('gagal ambil nik'));
    //   // getDataFromSession('nama')
    //   //   .then(nama => dispatch(setFormClaim('nama', nama)))
    //   //   .catch(() => console.log('gagal ambil nama'));
    //   // getDataFromSession('dataProfilUser')
    //   //   .then(data => {
    //   //     const dataProfile = JSON.parse(data);
    //   //     console.log('data profil : ', dataProfile);
    //   //     dispatch(setFormClaim('nik', dataProfile.nik))
    //   //     dispatch(setFormClaim('nama', dataProfile.full_name));
    //   //   })
    //   //   .catch(error => console.log(error));
    // } catch (error) {
    //   console.log('code ambil data nik dan nama gagal');
    // }
    dispatch(setFormClaim('selectedTipeClaim', dataId));
  }, [dispatch, dataId]);

  const onChangeText = (value, inputType) => {
    // Konversi nilai numerik ke string jika diperlukan
    const convertedValue = typeof value === 'number' ? value.toString() : value;

    dispatch(setFormClaim(inputType, convertedValue));
  };
  const openKamera = () => {
    setShowErrorAlert(false);
    setCapturedImage(null);
    setIsLoading(true);
    openCamera()
      .then(imageData => {
        setCapturedImage(imageData);
        dispatch(setFormClaim('image64', imageData.base64));
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
    setShowErrorAlert(false);
    setCapturedImage(null);
    setIsLoading(true);
    openGalerImg()
      .then(imageData => {
        setCapturedImage(imageData);
        dispatch(setFormClaim('image64', imageData.base64));
        setIsLoading(false);
      })
      .catch(error => {
        // Tangani kesalahan
        setIsLoading(false);
        // console.error(error);
      });
  };

  const moveToPreview = () => {
    navigation.navigate('previewPhoto', {photo: base64ImageData});
    setShowErrorAlert(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getDataFromSession('token');
        if (token !== null) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.get(
            API_GABUNGAN + '/api/master-data/claim-view',
            {headers},
          );
          const dtClaim = response.data.data;
          console.log(response);
          setDataClaim(dtClaim);
        } else {
          console.log('Data tidak ditemukan di session.');
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    };

    fetchData();
  }, []);

  const kirimDataKeAPI = async () => {
    setIsServerError(false);
    try {
      //mengambil token untuk otorisasi
      const token = await getDataFromSession('token');
      if (token !== null) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        try {
          const response = await axios.post(
            API_GABUNGAN + '/api/report-data/claim-form/add',
            form_claim,
            {headers},
          );
          console.log(response.data.success);
          console.log('berhasil mengajukan claim');
          console.log(uploadBerhasil);
          setBtnLoading(false);
          setUploadBerhasil(true);
          dispatch(setFormClaim('selectedTipeClaim', '')); //reducer nya tidak ke reset
          dispatch(setFormClaim('keterangan', '')); //reducer nya tidak ke reset
          dispatch(setFormClaim('nominal', '')); //reducer nya tidak ke reset
          dispatch(setFormClaim('image64', '')); //reducer nya tidak ke reset
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
              setIsServerError(true);
              console.log('Kesalahan server');
              break;
            default:
              setIsLoading(false);
              console.log(error.response);
              console.log('gagal ajukan claim');
              setShowErrorAlert(true);
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
    console.log('kirim data : ', form_claim);
    // kirimDataDanFotoKeAPI();
    try {
      setBtnLoading(true); // Set btnLoading to true when starting the data submission

      // Melakukan pengiriman data ke API
      await kirimDataKeAPI();
    } finally {
      setBtnLoading(false); // Set btnLoading back to false when the process is completed (regardless of success or failure)
    }
  };
  const close = () => {
    setUploadBerhasil(false);
    setShowErrorAlert(false);
  };

  // const toRekapClaim = () => {
  //   navigation.navigate('rekapClaim');
  //   // navigation.navigate({
  //   //   index: 0,
  //   //   routes: [{name: 'rekapClaim'}],
  //   // });
  // };
  return (
    <View style={styles.congtainerForm}>
      {uploadBerhasil ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <AlertNotificationSuccess
            buttonAlert="Close"
            textBodyAlert="Berhasil Melakukan Claim"
            titleAlert="Success"
            onPress={close}
          />
        </View>
      ) : // Kondisi di mana upload tidak berhasil, tetapi isServerError belum diketahui
      isServerError ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <AlertNotificationDanger
            buttonAlert="Close"
            textBodyAlert="Server Error"
            titleAlert="Failed"
            onPress={close}
          />
        </View>
      ) : (
        // Kondisi di mana upload tidak berhasil dan tidak ada kesalahan server
        showErrorAlert && (
          <AlertNotificationDanger
            buttonAlert="Close"
            textBodyAlert="Gagal Melakukan Claim"
            titleAlert="Failed"
            onPress={close}
          />
        )
      )}
      <Text style={styles.textJudul}>form claim</Text>
      <View style={styles.wrapDropdown}>
        <View style={openDropdownClaim ? styles.dropdownTrue : styles.dropdown}>
          <TouchableOpacity
            onPress={handleOpenDropdownClaim}
            style={styles.tombolDropdown}>
            <Text style={styles.textDropdown}>
              {keterangan === '' ? 'Pilih Type Claim' : keterangan}
            </Text>
            <FontAwesomeIcon
              icon={faCaretDown}
              size={25}
              color={openDropdownClaim ? Color.white : Color.green}
            />
          </TouchableOpacity>
          {openDropdownClaim ? (
            <DropdownClaim
              data={data => setKeterangan(data)}
              idTypeClaim={dt => setDataId(dt)}
              dataType={dataClaim}
            />
          ) : (
            ''
          )}
        </View>
      </View>
      <CustomTextInput
        label="Keterangan"
        secureTextEntry={false}
        value={form_claim.keterangan}
        onTextChange={value => onChangeText(value, 'keterangan')}
      />
      <CustomTextInput
        label="Nominal"
        secureTextEntry={false}
        value={
          form_claim.nominal.toString() === '0'
            ? ''
            : form_claim.nominal.toString()
        }
        keyboardType={'numeric'}
        onTextChange={value => onChangeText(value, 'nominal')}
      />
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
        <ButtonCamera onPress={openKamera} />
        <ButtonGalery onPress={openGalery} />
        {btnLoading ? (
          <ButtonLoading style={{width: 148}} />
        ) : (
          <ButtonAction title="kirim" style={{width: 148}} onPress={sendData} />
        )}
      </View>
    </View>
  );
};

export default FormClaim;

const styles = StyleSheet.create({
  congtainerForm: {
    width: 320,
    paddingVertical: 30,
    backgroundColor: Color.white,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textJudul: {
    fontFamily: text.semiBold,
    fontSize: 26,
    textTransform: 'uppercase',
    color: Color.blue,
  },
  textArea: {
    width: 275,
    height: 100,
    paddingHorizontal: 10,
    borderBottomColor: Color.green,
    borderBottomWidth: 1,
    color: Color.text,
    paddingBottom: -10,
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
