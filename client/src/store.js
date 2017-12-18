import {applyMiddleware, createStore} from 'redux';

import thunk from 'redux-thunk';
import reducer from './reducers';

const middlewares= applyMiddleware( thunk);

export default createStore(reducer,middlewares);