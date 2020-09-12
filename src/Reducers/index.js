import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import ListReducers from './ListReducers';
import TweetReducers from './TweetReducers';
import MessagesReducers from './MessagesReducers';

export default combineReducers({
    authResponse: AuthReducers,
    charactersResponse: ListReducers,
    tweetResponse: TweetReducers,
    messageResponse: MessagesReducers,
});