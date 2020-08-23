import React from 'react';
import { TextInput, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

const Input = (props) => (
    <TextInput
        placeholder={props.placeholder}
        placeholderTextColor="#BBB"
        multiline={props.multiline}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        value={props.value}
        defaultValue={props.defaultValue}
        onChangeText={(value) => props.onChangeText(value)}
        style={[{
            //width: '90%',//width * 0.9,
            height: height * 0.07,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#2A2A2A',
            borderRadius: 3,
            paddingLeft: 10,
            fontSize: 14,
        }, props.style]}
    />
);

export { Input };