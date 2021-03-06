import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { Input, Button } from '../../Components'
import { Icon } from 'native-base'

import { connect } from 'react-redux';
import { login, isUser } from '../../Actions'
import * as RootNavigation from '../../RootNavigation';
import { colors } from '../../style';

const FirstScreen = (props) => {
    useEffect(() => {
        props.isUser();
    }, []);

    if (props.loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator color='black' size='large' />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>

            <View style={{ flex: 1, backgroundColor: '', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Icon style={{ color: colors.main }} type="FontAwesome" name={'twitter'} fontSize={40} />
            </View>

            <View style={{ flex: 8, backgroundColor: '', width: '80%', alignItems: 'center', justifyContent: 'center' }}>

                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 25,
                    width: '100%',
                    marginBottom: 20,
                    textAlign: 'left',
                    padding: 10,
                }}>Şu anda dünyada olup bitenleri gör.</Text>

                <Button
                    text={'Hesap Oluştur'}
                    style={{ width: '100%', height: 35 }}
                    onPress={() => {
                        props.navigation.navigate('Register')
                    }}
                />
            </View>

            <View style={{ flex: 1, width: '70%', backgroundColor: '' }}>
                <Text style={{ fontSize: 12 }}>Zaten bir hesabın var mı?
                <Text style={{ color: colors.main }} onPress={() => { props.navigation.navigate('Login') }}> Giriş yap</Text></Text>
            </View>
        </SafeAreaView>
    )
}


const mapStateToProps = ({ authResponse }) => {
    const { loading, user } = authResponse;
    return { loading, user };
};

export default connect(mapStateToProps, { login, isUser })(FirstScreen);