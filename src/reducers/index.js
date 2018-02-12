import {combineReducers} from 'redux';
import contactListReducers from './contactListReducers';
import contactListFilterReducer from './contactListFilterReducer';
import setCurrentFriendReducer from './setCurrentFriendReducer';
import { routerReducer } from 'react-router-redux'
import changeSettingReducer from './changeSettingReducer'
export default combineReducers({
	contactListReducers,
	setCurrentFriendReducer,
	contactListFilterReducer,
	changeSettingReducer,
	router: routerReducer
}) 