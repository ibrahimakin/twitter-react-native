import {
    GET_MESSAGE_START, GET_MESSAGE_SUCCESS, GET_MESSAGE_FAILED,
    ADD_MESSAGE_START, ADD_MESSAGE_SUCCESS, ADD_MESSAGE_FAILED,
    GET_ROOM_START, GET_ROOM_SUCCESS, GET_ROOM_FAILED,
    ADD_ROOM_START, ADD_ROOM_SUCCESS, ADD_ROOM_FAILED,
    GET_ALLUSERS_START, GET_ALLUSERS_SUCCESS, GET_ALLUSERS_FAILED
} from './types';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as RootNavigation from '../RootNavigation.js';


export const getMessages = (path) => {
    return (dispatch) => {

        dispatch({ type: GET_MESSAGE_START });
        firestore().collection('Messages').doc(path).collection('items').orderBy('createdDate', 'desc').onSnapshot(message => {
            //console.log('tweet data: ', room);
            let data = [];
            message.forEach((doc) => {
                data.push(doc.data());
            });
            //console.log('data: ', data);
            dispatch({ type: GET_MESSAGE_SUCCESS, payload: data });

        });

    }
}

export const startRoom = (path, params) => {
    return (dispatch) => {

        dispatch({ type: ADD_ROOM_START })
        firestore()
            .collection('Messages').doc(path)
            .set(params)
            .then((data) => {
                //console.log('Tweet added!', data);

                //let messageId = data.id

                dispatch({ type: ADD_ROOM_SUCCESS });


            }).catch(() => {
                //console.log('Tweet not added');
                dispatch({ type: ADD_ROOM_FAILED });
            });

    }
}

export const getRooms = (path, params) => {
    return (dispatch) => {

        dispatch({ type: GET_ROOM_START })
        firestore().collection('Messages').orderBy('createdDate', 'desc').onSnapshot(room => {
            //console.log('tweet data: ', room);
            let data = [];
            room.forEach((doc) => {
                data.push(doc.data())
            });
            //console.log('data: ', data);
            dispatch({ type: GET_ROOM_SUCCESS, payload: data });

        });
    }
}

export const addMessage = (path, params) => {
    return (dispatch) => {

        dispatch({ type: ADD_MESSAGE_START })
        firestore()
            .collection('Messages').doc(path).collection('items')
            .add(params)
            .then((data) => {
                //console.log('Tweet added!', data);

                //let messageId = data.id

                dispatch({ type: ADD_MESSAGE_SUCCESS });


            }).catch(() => {
                //console.log('Tweet not added');
                dispatch({ type: ADD_MESSAGE_FAILED });
            });

    }
}

export const getAllUsers = () => {
    return (dispatch) => {
        dispatch({ type: GET_ALLUSERS_START })
        firestore().collection('Users').get().then((users) => {
            let data = [];
            users.forEach((doc) => {
                data.push(doc.data())
            });

            dispatch({ type: GET_ALLUSERS_SUCCESS, payload: data });
        }).catch(error => {
            dispatch({ type: GET_ALLUSERS_FAILED });
        })

    }
}