import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';

const store = createStore(reducer);

const MainComponent = () => (

  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);


ReactDOM.render(
<Provider store={store}>
	<MainComponent />
</Provider>
	, document.getElementById('root'));
registerServiceWorker();
