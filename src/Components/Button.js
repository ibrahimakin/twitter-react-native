import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';

const Button = (props) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={props.onPress}
    style={[{
      backgroundColor: '#74b9ff',
      //height: '17%',
      //marginTop: '4%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5
    }, props.style]}>
    {props.loading ?
      <ActivityIndicator size='small' color='white' /> :
      <Text style={{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18
      }}>{props.text}</Text>}
  </TouchableOpacity>
);

export { Button };