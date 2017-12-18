import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
//import {createStore} from 'redux';
//import reducer from './reducers';
import store from './store';


/*const MainComponent = () => (

  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);*/


ReactDOM.render(
<Provider store={store}>
	 <App />
</Provider>
	, document.getElementById('root'));
registerServiceWorker();
