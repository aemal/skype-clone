import {combineReducers} from 'redux';
import contactListReducers from './contactListReducers';
import contactListFilterReducer from './contactListFilterReducer';
import setCurrentFriendReducer from './setCurrentFriendReducer';
import { routerReducer } from 'react-router-redux'

export default combineReducers({
	contactListReducers,
	setCurrentFriendReducer,
	contactListFilterReducer,
	router: routerReducer
}) 