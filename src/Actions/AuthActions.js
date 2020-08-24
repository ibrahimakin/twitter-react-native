import { BASE_URL, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED } from './types'
import { post } from './API'
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import * as RootNavigation from '../RootNavigation.js';


export const login = (params) => {
    return (dispatch) => {
        auth()
            .signInWithEmailAndPassword(params.email, params.password)
            .then((user) => {
                console.log('User account created & signed in!', user);
            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                else if (error.code === 'auth/user-not-found') {
                    Alert.alert('Alert', 'User not found.');
                }

                console.log(error);
            });
        //post(BASE_URL + '/login', params, dispatch, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED);
    }
}

export const register = (params) => {
    return (dispatch) => {
        auth()
            .createUserWithEmailAndPassword(params.email, params.password)
            .then((user) => {
                console.log('User account created & signed in!', user);
                RootNavigation.pop();
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
        //post(BASE_URL + '/register', params, dispatch, REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED);
    }
}