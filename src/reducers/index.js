import authReducer from './authReducer';
import chatUserReducer from './chatUserReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    authReducer,
    chatUserReducer
});

export default rootReducer;
