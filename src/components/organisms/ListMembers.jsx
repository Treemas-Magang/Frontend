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
        <ButtonBack
          navigation={navigation}
          style={{position: 'absolute', top: 20, left: 20}}
        />
        <Image
          style={styles.VectorAtasKanan}
          source={require('../../assets/vector/VectorKananAtas.png')}
        />
        <View style={{paddingVertical: 70}}></View>
        <View style={styles.wrapListMember}>
          {isDropdown ? <DropdownList /> : ''}
          <TouchableOpacity onPress={handleDropdown} style={styles.iconDrop}>
            <FontAwesomeIcon
              icon={faArrowDownShortWide}
              size={30}
              color={Color.blue}
            />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.judul}>MEMBER</Text>
            <Text style={styles.judul}>MANDIRI</Text>
          </View>
          <View style={styles.wrapStatus}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <View
                style={[
                  styles.simbolStatus,
                  {backgroundColor: Color.cardMasuk},
                ]}
              />
              <Text>Hadir</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <View
                style={[styles.simbolStatus, {backgroundColor: Color.cardCuti}]}
              />
              <Text>Cuti</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <View
                style={[
                  styles.simbolStatus,
                  {backgroundColor: Color.cardTidakMasuk},
                ]}
              />
              <Text>Tidak masuk</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
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
              <CardMember status='sakit' />
              <CardMember status='tidakMasuk' />
              <CardMember status='hadir' />
              <CardMember status='cuti' />
              <CardMember />
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
    fontSize: 24,
    color: Color.blue,
  },
  iconDrop: {
    position: 'absolute',
    left: 30,
    top: 25,
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
  VectorAtasKanan: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
});
