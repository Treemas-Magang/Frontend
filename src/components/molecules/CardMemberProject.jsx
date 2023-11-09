import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import {text} from '../../utils/text';

const CardMemberProject = ({navigation, nama}) => {
  const moveTo = tujuan => {
    navigation.navigate(tujuan);
  };
  return (
    <TouchableOpacity
      style={styles.CardPilihProject}
      onPress={() => moveTo('listMembers')}>
      <Text style={styles.Text}>{nama}</Text>
    </TouchableOpacity>
  );
};

export default CardMemberProject;

const styles = StyleSheet.create({
  CardPilihProject: {
    backgroundColor: 'transparent',
    borderColor: Color.green,
    borderWidth: 2,
    width: 280,
    minHeight: 50,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontFamily: text.semiBold,
    fontSize: 16,
    color: Color.green,
    textTransform: 'uppercase',
  },
});
