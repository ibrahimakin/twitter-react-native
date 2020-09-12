import React, { useState, useEffect } from 'react';
import { Alert, Text, View, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button, Input } from '../../Components/';
import { register } from "../../Actions"
import { connect } from 'react-redux';
import { colors } from '../../style';
import { Icon } from 'native-base'

const Register = (props) => {

    const [name, setName] = useState('Deneme');
    const [username, setUsername] = useState('deneme01');
    const [email, setEmail] = useState('deneme01@test.com');
    const [password, setPassword] = useState('1234567');


    const InvalidRegister = () => {
        Alert.alert("Alert", "Invalid name, e-mail or password!");
    };
    const ValidateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
        //alert("You have entered an invalid email address!")
    }
    const RegisterClick = () => {
        if (name == '' || username == '' || !ValidateEmail(email)) {
            InvalidRegister();
            return;
        }
        const params = {
            email,//"deneme@test.com",
            password,//"1234567"
            name,
            username
        };
        props.register(params);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-between' }}>
                <Text onPress={() => props.navigation.pop()} style={{ color: colors.main, fontSize: 14 }}>Vazgeç</Text>
                <Icon style={{ color: colors.main }} type="FontAwesome" name={'twitter'} fontSize={40} />
                <Icon style={{ color: colors.main }} type="FontAwesome" name={'ellipsis-h'} fontSize={25} />
            </View>
            <ScrollView style={{ flex: 0.8, }}>

                <View style={{ alignItems: 'center', }}>
                    <Text style={{ width: '85%', marginBottom: 20, marginTop: 20, fontSize: 28, fontWeight: 'bold' }}>Twitter'a kayıt ol</Text>
                    <Input placeholder='Name' value={name} onChangeText={(value) => setName(value)} style={{ marginBottom: 10, width: '85%', }} />
                    <Input placeholder='Username' value={username} onChangeText={(value) => setUsername(value)} style={{ marginBottom: 10, width: '85%', }} />
                    <Input placeholder='e-mail' value={email} onChangeText={(value) => setEmail(value)} style={{ marginBottom: 10, width: '85%', }} />
                    <Input placeholder='password' value={password} onChangeText={(value) => setPassword(value)} secureTextEntry style={{ marginBottom: 10, width: '85%', }} />
                </View>
            </ScrollView>



            <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'space-between', padding: 10, flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'gray' }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                    <Text style={styles.blueText}>  Forgot Password?</Text>
                </TouchableOpacity>
                <Button text='Sign Up' style={{ padding: 10, minWidth: 35, }} onPress={RegisterClick} loading={props.loading} />
            </View>
        </SafeAreaView>
    );
}

const styles = {
    mainText: { color: 'gray' },
    blueText: { color: colors.main, fontWeight: 'bold' },
    logo: { width: 200, height: 100, marginBottom: 10, },
    facebook: { width: 20, height: 20 },
    line: { width: '35%', height: 0.5, backgroundColor: 'gray' }

}
const mapStateToProps = ({ authResponse }) => {
    const { loading, user } = authResponse;
    return { loading, user };
}
export default connect(mapStateToProps, { register })(Register);