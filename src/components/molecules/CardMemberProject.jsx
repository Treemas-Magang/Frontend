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
      style={styles.CardMemberProject}
      onPress={() => moveTo('listMembers')}>
      <Text style={styles.Text}>{nama}</Text>
    </TouchableOpacity>
  );
};

export default CardMemberProject;

const styles = StyleSheet.create({
  CardMemberProject: {
    backgroundColor: 'transparent',
    borderColor: Color.green,
    borderWidth: 2,
    width: 300,
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
    textAlign: 'center',
  },
});
