/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import KategoriApproval from '../molecules/KategoriApproval';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import DropdownApproval from '../atoms/DropdownApproval';
import CardApproval from '../molecules/CardApproval';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import VectorAtasKecil from '../atoms/VectorAtasKecil';
import {API_URL, API_GABUNGAN} from '@env';
import axios from 'axios';
import { getDataFromSession } from '../../utils/getDataSession';

const ListApproval = ({navigation}) => {
  const [openDropdownApproval, setOpenDropdownApproval] = useState(false);
  const [tempatProject, setTempatProject] = useState('');
  const [idProject, setIdProject] = useState(null);
  const [kategori, setKategori] = useState('sakit');
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true
  const [dataApp, setDataApp] = useState([]);
  const handleOpenDropdownApproval = () => {
    setOpenDropdownApproval(!openDropdownApproval);
  };
  useEffect(() => {
    if (tempatProject !== '') {
      setOpenDropdownApproval(false);
    }
  }, [tempatProject]);

  const getDataApproval = async headers => {
    try {
      let apiUrl = `${API_GABUNGAN}/api/notif/get-approval?by=${kategori}&projectId=${idProject}`; // Change this to the appropriate API endpoint

      const response = await axios.get(apiUrl, {
        headers,
      });

      console.log('res : ', response.data.data);
      const dataAPI = response.data;
      // const dataAPI = response.data.data;
      setDataApp(dataAPI);
      setIsLoading(false);
      console.log('data : ', dataAPI);
    } catch (error) {
      console.log('Tidak dapat mengambil data ', error.response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataFromSession('token')
      .then(token => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        getDataApproval(headers);
      })
      .catch(error => console.log(error));
  }, []);
  console.log('id : ', idProject);
  console.log('data APP : ', dataApp);
  return (
    <View style={styles.listApproval}>
      <ButtonBack navigation={navigation} />
      <ButtonHome navigation={navigation} />
      <VectorAtasKecil />
      <View style={styles.wrapJudul}>
        <Text style={styles.judul}>APPROVAL</Text>
      </View>
      <View style={styles.wrapList}>
        <View style={styles.kategoriApproval}>
          <KategoriApproval keyKategori={key => setKategori(key)} />
        </View>
        <View style={styles.wrapDropdown}>
          <View style={styles.dropdown}>
            <TouchableOpacity
              onPress={handleOpenDropdownApproval}
              style={styles.tombolDropdown}>
              <Text style={styles.lokasiProject}>
                {tempatProject === '' ? 'Pilih Lokasi Project' : tempatProject}
              </Text>
              <FontAwesomeIcon
                icon={faCaretDown}
                size={25}
                color={Color.white}
              />
            </TouchableOpacity>
            {openDropdownApproval ? (
              <DropdownApproval
                dataPilihanProjact={data => setTempatProject(data)}
                idProject={id => setIdProject(id)}
              />
            ) : (
              ''
            )}
          </View>
        </View>
        <View style={styles.wrapCardApproval}>
          <ScrollView
            style={{width: '90%'}}
            showsVerticalScrollIndicator={false}>
            <CardApproval navigation={navigation} />
            <CardApproval navigation={navigation} />
            <CardApproval navigation={navigation} />
            <CardApproval navigation={navigation} />
            <CardApproval navigation={navigation} />
            <CardApproval navigation={navigation} />
            <CardApproval navigation={navigation} />
            <CardApproval navigation={navigation} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default ListApproval;

const styles = StyleSheet.create({
  listApproval: {
    backgroundColor: Color.green,
    height: '100%',
    position: 'relative',
  },
  judul: {
    fontFamily: text.semiBold,
    fontSize: 26,
    color: Color.blue,
  },
  wrapList: {
    backgroundColor: Color.white,
    height: '85%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingBottom: 180,
  },
  wrapJudul: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kategoriApproval: {
    alignItems: 'center',
    marginTop: 40,
  },
  wrapDropdown: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    position: 'relative',
    marginBottom: 70,
  },
  dropdown: {
    width: '90%',
    minHeight: 50,
    backgroundColor: Color.blue,
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
  lokasiProject: {
    fontFamily: text.semiBold,
    fontSize: 15,
    color: Color.white,
  },
  wrapCardApproval: {
    alignItems: 'center',
    width: '100%',
  },
});
