import { ADD_TWEET_START, ADD_TWEET_SUCCESS, ADD_TWEET_FAILED } from './types'
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import * as RootNavigation from '../RootNavigation.js';

export const addTweet = (params) => {
    return (dispatch) => {

        dispatch({ type: ADD_TWEET_START })
        firestore()
            .collection('Tweets')
            .add(params)
            .then((data) => {
                console.log('Tweet added!', data);
                dispatch({ type: ADD_TWEET_SUCCESS, payload: params });
                RootNavigation.pop();
            }).catch(() => {
                console.log('Tweet not added');
                dispatch({ type: ADD_TWEET_FAILED });
            });

    }
    //post(BASE_URL + '/register', params, dispatch, REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED);
}
