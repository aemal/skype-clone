import {applyMiddleware, createStore} from 'redux';
//import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import reducer from './reducers';
//import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

//const history = createHistory();
//const Routemiddleware = routerMiddleware(history)

const middlewares= applyMiddleware( thunk);


export default createStore(reducer,middlewares);