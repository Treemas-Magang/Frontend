/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
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

const ListApproval = ({navigation}) => {
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
        <ButtonBack
            navigation={navigation}
            style={{position: 'absolute', top: 20, left: 20}}
        />
        <ButtonHome
            navigation={navigation}
            style={{position: 'absolute', top: 20, right: 20}}
        />
        <Image
            style={styles.VectorAtas}
            source={require('../../assets/vector/VectorAtas.png')}
        />
      <View style={styles.wrapJudul}>
        <Text style={styles.judul}>APPROVAL</Text>
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
        <View style={styles.wrapCardApproval}>
            <ScrollView style={{width: '90%'}} showsVerticalScrollIndicator={false}>
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
    position: 'relative'
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
    VectorAtas: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
