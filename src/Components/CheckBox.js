import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const CheckBox = (props) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={props.onPress}
                style={{
                    width: 15,
                    height: 15,
                    borderWidth: 1.5,
                    borderColor: 'gray',
                    backgroundColor: 'gray',
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2
                }}

            >
                {props.status && <Text
                    style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                    }}
                >✓</Text>}
            </TouchableOpacity>

            <Text style={{ color: 'gray', fontSize: 13 }}>{props.text}</Text>

        </View>
    );
}

export { CheckBox };