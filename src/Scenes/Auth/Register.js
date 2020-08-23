import React, { useState, useEffect } from 'react';
import { Alert, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button, Input } from '../../Components/';
import { register } from "../../Actions"
import { connect } from 'react-redux';
import { colors } from '../../style';
import { Icon } from 'native-base'

const Register = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const InvalidRegister = () => {
        Alert.alert("Alert", "Invalid name, e-mail or password!");
    };
    const ValidateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
        //alert("You have entered an invalid email address!")
    }
    const RegisterClick = () => {
        if (firstName == '' || lastName == '' || !ValidateEmail(email)) {
            InvalidRegister();
            return;
        }
        const params = {
            email,//"deneme@test.com",
            password,//"1234567"
            firstName,
            lastName
        };
        props.register(params);
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'green' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-between' }}>
                <Text onPress={() => props.navigation.pop()} style={{ color: colors.main, fontSize: 14 }}>Vazgeç</Text>
                <Icon style={{ color: colors.main }} type="FontAwesome" name={'twitter'} fontSize={40} />
                <Icon style={{ color: colors.main }} type="FontAwesome" name={'ellipsis-h'} fontSize={25} />
            </View>
            <View style={{ flex: 9, alignItems: 'center', justifyContent: 'space-around' }}>

                <Input placeholder='Name' value={firstName} onChangeText={(value) => setFirstName(value)} style={{ marginBottom: 10, width: '85%', }} />
                <Input placeholder='Username' value={lastName} onChangeText={(value) => setLastName(value)} style={{ marginBottom: 10, width: '85%', }} />
                <Input placeholder='e-mail' value={email} onChangeText={(value) => setEmail(value)} style={{ marginBottom: 10, width: '85%', }} />
                <Input placeholder='password' value={password} onChangeText={(value) => setPassword(value)} secureTextEntry style={{ marginBottom: 10, width: '85%', }} />
                <Button text="Sign Up" loading={props.loading} style={{ marginBottom: 10, width: '85%', padding: 10, }} onPress={RegisterClick} />



            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>By signing up, you agree to our</Text>
                <Text style={{ marginBottom: 30 }}>Terms and Privacy Policy.</Text>

            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'red' }}>
                <View style={[styles.line, { width: '100%' }]} />
                <Text style={styles.mainText}>
                    Have an account?
                    <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                        <Text style={styles.blueText}>  Log in</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = {
    mainText: { color: 'gray' },
    blueText: { color: '#4495cb', fontWeight: 'bold' },
    logo: { width: 200, height: 100, marginBottom: 10, },
    facebook: { width: 20, height: 20 },
    line: { width: '35%', height: 0.5, backgroundColor: 'gray' }

}
const mapStateToProps = ({ authResponse }) => {
    const { loading, user } = authResponse;
    return { loading, user };
}
export default connect(mapStateToProps, { register })(Register);