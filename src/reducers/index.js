import {combineReducers} from 'redux';
import contactListReducers from './contactListReducers';
import contactListFilterReducer from './contactListFilterReducer';
import { routerReducer } from 'react-router-redux'

export default combineReducers({
	contactListReducers,
	contactListFilterReducer,
	router: routerReducer
}) 