import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors } from '../style';

const Button = (props) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={props.onPress}
    style={[{
      backgroundColor: colors.main,
      //height: '17%',
      //marginTop: '4%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20
    }, props.style]}>
    {props.loading ?
      <ActivityIndicator size='small' color='white' /> :
      <Text style={{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
      }}>{props.text}</Text>}
  </TouchableOpacity>
);

export { Button };