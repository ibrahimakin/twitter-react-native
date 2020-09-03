import { BASE_URL, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, SIGNOUT_SUCCESS, REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED, GETUSER_START, GETUSER_SUCCESS, GETUSER_FAILED } from './types'
import { post } from './API'
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import * as RootNavigation from '../RootNavigation.js';


export const login = (params) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_START });
        auth()
            .signInWithEmailAndPassword(params.email, params.password)
            .then((data) => {
                //console.log('User signed in!', data.user);
                const uid = data.user._user.uid;

                //read user from the database
                firestore()
                    .collection('Users')
                    .doc(uid)
                    .get().then((user) => {
                        const userParams = {
                            ...user._data,
                            uid
                        }
                        dispatch({ type: LOGIN_SUCCESS, payload: userParams });
                    }).catch((err) => {
                        dispatch({ type: LOGIN_FAILED });
                    });

            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                else if (error.code === 'auth/user-not-found') {
                    Alert.alert('Alert', 'User not found.');
                }
                dispatch({ type: LOGIN_FAILED });

                console.log(error);
            });
        //post(BASE_URL + '/login', params, dispatch, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED);
    }
}

export const register = (params) => {
    return (dispatch) => {
        auth()
            .createUserWithEmailAndPassword(params.email, params.password)
            .then((data) => {
                const uid = data.user._user.uid;

                //write user to the database
                const setData = {
                    name: params.name,
                    username: params.username,
                    email: params.email,
                }
                firestore()
                    .collection('Users')
                    .doc(uid)
                    .set(setData)
                    .then(() => {
                        //console.log('User added!');
                        RootNavigation.pop();
                    }).catch(() => { });

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    //console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    //console.log('That email address is invalid!');
                }

                //console.error(error);
            });
        //post(BASE_URL + '/register', params, dispatch, REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED);
    }
}

export const isUser = () => {
    return (dispatch) => {
        dispatch({ type: LOGIN_START });
        auth().onAuthStateChanged((data) => {
            if (data) {
                const uid = data._user.uid;
                getUser(uid, dispatch)
            }
            else {
                dispatch({ type: LOGIN_FAILED });
            }
        });
    }
}

export const signOut = () => {
    return (dispatch) => {
        auth()
            .signOut()
            .then(() => {
                dispatch({ type: SIGNOUT_SUCCESS });
            });
    }
}

const getUser = (uid, dispatch) => {
    firestore()
        .collection('Users')
        .doc(uid)
        .get().then((user) => {
            dispatch({ type: LOGIN_SUCCESS, payload: user._data });
        }).catch((err) => {
            dispatch({ type: LOGIN_FAILED });
        });

}