import axios from 'axios';
import { Alert } from 'react-native';
import * as RootNavigation from '../RootNavigation.js';
import AsyncStorage from '@react-native-community/async-storage';

import { USER, LOCAL_AUTH_ID } from './types'

export const post = (url, params, dispatch, start, succes, failed) => {
    dispatch({ type: start });

    const method = url.split('/').pop();
    axios({
        method: 'post',
        url,//'https://kodluyoruzrn55.herokuapp.com/login',
        data: params,
        headers: {
            authorization: 'Bearer '.concat(USER.token)
        }
    }).then((response) => {
        //console.log(response);
        dispatch({ type: succes, payload: method == 'removeCharacter' ? params.id : response.data });
        if (method == 'login' || method == 'register') {
            RootNavigation.replace('Home');
            USER.token = response.data.token;
            AsyncStorage.setItem(LOCAL_AUTH_ID, USER.token);
        }
        else if (method == 'addCharacter') {
            RootNavigation.pop();
        }
    }).catch((error) => {
        //console.log(error.response.data);
        Alert.alert("Alert", error.response.data.message);
        dispatch({ type: failed });
    });
}

export const get = (url, params, dispatch, start, succes, failed) => {
    dispatch({ type: start });
    //onst method = url.split('/').pop();
    axios({
        method: 'get',
        url,
        //data: params
        headers: {
            authorization: 'Bearer '.concat(USER.token)
        }
    }).then((response) => {
        dispatch({ type: succes, payload: response.data });
    }).catch((error) => {
        Alert.alert("Alert", "Could not connect to the server!");
        dispatch({ type: failed });
    });
}
