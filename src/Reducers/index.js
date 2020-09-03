import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import ListReducers from './ListReducers';
import TweetReducers from './TweetReducers';

export default combineReducers({
    authResponse: AuthReducers,
    charactersResponse: ListReducers,
    tweetResponse: TweetReducers,
});