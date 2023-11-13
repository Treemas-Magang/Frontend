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
import DropdownCustom from '../atoms/DropdownCustom';
import {getDataFromSession} from '../../utils/getDataSession';
import axios from 'axios';

const FormClaim = ({navigation}) => {
  // const [itemSelect, setItemSelect] = useState('');
  const dispatch = useDispatch();
  const {form_claim} = useSelector(state => state.FormClaimReducer);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log('loading : ', isLoading);
  const [openDropdownCustom, setOpenDropdownCustom] = useState(false);
  const [keterangan, setKeterangan] = useState('');
  const [dataId, setDataId] = useState('');
  const [dataClaim, setDataClaim] = useState([]);
  const handleOpenDropdownCustom = () => {
    setOpenDropdownCustom(!openDropdownCustom);
  };
  useEffect(() => {
    if (keterangan !== '') {
      setOpenDropdownCustom(false);
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
    try {
      getDataFromSession('nik')
        .then(nik => dispatch(setFormClaim('nik', nik)))
        .catch(() => console.log('gagal ambil nik'));
      getDataFromSession('nama')
        .then(nama => dispatch(setFormClaim('nama', nama)))
        .catch(() => console.log('gagal ambil nama'));
    } catch (error) {
      console.log('code ambil data nik dan nama gagal');
    }
    dispatch(setFormClaim('id_claim', dataId));
  }, [dispatch, dataId]);

  const onChangeText = (value, inputType) => {
    dispatch(setFormClaim(inputType, value));
  };
  const openKamera = () => {
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
            'https://treemas-api-403500.et.r.appspot.com/api/master-data/claim-view',
            {headers},
          );
          const dtClaim = response.data.data.user;
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
  const sendData = () => {
    console.log('kirim data : ', form_claim);
    // kirimDataDanFotoKeAPI();
  };
  return (
    <View style={styles.congtainerForm}>
      <Text style={styles.textJudul}>form claim</Text>
      <View style={styles.wrapDropdown}>
        <View
          style={openDropdownCustom ? styles.dropdownTrue : styles.dropdown}>
          <TouchableOpacity
            onPress={handleOpenDropdownCustom}
            style={styles.tombolDropdown}>
            <Text style={styles.lokasiProject}>
              {keterangan === '' ? 'Pilih Type Claim' : keterangan}
            </Text>
            <FontAwesomeIcon
              icon={faCaretDown}
              size={25}
              color={openDropdownCustom ? Color.white : Color.green}
            />
          </TouchableOpacity>
          {openDropdownCustom ? (
            <DropdownCustom
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
        value={form_claim.nominal}
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
        <ButtonAction title="kirim" style={{width: 148}} onPress={sendData} />
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
});
