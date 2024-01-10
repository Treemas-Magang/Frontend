/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import {useDispatch, useSelector} from 'react-redux';
import {setFormDetailProfile} from '../../redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import {getDataFromSession} from '../../utils/getDataSession';
import axios from 'axios';
import {API_GABUNGAN} from '@env';
import CustomTextInputProfile from '../atoms/CustomTextInpuProfile';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faImage, faPen} from '@fortawesome/free-solid-svg-icons';
import SkeletonDetailProfile from '../skeleton/SkeletonDetailProfile';
import {AlertNotificationDanger, AlertNotificationSuccess, AlertNotificationWarning} from '../atoms/AlertNotification';
import ButtonRefresh from '../atoms/ButtonRefresh';
import ButtonLoading from '../atoms/ButtonLoading';
const DetailProfile = ({navigation, stylePP}) => {
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.DetailProfileReducer);
  const [dataProfile, setDataProfile] = useState([]);
  const [dataKaryawan, setDataKaryawan] = useState(form);
  console.log('data karyawan :', dataKaryawan);
  const [showEditButtons, setShowEditButtons] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [uploadBerhasil, setUploadBerhasil] = useState(false);
  const [gagalServer, setGagalServer] = useState(false);
  const [alertWarning, setAlertWarning] = useState(false);
  const [kategoriList, setKategoriList] = useState([
    {lebel: 'NIK', value: dataKaryawan?.nik, isClick: false, field: 'nik'},
    {
      lebel: 'Tempat Lahir',
      value: dataKaryawan?.tempatLahir,
      isClick: false,
      field: 'tempatLahir',
    },
    {
      lebel: 'Tanggal Lahir',
      value: dataKaryawan?.tanggalLahir,
      isClick: false,
      field: 'tanggalLahir',
    },
    {
      lebel: 'Jenis Kelamin',
      value: dataKaryawan?.jenisKelamin,
      isClick: false,
      field: 'jenisKelamin',
    },
    {
      lebel: 'Agama',
      value: dataKaryawan?.agama,
      isClick: false,
      field: 'agama',
    },
    {
      lebel: 'Kewarganegaraan',
      value: dataKaryawan?.kewarganegaraan,
      isClick: false,
      field: 'kewarganegaraan',
    },
    {
      lebel: 'Alamat KTP',
      value: dataKaryawan?.alamatKtp,
      isClick: false,
      field: 'alamatKtp',
    },
    {
      lebel: 'Kode Pos',
      value: dataKaryawan?.kodePos,
      isClick: false,
      field: 'kodePos',
    },
    {
      lebel: 'Alamat Sekarang',
      value: dataKaryawan?.alamatSekarang,
      isClick: false,
      field: 'alamatSekarang',
    },
    {
      lebel: 'No Hp',
      value: dataKaryawan?.noHp,
      isClick: false,
      field: 'noHp',
    },
    {
      lebel: 'Email',
      value: dataKaryawan?.email,
      isClick: false,
      field: 'email',
    },
    {
      lebel: 'No Rekening',
      value: dataKaryawan?.noRek,
      isClick: false,
      field: 'noRek',
    },
    {
      lebel: 'Jenjang Pendidikan',
      value: dataKaryawan?.jenjangPendidikan,
      isClick: false,
      field: 'jenjangPendidikan',
    },
    {
      lebel: 'Tanggal Bergabung',
      value: dataKaryawan?.tanggalBergabung,
      isClick: false,
      field: 'tanggalBergabung',
    },
    {
      lebel: 'Status Perkawinan',
      value: dataKaryawan?.statusPerkawinan,
      isClick: false,
      field: 'statusPerkawinan',
    },
    {
      lebel: 'Golongan Darah',
      value: dataKaryawan?.golonganDarah,
      isClick: false,
      field: 'golonganDarah',
    },
    {
      lebel: 'Kontak Darurat',
      value: dataKaryawan?.emergencyContact,
      isClick: false,
      field: 'emergencyContact',
    },
    {
      lebel: 'Status Darurat',
      value: dataKaryawan?.statusEmergency,
      isClick: false,
      field: 'statusEmergency',
    },
    {
      lebel: 'Alamat Darurat',
      value: dataKaryawan?.alamatEmergency,
      isClick: false,
      field: 'alamatEmergency',
    },
    {
      lebel: 'No KTP',
      value: dataKaryawan?.nomorKtp,
      isClick: false,
      field: 'nomorKtp',
    },
    {
      lebel: 'No NPWP',
      value: dataKaryawan?.noNpwp,
      isClick: false,
      field: 'noNpwp',
    },
    {
      lebel: 'Asuransi',
      value: dataKaryawan?.asuransi,
      isClick: false,
      field: 'asuransi',
    },
    {
      lebel: 'Kartu Keluarga',
      value: dataKaryawan?.kk,
      isClick: false,
      field: 'kk',
    },
  ]);

  const getDataProfileAPI = async (headers, nik) => {
    try {
      const response = await axios.get(
        API_GABUNGAN + '/api/master-data/karyawan-view/' + nik,
        {headers},
      );
      const dataAPI = response.data.data.karyawan;
      console.log('data ini punya user : ', dataAPI)
      setDataKaryawan(dataAPI);
      // console.log(response.data.data)
      dispatch(setFormDetailProfile('nik', dataAPI.nik));
      dispatch(setFormDetailProfile('tempatLahir', dataAPI.tempatLahir));
      dispatch(setFormDetailProfile('tanggalLahir', dataAPI.tanggalLahir));
      dispatch(setFormDetailProfile('jenisKelamin', dataAPI.jenisKelamin));
      dispatch(setFormDetailProfile('alamatKtp', dataAPI.alamatKtp));
      dispatch(setFormDetailProfile('agama', dataAPI.agama));
      dispatch(
        setFormDetailProfile('kewarganegaraan', dataAPI.kewarganegaraan),
      );
      dispatch(setFormDetailProfile('kodePos', dataAPI.kodePos));
      dispatch(setFormDetailProfile('alamatSekarang', dataAPI.alamatSekarang));
      dispatch(setFormDetailProfile('noHp', dataAPI.noHp));
      dispatch(setFormDetailProfile('nama', dataAPI.nama));
      dispatch(setFormDetailProfile('noRek', dataAPI.noRek));
      dispatch(setFormDetailProfile('email', dataAPI.email));
      dispatch(
        setFormDetailProfile('jenjangPendidikan', dataAPI.jenjangPendidikan),
      );
      dispatch(
        setFormDetailProfile('tanggalBergabung', dataAPI.tanggalBergabung),
      );
      dispatch(
        setFormDetailProfile('statusPerkawinan', dataAPI.statusPerkawinan),
      );
      dispatch(setFormDetailProfile('golonganDarah', dataAPI.golonganDarah));
      dispatch(
        setFormDetailProfile('emergencyContact', dataAPI.emergencyContact),
      );
      dispatch(setFormDetailProfile('telpEmergency', dataAPI.telpEmergency));
      dispatch(
        setFormDetailProfile('statusEmergency', dataAPI.statusEmergency),
      );
      dispatch(
        setFormDetailProfile('alamatEmergency', dataAPI.alamatEmergency),
      );
      dispatch(setFormDetailProfile('nomorKtp', dataAPI.nomorKtp));
      dispatch(setFormDetailProfile('noNpwp', dataAPI.noNpwp));
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // console.log('ini data nik / ', dataProfile.nik);
    getDataFromSession('token')
      .then(token => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        getDataProfileAPI(headers, dataProfile.nik);
      })
      .catch(error => console.log(error));
  }, [dataProfile]);

  const onChangeText = (value, inputType) => {
    dispatch(setFormDetailProfile(inputType, value));
  };

  let base64ImageData = '';
  if (dataProfile.karyawanImg !== null) {
    base64ImageData = `data:image/jpeg;base64,${dataProfile.karyawanImg}`;
  } else {
    console.log("imageData tidak ada atau tidak memiliki properti 'base64'");
  }
  useEffect(() => {
    try {
      getDataFromSession('dataProfilUser')
        .then(data => {
          const dataProfileStorage = JSON.parse(data);
          console.log('data profil : ', dataProfileStorage);
          setDataProfile(dataProfileStorage);
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log('ini foto kita :', dataProfile);

  const moveToPreview = () => {
    navigation.navigate('previewPhoto', {photo: base64ImageData});
  };

  const resetData = () => {
    getDataFromSession('token')
      .then(token => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        getDataProfileAPI(headers, dataProfile.nik);
      })
      .catch(error => console.log(error));
  };

  const handleButtonClick = async index => {
    // Duplikat array kategoriList
    const updatedKategoriList = [...kategoriList];

    // Mengubah nilai isClick pada objek yang sesuai
    updatedKategoriList[index] = {
      ...updatedKategoriList[index],
      isClick: !updatedKategoriList[index].isClick,
    };

    // Jika isClick true, simpan nilai awal
    if (updatedKategoriList[index].isClick) {
      updatedKategoriList[index].originalValue =
        updatedKategoriList[index].value;
    }

    // Memperbarui state kategoriList
    setKategoriList(updatedKategoriList);

    // Memeriksa apakah setidaknya satu elemen memiliki isClick true
    const shouldShowEditButtons = () => {
      return updatedKategoriList.some(item => item.isClick);
    };

    setShowEditButtons(shouldShowEditButtons());
  };

  const updateDataProfile = async () => {
    try {
      //mengambil token untuk otorisasi
      const token = await getDataFromSession('token');
      if (token !== null) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        try {
          //melakukan hit ke API untuk kirim data Absen
          const response = await axios.put(
            API_GABUNGAN + '/api/users/update-profile-mobile',
            form,
            {headers},
          );
          console.log(response);
          console.log('berhasil mengirim update dataProfile');
          console.log(uploadBerhasil);
          setUploadBerhasil(true);
          setBtnLoading(false);
          //saat berhasil kirim data kosongkan reducer
        } catch (error) {
          console.log(error.response);
          const errorCode = error.response.status;
          setGagalServer(true)
          switch (errorCode) {
            case 403:
              console.log('project tidak tepat');
              setBtnLoading(false);
              break;
            case 404:
              setBtnLoading(false);
              break;
            case 500:
              setBtnLoading(false);
              console.log('Kesalahan server');
              break;
            default:
              setBtnLoading(false);
              console.log(error.response);
              console.log('gagal absen');
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
  
    const toDashboard = () => {
      // navigation.replace('dashboard');
      navigation.reset({
        index: 0,
        routes: [{name: 'dashboard'}],
      });
    };

  const close = () => {
    setGagalServer(false);
    navigation.replace('dashboard');
  };
  
  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <ButtonRefresh navigation={navigation} />
      <VectorAtasKecil />
      {gagalServer ? (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AlertNotificationDanger
            buttonAlert="Close"
            textBodyAlert="Gagal Melakukan Approve/Reject"
            titleAlert="Failed"
            onPress={close}
          />
        </View>
      ) : (
        ''
      )}
      {uploadBerhasil ? (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AlertNotificationSuccess
            buttonAlert="Close"
            textBodyAlert="Berhasil Update Timesheet"
            titleAlert="Success"
            onPress={toDashboard}
          />
        </View>
      ) : (
        ''
      )}
      <View
        style={{
          width: wp('100%'),
          height: hp('20%'),
          justifyContent: 'center',
        }}>
        <Text style={styles.Judul}>PROFILE</Text>
      </View>
      {isLoading ? (
        <SkeletonDetailProfile />
      ) : (
        <View style={styles.backgroundDetailProfile}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={moveToPreview}>
                {base64ImageData !== '' ? (
                  <Image
                    source={{uri: base64ImageData}}
                    style={[styles.pp, stylePP]}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={require('../../assets/vector/user.png')}
                    style={[styles.pp, stylePP]}
                    resizeMode="cover"
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.textName}>{dataProfile.full_name}</Text>
            </View>
            <View
              style={{marginBottom: 20, marginTop: 10, alignItems: 'center'}}>
              {kategoriList.map((item, index) => (
                <View key={index} style={{marginBottom: 10}}>
                  <CustomTextInputProfile
                    label={item.lebel}
                    editable={item.isClick}
                    value={item.value}
                    onTextChange={value => onChangeText(value, item.field)}
                  />
                  {item.lebel === 'NIK' ||
                  item.lebel === 'Jenis Kelamin' ||
                  item.lebel === 'Golongan Darah' ||
                  item.lebel === 'Kewarganegaraan' ||
                  item.lebel === 'Agama' ||
                  item.lebel === 'Asuransi' ||
                  item.lebel === 'Kartu Keluarga' ||
                  item.lebel === 'Status Perkawinan' ||
                  item.lebel === 'Jenjang Pendidikan' ||
                  item.lebel === 'Tanggal Bergabung' ? (
                    ''
                  ) : (
                    <View style={styles.wrapImage}>
                      <TouchableOpacity
                        onPress={() => handleButtonClick(index)}>
                        {item.isClick ? (
                          <FontAwesomeIcon
                            icon={faPen}
                            color={Color.grey}
                            size={25}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faPen}
                            color={Color.green}
                            size={25}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                  {item.lebel === 'Asuransi' ||
                  item.lebel === 'Kartu Keluarga' ? (
                    <View style={styles.wrapImage}>
                      <TouchableOpacity
                        onPress={() => handleButtonClick(index)}>
                        {item.isClick ? (
                          <FontAwesomeIcon
                            icon={faImage}
                            color={Color.grey}
                            size={25}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faImage}
                            color={Color.green}
                            size={25}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  ) : (
                    ''
                  )}
                </View>
              ))}
            </View>
            {showEditButtons &&
              (btnLoading ? (
                <ButtonLoading />
              ) : (
                <View style={{alignItems: 'center', marginBottom: 40}}>
                  <TouchableOpacity
                    style={styles.ButtonEdit}
                    onPress={() => updateDataProfile()}>
                    <Text style={styles.textButton}>Update</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default DetailProfile;

const styles = StyleSheet.create({
  backgroundDetailProfile: {
    backgroundColor: Color.white,
    paddingHorizontal: 29,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    height: hp('90%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('10%'),
  },
  Judul: {
    textAlign: 'center',
    fontFamily: text.semiBold,
    fontSize: wp('6%'),
    color: Color.blue,
    textTransform: 'uppercase',
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
  ButtonBatal: {
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
  ButtonEdit: {
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
  textName: {
    fontFamily: text.semiBold,
    fontSize: 16,
    width: 280,
    color: Color.blue,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 10,
  },
  pp: {
    borderRadius: 200,
  },
  wrapImage: {
    position: 'absolute',
    zIndex: 99,
    flexDirection: 'row',
    right: 15,
    marginTop: 15,
  },
  wrapImageAlamat: {
    position: 'absolute',
    zIndex: 99,
    flexDirection: 'row',
    right: 15,
    marginTop: 35,
  },
  textButton: {
    fontFamily: text.semiBold,
    fontSize: 16,
    color: Color.white,
    textTransform: 'uppercase',
  },
});
