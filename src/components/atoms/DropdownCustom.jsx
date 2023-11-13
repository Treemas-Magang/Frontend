/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const DropdownApproval = ({dataPilihanProjact}) => {
  const [tempatProject, setTempatProject] = useState('');
  const handlePilihTempatProject = value => {
    setTempatProject(value);
  };
  dataPilihanProjact(tempatProject);

  return (
    <View>
      <TouchableOpacity
        onPress={() => handlePilihTempatProject('BANK JAGO REGULER SHIFT')}
        style={styles.item}>
        <Text style={styles.tempatProject}>BANK JAGO REGULER SHIFT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePilihTempatProject('BANK JAGO EOD SHIFT')}
        style={styles.item}>
        <Text style={styles.tempatProject}>BANK JAGO EOD SHIFT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePilihTempatProject('TREEMAS SOLUSI UTAMA')}
        style={styles.item}>
        <Text style={styles.tempatProject}>TREEMAS SOLUSI UTAMA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePilihTempatProject('BANK UOB')}
        style={styles.item}>
        <Text style={styles.tempatProject}>BANK UOB</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePilihTempatProject('CTBC BANK')}
        style={styles.item}>
        <Text style={styles.tempatProject}>CTBC BANK</Text>
      </TouchableOpacity>
      <View style={styles.batasBawah} />
    </View>
  );
};

export default DropdownApproval;

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
