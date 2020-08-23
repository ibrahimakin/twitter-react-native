import { BASE_URL, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED } from './types'
import { post } from './API'
//import auth from '@react-native-firebase/auth';


export const login = (params) => {
    return (dispatch) => {
        /*auth()
            .signInWithEmailAndPassword(params.email, params.password)
            .then((user) => {
                console.log('signed in!', user);
            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');

                } else if (error.code === 'auth/user-not-found') {

                    console.log('That email address is invalid!');
                    Alert.alert('Uyarı', 'Böyle bir kullanıcı bulunamadı!')
                }
                console.log(error.code);

            })*/
        //post(BASE_URL + '/login', params, dispatch, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED);
    }
}

export const register = (params) => {
    return (dispatch) => {
        post(BASE_URL + '/register', params, dispatch, REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED);
    }
}