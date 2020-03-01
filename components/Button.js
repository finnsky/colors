import React from 'react';
import { TouchableOpacity } from 'react-native';
import { LuckyText } from './StyledText';
import Styles from './Styles';

export default function Button(props) {
  return (
    <TouchableOpacity
      {...props}
      style={Styles.button}>
      <LuckyText style={{ fontSize: 28, color: '#fff', marginLeft: "auto", marginRight: "auto" }}>{props.text}</LuckyText>
    </TouchableOpacity>
  );
}
