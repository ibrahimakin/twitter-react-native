import { ADD_TWEET_START, ADD_TWEET_SUCCESS, ADD_TWEET_FAILED, GET_TWEET_START, GET_TWEET_SUCCESS, GET_TWEET_FAILD } from './types'
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as RootNavigation from '../RootNavigation.js';


export const getTweets = (params) => {
    return (dispatch) => {

        /*dispatch({ type: GET_TWEET_START })
        firestore()
            .collection('Tweets')
            .get()
            .then((tweets) => {
                console.log('Tweet get!', tweets);

                let data = [];
                tweets.forEach((doc) => {
                    data.push(doc.data);
                })
                console.log('Tweet data!', data);

                dispatch({ type: GET_TWEET_SUCCESS, payload: data });

            }).catch(() => {
                console.log('Tweet not added');
                dispatch({ type: GET_TWEET_FAILD });
            });*/
        firestore().collection('Tweets').orderBy('createdDate', 'desc').onSnapshot(tweets => {
            //console.log('tweet data: ', tweets);
            let data = [];
            tweets.forEach((doc) => {
                data.push(doc.data())
            });
            //console.log('data: ', data);
            dispatch({ type: GET_TWEET_SUCCESS, payload: data });

        });

    }
}

export const addTweet = (params) => {
    return (dispatch) => {

        dispatch({ type: ADD_TWEET_START })
        firestore()
            .collection('Tweets')
            .add(params)
            .then((data) => {
                //console.log('Tweet added!', data);

                let tweetId = data.id

                if (params.tweet.image) {
                    const reference = storage().ref(`/tweets/${tweetId}`);

                    reference.putFile(params.tweet.image).then(() => {
                        //console.log(params.tweet.image);
                        reference.getDownloadURL().then((imageURL) => {
                            //console.log('asdurllll', imageURL);

                            firestore().collection('Tweets').doc(tweetId).update({ tweet: { image: imageURL, text: params.tweet.text } }).then(() => {
                                dispatch({ type: ADD_TWEET_SUCCESS, payload: params })
                                RootNavigation.pop()
                            })
                        })
                    }).catch(error => {
                        //console.log('Hata Resim Yükleme: ', error);
                    })
                } else {
                    dispatch({ type: ADD_TWEET_SUCCESS, payload: params })
                    RootNavigation.pop()
                }


            }).catch(() => {
                //console.log('Tweet not added');
                dispatch({ type: ADD_TWEET_FAILED });
            });

    }
}
