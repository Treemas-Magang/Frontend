/* eslint-disable prettier/prettier */
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import CardMember from '../molecules/CardMember';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowDownShortWide} from '@fortawesome/free-solid-svg-icons';
import DropdownList from '../atoms/DropdownList';
import ButtonBack from '../atoms/ButtonBack';
import ButtonHome from '../atoms/ButtonHome';
import VectorAtasBesar from '../atoms/VectorAtasBesar';

const ListMembers = ({navigation}) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
    console.log(isDropdown);
  };
  const handleClickOutside = () => {
    setIsDropdown(false);
  };
  return (
    <TouchableWithoutFeedback onPress={handleClickOutside}>
      <View style={styles.listMember}>
        <ButtonBack navigation={navigation} />
        <ButtonHome navigation={navigation} />
        <VectorAtasBesar />
        <View style={{paddingVertical: 55}}></View>
        <View style={styles.wrapListMember}>
          {isDropdown ? <DropdownList /> : ''}
          <TouchableOpacity onPress={handleDropdown} style={styles.iconDrop}>
            <FontAwesomeIcon
              icon={faArrowDownShortWide}
              size={30}
              color={Color.blue}
            />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '74%',
              // height: '15%',
            }}>
            <Text style={styles.judul}>Member</Text>
            <Text style={styles.judul}>TREEMAS SOLUSI UTAMA</Text>
          </View>
          <View style={styles.wrapStatus}>
            <View style={styles.labelKet}>
              <View
                style={[
                  styles.simbolStatus,
                  {backgroundColor: Color.cardMasuk},
                ]}
              />
              <Text>Hadir</Text>
            </View>
            <View style={styles.labelKet}>
              <View
                style={[styles.simbolStatus, {backgroundColor: Color.cardCuti}]}
              />
              <Text>Cuti</Text>
            </View>
            <View style={styles.labelKet}>
              <View
                style={[
                  styles.simbolStatus,
                  {backgroundColor: Color.cardTidakMasuk},
                ]}
              />
              <Text>Tidak masuk</Text>
            </View>
            <View style={styles.labelKet}>
              <View
                style={[
                  styles.simbolStatus,
                  {backgroundColor: Color.cardSakit},
                ]}
              />
              <Text>Sakit/izin</Text>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{gap: 20}}>
              <CardMember status="sakit" navigation={navigation} />
              <CardMember status="tidakMasuk" navigation={navigation} />
              <CardMember status="sakit" navigation={navigation} />
              <CardMember status="tidakMasuk" navigation={navigation} />
              <CardMember status="hadir" navigation={navigation} />
              <CardMember status="cuti" navigation={navigation} />
              <CardMember status="hadir" navigation={navigation} />
              <CardMember status="cuti" navigation={navigation} />
            </View>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ListMembers;

const styles = StyleSheet.create({
  listMember: {
    backgroundColor: Color.green,
    width: '100%',
    height: '100%',
  },
  wrapListMember: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    position: 'relative',
    paddingVertical: 5,
  },
  judul: {
    fontFamily: text.semiBold,
    fontSize: 20,
    color: Color.blue,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  iconDrop: {
    position: 'absolute',
    left: 15,
    top: 20,
  },
  wrapStatus: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    marginBottom: 5,
  },
  simbolStatus: {
    width: 15,
    height: 15,
    borderRadius: 15,
  },
  labelKet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
