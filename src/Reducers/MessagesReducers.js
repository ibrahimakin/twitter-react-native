import {
    GET_MESSAGE_START, GET_MESSAGE_SUCCESS, GET_MESSAGE_FAILED,
    ADD_MESSAGE_START, ADD_MESSAGE_SUCCESS, ADD_MESSAGE_FAILED,
    GET_ROOM_START, GET_ROOM_SUCCESS, GET_ROOM_FAILED,
    ADD_ROOM_START, ADD_ROOM_SUCCESS, ADD_ROOM_FAILED,
    GET_ALLUSERS_START, GET_ALLUSERS_SUCCESS, GET_ALLUSERS_FAILED
} from '../Actions/types';

const INITIAL_STATE = {
    loadingGetRoom: false,
    rooms: [],

    loadingUsers: false,
    allUsers: [],

    loadingMessages: false,
    messages: []
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ROOM_START:
            return {
                ...state, loadingGetRoom: true
            };
        case GET_ROOM_SUCCESS:
            return {
                ...state, loadingGetRoom: false, rooms: action.payload
            };
        case GET_ROOM_FAILED:
            return {
                ...state, loadingGetRoom: false
            };


        case GET_ALLUSERS_START:
            return {
                ...state, loadingUsers: true
            };
        case GET_ALLUSERS_SUCCESS:
            return {
                ...state, loadingUsers: false, allUsers: action.payload
            };
        case GET_ALLUSERS_FAILED:
            return {
                ...state, loadingUsers: false
            };

        case GET_MESSAGE_START:
            return {
                ...state, loadingMessages: true
            };
        case GET_MESSAGE_SUCCESS:
            return {
                ...state, loadingMessages: false, messages: action.payload
            };
        case GET_MESSAGE_FAILED:
            return {
                ...state, loadingMessages: false
            };
        default:
            return state;
    }
};