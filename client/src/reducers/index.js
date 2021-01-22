import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import assignmentReducer from './assignmentReducer';


export default combineReducers({
    item: itemReducer,
    assignment: assignmentReducer,
    error: errorReducer,
    auth: authReducer

});