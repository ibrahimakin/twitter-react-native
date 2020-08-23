import { BASE_URL, LIST_START, LIST_SUCCESS, LIST_FAILED, ADD_ITEM_START, ADD_ITEM_SUCCESS, ADD_ITEM_FAILED, REMOVE_ITEM_START, REMOVE_ITEM_SUCCESS, REMOVE_ITEM_FAILED } from './types'
import { get, post } from './API'

export const getList = (params) => {
    return (dispatch) => {
        get(BASE_URL + '/api/characters', params ? params : {}, dispatch, LIST_START, LIST_SUCCESS, LIST_FAILED);
    }
}

export const postData = (params) => {
    return (dispatch) => {
        post(BASE_URL + '/api/addCharacter', params, dispatch, ADD_ITEM_START, ADD_ITEM_SUCCESS, ADD_ITEM_FAILED);
    }
}

export const removeData = (params) => {
    return (dispatch) => {
        post(BASE_URL + '/api/removeCharacter', params, dispatch, REMOVE_ITEM_START, REMOVE_ITEM_SUCCESS, REMOVE_ITEM_FAILED);
    }
}