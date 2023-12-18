/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
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
import CustomTextInputProfile from '../atoms/CustomTextInpuProfile';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {AlertNotificationWarning} from '../atoms/AlertNotification';

const DetailProfile = ({navigation, stylePP}) => {
  const dispatch = useDispatch();
  const {form} = useSelector(state => state.DetailProfileReducer);
  const [initialForm, setInitialForm] = useState({});
  const [prevEditableFields, setPrevEditableFields] = useState({});
  const [alertWarning, setAlertWarning] = useState(false);
  const [editableFields, setEditableFields] = React.useState({
    nik: false,
    tempatLahir: false,
    tanggalLahir: false,
    jenisKelamin: false,
    agama: false,
    kewarganegaraan: false,
    alamatKTP: false,
    kodePos: false,
    alamatSekarang: false,
    noHP: false,
    email: false,
    noRekening: false,
    jenjangPendidikan: false,
    tanggalBergabung: false,
    statusPerkawinan: false,
    golonganDarah: false,
    kontakDarurat: false,
    statusDarurat: false,
    alamatDarurat: false,
    telponDarurat: false,
    noKTP: false,
    noNPWP: false,
    asuransi: false,
    kartuKeluarga: false,
  });
  const [isClicked, setIsClicked] = useState({
    nik: false,
    tempatLahir: false,
    tanggalLahir: false,
    jenisKelamin: false,
    agama: false,
    kewarganegaraan: false,
    alamatKTP: false,
    kodePos: false,
    alamatSekarang: false,
    noHP: false,
    email: false,
    noRekening: false,
    jenjangPendidikan: false,
    tanggalBergabung: false,
    statusPerkawinan: false,
    golonganDarah: false,
    kontakDarurat: false,
    statusDarurat: false,
    alamatDarurat: false,
    telponDarurat: false,
    noKTP: false,
    noNPWP: false,
    asuransi: false,
    kartuKeluarga: false,
    // Tambahkan sesuai dengan bagian lain yang perlu diubah
  });
  const [showEditButtons, setShowEditButtons] = React.useState(false);

  const onChangeText = (value, inputType) => {
    dispatch(setFormDetailProfile(inputType, value));
  };

  const toggleEditMode = field => {
    if (!showEditButtons) {
      setEditableFields(prevFields => ({
        ...prevFields,
        [field]: !prevFields[field],
      }));
      setInitialForm({...form});
      setShowEditButtons(true);
      setIsClicked(prevIsClicked => ({
        ...prevIsClicked,
        [field]: true,
      }));
    } else {
      if (field === 'batal') {
        setEditableFields({...prevEditableFields});
        setShowEditButtons(false);
        setIsClicked(prevIsClicked => ({
          ...prevIsClicked,
          [field]: false,
        }));
        setAlertWarning(false);
      } else {
        setAlertWarning(false);
        setEditableFields({
          nik: false,
          tempatLahir: false,
          tanggalLahir: false,
          jenisKelamin: false,
          agama: false,
          kewarganegaraan: false,
          alamatKTP: false,
          kodePos: false,
          alamatSekarang: false,
          noHP: false,
          email: false,
          noRekening: false,
          jenjangPendidikan: false,
          tanggalBergabung: false,
          statusPerkawinan: false,
          golonganDarah: false,
          kontakDarurat: false,
          statusDarurat: false,
          alamatDarurat: false,
          telponDarurat: false,
          noKTP: false,
          noNPWP: false,
          asuransi: false,
          kartuKeluarga: false,
        });
        setShowEditButtons(false); // Sembunyikan tombol edit setelah berhasil diedit
        // setShowEditButtons(false);
        setIsClicked(prevIsClicked => ({
          ...prevIsClicked,
          [field]: false,
        }));
      }
    }
  };

  useEffect(() => {
    // Simpan state editableFields sebelumnya
    setPrevEditableFields({...editableFields});
  }, [editableFields]);

  const resetForm = () => {
    setAlertWarning(false);
    setEditableFields({
      nik: false,
      tempatLahir: false,
      tanggalLahir: false,
      jenisKelamin: false,
      agama: false,
      kewarganegaraan: false,
      alamatKTP: false,
      kodePos: false,
      alamatSekarang: false,
      noHP: false,
      email: false,
      noRekening: false,
      jenjangPendidikan: false,
      tanggalBergabung: false,
      statusPerkawinan: false,
      golonganDarah: false,
      kontakDarurat: false,
      statusDarurat: false,
      alamatDarurat: false,
      telponDarurat: false,
      noKTP: false,
      noNPWP: false,
      asuransi: false,
      kartuKeluarga: false,
    });

    setShowEditButtons(false);

    // Reset nilai formulir ke nilai awal hanya jika tombol "BATAL" diklik saat tombol edit sedang ditampilkan
    if (showEditButtons) {
      dispatch(setFormDetailProfile('nik', initialForm.nik));
      dispatch(setFormDetailProfile('tempatLahir', initialForm.tempatLahir));
      dispatch(setFormDetailProfile('tanggalLahir', initialForm.tanggalLahir));
      dispatch(setFormDetailProfile('jenisKelamin', initialForm.jenisKelamin));
      dispatch(setFormDetailProfile('agama', initialForm.agama));
      dispatch(
        setFormDetailProfile('kewarganegaraan', initialForm.kewarganegaraan),
      );
      dispatch(setFormDetailProfile('kodePos', initialForm.kodePos));
      dispatch(
        setFormDetailProfile('alamatSekarang', initialForm.alamatSekarang),
      );
      dispatch(setFormDetailProfile('noHP', initialForm.noHP));
      dispatch(setFormDetailProfile('email', initialForm.email));
      dispatch(
        setFormDetailProfile(
          'jenjangPendidikan',
          initialForm.jenjangPendidikan,
        ),
      );
      dispatch(
        setFormDetailProfile('tanggalBergabung', initialForm.tanggalBergabung),
      );
      dispatch(setFormDetailProfile('statusKawin', initialForm.statusKawin));
      dispatch(
        setFormDetailProfile('golonganDarah', initialForm.golonganDarah),
      );
      dispatch(
        setFormDetailProfile('kontakDarurat', initialForm.kontakDarurat),
      );
      dispatch(
        setFormDetailProfile('noKontakDarurat', initialForm.noKontakDarurat),
      );
      dispatch(
        setFormDetailProfile('statusDarurat', initialForm.statusDarurat),
      );
      dispatch(
        setFormDetailProfile('alamatDarurat', initialForm.alamatDarurat),
      );
      dispatch(setFormDetailProfile('ktp', initialForm.ktp));
      dispatch(setFormDetailProfile('npwp', initialForm.npwp));
      dispatch(setFormDetailProfile('asuransi', initialForm.asuransi));
      dispatch(setFormDetailProfile('kk', initialForm.kk));
    } else {
      // Jika tombol "BATAL" diklik saat tombol edit tidak ditampilkan, maka reset formulir ke nilai sebelumnya
      dispatch(setFormDetailProfile('nik', prevEditableFields.nik));
      dispatch(setFormDetailProfile('nama', prevEditableFields.nama));
      dispatch(
        setFormDetailProfile('tempatLahir', prevEditableFields.tempatLahir),
      );
      dispatch(
        setFormDetailProfile('tanggalLahir', prevEditableFields.tanggalLahir),
      );
      dispatch(
        setFormDetailProfile('jenisKelamin', prevEditableFields.jenisKelamin),
      );
      dispatch(setFormDetailProfile('agama', prevEditableFields.agama));
      dispatch(
        setFormDetailProfile(
          'kewarganegaraan',
          prevEditableFields.kewarganegaraan,
        ),
      );
      dispatch(setFormDetailProfile('kodePos', prevEditableFields.kodePos));
      dispatch(
        setFormDetailProfile(
          'alamatSekarang',
          prevEditableFields.alamatSekarang,
        ),
      );
      dispatch(setFormDetailProfile('noHP', prevEditableFields.noHP));
      dispatch(setFormDetailProfile('email', prevEditableFields.email));
      dispatch(
        setFormDetailProfile(
          'jenjangPendidikan',
          prevEditableFields.jenjangPendidikan,
        ),
      );
      dispatch(
        setFormDetailProfile(
          'tanggalBergabung',
          prevEditableFields.tanggalBergabung,
        ),
      );
      dispatch(
        setFormDetailProfile('statusKawin', prevEditableFields.statusKawin),
      );
      dispatch(
        setFormDetailProfile('golonganDarah', prevEditableFields.golonganDarah),
      );
      dispatch(
        setFormDetailProfile('kontakDarurat', prevEditableFields.kontakDarurat),
      );
      dispatch(
        setFormDetailProfile(
          'noKontakDarurat',
          prevEditableFields.noKontakDarurat,
        ),
      );
      dispatch(
        setFormDetailProfile('statusDarurat', prevEditableFields.statusDarurat),
      );
      dispatch(
        setFormDetailProfile('alamatDarurat', prevEditableFields.alamatDarurat),
      );
      dispatch(setFormDetailProfile('ktp', prevEditableFields.ktp));
      dispatch(setFormDetailProfile('npwp', prevEditableFields.npwp));
      dispatch(setFormDetailProfile('asuransi', prevEditableFields.asuransi));
      dispatch(setFormDetailProfile('kk', prevEditableFields.kk));
    }
  };

  const sendData = () => {
    // Validate if any of the form fields is empty
    const isEmptyField = Object.values(form).some(value => value === '');
    setIsClicked(prevIsClicked => {
      const newIsClicked = Object.fromEntries(
        Object.keys(prevIsClicked).map(key => [key, false]),
      );
      return newIsClicked;
    });
    setEditableFields({
      nik: false,
      tempatLahir: false,
      tanggalLahir: false,
      jenisKelamin: false,
      agama: false,
      kewarganegaraan: false,
      alamatKTP: false,
      kodePos: false,
      alamatSekarang: false,
      noHP: false,
      email: false,
      noRekening: false,
      jenjangPendidikan: false,
      tanggalBergabung: false,
      statusPerkawinan: false,
      golonganDarah: false,
      kontakDarurat: false,
      statusDarurat: false,
      alamatDarurat: false,
      telponDarurat: false,
      noKTP: false,
      noNPWP: false,
      asuransi: false,
      kartuKeluarga: false,
    });

    if (isEmptyField) {
      setAlertWarning(true);
      // Show custom alert notification for empty data
    } else {
      setAlertWarning(false);
      console.log('kirim data : ', form);
      setShowEditButtons(false); // Hide the edit buttons after sending data
      setEditableFields({
        nik: false,
        tempatLahir: false,
        tanggalLahir: false,
        jenisKelamin: false,
        agama: false,
        kewarganegaraan: false,
        alamatKTP: false,
        kodePos: false,
        alamatSekarang: false,
        noHP: false,
        email: false,
        noRekening: false,
        jenjangPendidikan: false,
        tanggalBergabung: false,
        statusPerkawinan: false,
        golonganDarah: false,
        kontakDarurat: false,
        statusDarurat: false,
        alamatDarurat: false,
        telponDarurat: false,
        noKTP: false,
        noNPWP: false,
        asuransi: false,
        kartuKeluarga: false,
      });
    }
  };

  const close = () => {
    setAlertWarning(false);
    // Implementasi penutupan atau navigasi kembali
    // sesuai dengan kebutuhan Anda
  };

  return (
    <View style={{backgroundColor: Color.green, flex: 1, position: 'relative'}}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View
        style={{
          width: wp('100%'),
          height: hp('20%'),
          justifyContent: 'center',
        }}>
        <Text style={styles.Judul}>PROFILE</Text>
      </View>
      <View style={styles.backgroundDetailProfile}>
        {alertWarning ? (
          <AlertNotificationWarning
            buttonAlert="Close"
            textBodyAlert="Data Tidak Boleh Kosong"
            titleAlert="Success"
            onPress={close}
          />
        ) : (
          ''
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/vector/user.png')}
                style={[styles.pp, stylePP]}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.textName}>Azriel FachrulRezy</Text>
          </View>
          <View style={{marginBottom: 20, marginTop: 10, alignItems: 'center'}}>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="NIK"
                editable={editableFields.nik}
                value={form.nik}
                onTextChange={value => onChangeText(value, 'nik')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Tempat Lahir"
                editable={editableFields.tempatLahir}
                value={form.tempatLahir}
                multiline
                onTextChange={value => onChangeText(value, 'tempatLahir')}
              />
              <View style={styles.wrapImageAlamat}>
                <TouchableOpacity onPress={() => toggleEditMode('tempatLahir')}>
                  {isClicked.tempatLahir ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Tanggal Lahir"
                editable={editableFields.tanggalLahir}
                value={form.tanggalLahir}
                onTextChange={value => onChangeText(value, 'tanggalLahir')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity
                  onPress={() => toggleEditMode('tanggalLahir')}>
                  {isClicked.tanggalLahir ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Jenis Kelamin"
                editable={editableFields.jenisKelamin}
                value={form.jenisKelamin}
                onTextChange={value => onChangeText(value, 'jenisKelamin')}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Agama"
                editable={editableFields.agama}
                value={form.agama}
                onTextChange={value => onChangeText(value, 'agama')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity onPress={() => toggleEditMode('agama')}>
                  {isClicked.agama ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Kewarganegaraan"
                editable={editableFields.kewarganegaraan}
                value={form.kewarganegaraan}
                onTextChange={value => onChangeText(value, 'kewarganegaraan')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity
                  onPress={() => toggleEditMode('kewarganegaraan')}>
                  {isClicked.kewarganegaraan ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Alamat KTP"
                editable={editableFields.alamatKTP}
                value={form.alamatKTP}
                multiline
                onTextChange={value => onChangeText(value, 'alamatKTP')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity onPress={() => toggleEditMode('alamatKTP')}>
                  {isClicked.alamatKTP ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Kode Pos"
                editable={editableFields.kodePos}
                value={form.kodePos}
                onTextChange={value => onChangeText(value, 'kodePos')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity onPress={() => toggleEditMode('kodePos')}>
                  {isClicked.kodePos ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Alamat Sekarang"
                editable={editableFields.alamatSekarang}
                value={form.alamatSekarang}
                multiline
                onTextChange={value => onChangeText(value, 'alamatSekarang')}
              />
              <View style={styles.wrapImageAlamat}>
                <TouchableOpacity
                  onPress={() => toggleEditMode('alamatSekarang')}>
                  {isClicked.alamatSekarang ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="No HP"
                editable={editableFields.noHP}
                value={form.noHP}
                onTextChange={value => onChangeText(value, 'noHP')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity onPress={() => toggleEditMode('noHP')}>
                  {isClicked.noHP ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Email"
                editable={editableFields.email}
                value={form.email}
                onTextChange={value => onChangeText(value, 'email')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity onPress={() => toggleEditMode('email')}>
                  {isClicked.email ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="No Rekening"
                editable={editableFields.noRekening}
                value={form.noRekening}
                onTextChange={value => onChangeText(value, 'noRekening')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity onPress={() => toggleEditMode('noRekening')}>
                  {isClicked.noRekening ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Jenjang Pendidikan"
                editable={editableFields.jenjangPendidikan}
                value={form.jenjangPendidikan}
                onTextChange={value => onChangeText(value, 'jenjangPendidikan')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity
                  onPress={() => toggleEditMode('jenjangPendidikan')}>
                  {isClicked.jenjangPendidikan ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Tanggal Bergabung"
                editable={editableFields.tanggalBergabung}
                value={form.tanggalBergabung}
                onTextChange={value => onChangeText(value, 'tanggalBergabung')}
              />
              {/* <View style={styles.wrapImage}>
                <TouchableOpacity
                  onPress={() => toggleEditMode('tanggalBergabung')}>
                  {isClicked ? (
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
              </View> */}
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Status Perkawinan"
                editable={editableFields.statusPerkawinan}
                value={form.statusPerkawinan}
                onTextChange={value => onChangeText(value, 'statusPerkawinan')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity
                  onPress={() => toggleEditMode('statusPerkawinan')}>
                  {isClicked.statusPerkawinan ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Golongan Darah"
                editable={editableFields.golonganDarah}
                value={form.golonganDarah}
                onTextChange={value => onChangeText(value, 'golonganDarah')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity
                  onPress={() => toggleEditMode('golonganDarah')}>
                  {isClicked.golonganDarah ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Kontak Darurat"
                editable={editableFields.kontakDarurat}
                value={form.kontakDarurat}
                onTextChange={value => onChangeText(value, 'kontakDarurat')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity
                  onPress={() => toggleEditMode('kontakDarurat')}>
                  {isClicked.kontakDarurat ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Status Darurat"
                editable={editableFields.statusDarurat}
                value={form.statusDarurat}
                onTextChange={value => onChangeText(value, 'statusDarurat')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity
                  onPress={() => toggleEditMode('statusDarurat')}>
                  {isClicked.statusDarurat ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Alamat Darurat"
                editable={editableFields.alamatDarurat}
                value={form.alamatDarurat}
                multiline
                onTextChange={value => onChangeText(value, 'alamatDarurat')}
              />
              <View style={styles.wrapImageAlamat}>
                <TouchableOpacity
                  onPress={() => toggleEditMode('alamatDarurat')}>
                  {isClicked.alamatDarurat ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Telpon Darurat"
                editable={editableFields.telponDarurat}
                value={form.telponDarurat}
                onTextChange={value => onChangeText(value, 'telponDarurat')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity
                  onPress={() => toggleEditMode('telponDarurat')}>
                  {isClicked.telponDarurat ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="No KTP"
                editable={editableFields.noKTP}
                value={form.noKTP}
                onTextChange={value => onChangeText(value, 'noKTP')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity onPress={() => toggleEditMode('noKTP')}>
                  {isClicked.noKTP ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="No NPWP"
                editable={editableFields.noNPWP}
                value={form.noNPWP}
                onTextChange={value => onChangeText(value, 'noNPWP')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity onPress={() => toggleEditMode('noNPWP')}>
                  {isClicked.noNPWP ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Asuransi"
                editable={editableFields.asuransi}
                value={form.asuransi}
                onTextChange={value => onChangeText(value, 'asuransi')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity onPress={() => toggleEditMode('asuransi')}>
                  {isClicked.asuransi ? (
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
            </View>
            <View style={{marginBottom: 10}}>
              <CustomTextInputProfile
                label="Kartu Keluarga"
                editable={editableFields.kartuKeluarga}
                value={form.kartuKeluarga}
                onTextChange={value => onChangeText(value, 'kartuKeluarga')}
              />
              <View style={styles.wrapImage}>
                <TouchableOpacity
                  onPress={() => toggleEditMode('kartuKeluarga')}>
                  {isClicked.kartuKeluarga ? (
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
            </View>
          </View>

          {showEditButtons && (
            <View style={{alignItems: 'center', marginBottom: 40}}>
              <TouchableOpacity onPress={sendData} style={styles.ButtonEdit}>
                <Text style={styles.textButton}>Update</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
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
