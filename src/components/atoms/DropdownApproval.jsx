/* eslint-disable prettier/prettier */

import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import { getDataFromSession } from '../../utils/getDataSession';
import {API_URL, API_GABUNGAN} from '@env';
import axios from 'axios';
/**
 * Komponen DropdownApproval digunakan untuk membuat dropdown pilihan tempat proyek.
 *
 * @param {function} dataPilihanProjact - Fungsi untuk mengirim nilai tempat proyek yang dipilih ke komponen induk.
 * @returns {JSX.Element} - Komponen React untuk dropdown pilihan tempat proyek.
 */
const DropdownApproval = ({dataPilihanProjact, idProject}) => {
  const [tempatProject, setTempatProject] = useState('');
  const [projectId, setProjectId] = useState('');
  const [dataDropdown, setDataDropdown] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  /**
   * Fungsi handlePilihTempatProject digunakan untuk menangani pemilihan tempat proyek.
   * @param {string} value - Nilai tempat proyek yang dipilih.
   */
  const handlePilihTempatProject = (nama_project, id_project) => {
    setTempatProject(nama_project);
    setProjectId(id_project);

  };

  // Mengirim nilai tempat proyek yang dipilih ke komponen induk
  dataPilihanProjact(tempatProject);
  idProject(projectId);

    const getData = async headers => {
      try {
        const res = await axios.get(
          API_GABUNGAN + '/api/absen/get-all-projects',
          {
            headers,
          },
        );
        console.log('data : ', res.data.success);
        const dataApi = res.data.data;

        console.log('data baru : ', dataApi);
        setDataDropdown(dataApi);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    useEffect(() => {
      getDataFromSession('token')
        .then(token => {
          console.log(token);
          const headers = {
            Authorization: `Bearer ${token}`,
            contentType: 'application/json',
          };
          getData(headers);
        })
        .catch(error => {
          console.log(error);
          setIsLoading(false); // Set loading to false in case of error
        });
    }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={Color.white} />
      ) : (
        dataDropdown.map((data, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePilihTempatProject(data.projectName, data.projectId)}
            style={styles.item}>
            <Text style={styles.tempatProject}>{data.projectName}</Text>
          </TouchableOpacity>
        ))
      )}
      <View style={styles.batasBawah} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderColor: Color.white,
    paddingVertical: 10,
  },
  tempatProject: {
    color: Color.white,
    fontFamily: text.regular,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  batasBawah: {
    marginVertical: 10,
  },
});

export default DropdownApproval;
