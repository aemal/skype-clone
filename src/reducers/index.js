import {combineReducers} from 'redux';
import contactListReducers from './contactListReducers';
import contactListFilterReducer from './contactListFilterReducer';

export default combineReducers({
	contactListReducers,
	contactListFilterReducer
}) 