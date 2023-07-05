import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const StackHeader = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <AntDesign name="menuunfold" size={24} color="black" />
  </TouchableOpacity>
);

export default StackHeader;
