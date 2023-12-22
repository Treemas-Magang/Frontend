/* eslint-disable prettier/prettier */

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {API_GABUNGAN} from '@env';
import axios from 'axios';
import { getDataFromSession } from '../../utils/getDataSession';

/**
 * Komponen DropdownList digunakan untuk membuat dropdown pilihan sorting.
 *
 * @returns {JSX.Element} - Komponen React untuk dropdown pilihan sorting.
 */
const DropdownListAbsenByProject = ({onSelectSortOption}) => {
  const [isSort, setIsSort] = useState('');
  const [pilihProjects, setPilihProject] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  /**
   * Fungsi handleOption digunakan untuk menangani pemilihan opsi sorting.
   * @param {string} value - Nilai opsi sorting yang dipilih.
   */
  const handleOption = value => {
    setIsSort(value);
    onSelectSortOption(value); // Panggil fungsi yang diberikan dengan nilai isSort
  };
  console.log(isSort);

    const getDataPenempatan = async headers => {
      try {
        const response = await axios.get(
          API_GABUNGAN + '/api/absen/get-all-projects',
          {headers},
        );
        console.log('project : ',response.data.data);
        const dataAPI = response.data.data;
        const newData = dataAPI.filter(item => item.active === '1');
        // const dataKosong = [];
        setPilihProject(newData);
        setIsLoading(false);
        console.log('data : ', newData);
      } catch (error) {
        console.log('Tidak dapat mengambil data ', error);
        setIsLoading(false);
      }
    };

    useEffect(() => {
      getDataFromSession('token')
        .then(token => {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          getDataPenempatan(headers);
        })
        .catch(error => console.log(error));
    }, []);



  return (
    <View style={[styles.dropdown]}>
      <TouchableOpacity
        onPress={() => handleOption('all-project')}
        style={styles.option}>
        <Text style={styles.textOption}>All Projects</Text>
      </TouchableOpacity>
      {pilihProjects.map((project, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleOption(project.projectId)}
          style={styles.option}>
          <Text style={styles.textOption}>{project.projectName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: 200,
    backgroundColor: Color.green,
    position: 'absolute',
    zIndex: 10,
    top: 60,
    left: 30,
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
  option: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.white,
  },
  textOption: {
    fontFamily: text.regular,
    fontSize: 12,
    color: Color.white,
  },
});

export default DropdownListAbsenByProject;
