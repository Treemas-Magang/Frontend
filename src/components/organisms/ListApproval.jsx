/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import KategoriApproval from '../molecules/KategoriApproval';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import DropdownApproval from '../atoms/DropdownApproval';

const ListApproval = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [tempatProject, setTempatProject] = useState('');
  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  useEffect(()=>{
    if (tempatProject !== '') {
        setOpenDropdown(false);
    }
  }, [tempatProject]);
  return (
    <View style={styles.listApproval}>
      <View style={styles.wrapJudul}>
        <Text>APPROVAL</Text>
      </View>
      <View style={styles.wrapList}>
        <View style={styles.kategoriApproval}>
          <KategoriApproval />
        </View>
        <View style={styles.wrapDropdown}>
          <View style={styles.dropdown}>
            <TouchableOpacity
              onPress={handleOpenDropdown}
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
            {openDropdown ? (
              <DropdownApproval
                dataPilihanProjact={data => setTempatProject(data)}
              />
            ) : (
              ''
            )}
          </View>
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
  },
  wrapList: {
    backgroundColor: Color.white,
    height: '85%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  wrapJudul: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kategoriApproval: {
    alignItems: 'center',
    marginTop: 35,
  },
  wrapDropdown: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  dropdown: {
    width: '90%',
    minHeight: 50,
    backgroundColor: Color.blue,
    borderRadius: 5,
    paddingHorizontal: 20,
    // paddingVertical: 10,
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
});
