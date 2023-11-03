/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable space-infix-ops */
/* eslint-disable comma-dangle */
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
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../atoms/Dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {setFormClaim} from '../../redux';
import {openCamera, openGalerImg} from '../../utils/getPhoto';

const jenis_cuti = [
  {id_cuti: 'CD1', keterangan_cuti: 'cuti 1'},
  {id_cuti: 'CD2', keterangan_cuti: 'cuti 2'},
  {id_cuti: 'CD3', keterangan_cuti: 'cuti 3'},
  {id_cuti: 'CD4', keterangan_cuti: 'cuti 4'},
];

const FormClaim = ({navigation}) => {
  const [itemSelect, setItemSelect] = useState('');
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.FormClaimReducer);
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
  console.log('ini base64Image : ', base64ImageData);

  // useEffect(() => {
  //   dispatch(setFormClaim('type', itemSelect));
  //   dispatch(setFormClaim('nik', '999'));
  // }, [dispatch, capturedImage, itemSelect]);
  const onChangeText = (value, inputType) => {
    dispatch(setFormClaim(inputType, value));
  };

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

  const sendData = () => {
    // console.log('kirim data : ', form);
    // kirimDataDanFotoKeAPI();
  };
  const moveToPreview = () => {
    navigation.navigate('previewPhoto', {photo: base64ImageData});
  };
  return (
    <View style={styles.congtainerForm}>
      <Text style={styles.textJudul}>form claim</Text>
      <Dropdown
        onSelect={selectedItem => setItemSelect(selectedItem)}
        nama_dropdown="Type"
        jenis_cuti={jenis_cuti}
      />
      <CustomTextInput
        label="Keterangan"
        secureTextEntry={false}
        value={form.keterangan}
        onTextChange={value => onChangeText(value, 'keterangan')}
      />
      <CustomTextInput
        label="Nominal"
        secureTextEntry={false}
        value={form.nominal}
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
});
