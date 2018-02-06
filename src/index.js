import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
//import {createStore} from 'redux';
//import reducer from './reducers';
import ProfileSettings from "./components/ProfileSettings";
import store from "./store";
import { ConnectedRouter } from "react-router-redux";
import SingIn from "./components/SingIn";
import { Route } from "react-router";
import createHistory from "history/createBrowserHistory";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import SingUp from "./components/SingUp";
import WellcomePage from "./components/WellcomePage";
import Favicon from "react-favicon";
import config from "./config/config.js";

const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Favicon url={`${config.BASE_URL}images/favicon/favicon.ico`} />
        <Route exact path="/" component={SingIn} />
        <Route exact path="/auth" component={App} />
        <Route exact path="/auth/profile" component={ProfileSettings} />
        <Route exact path="/singup" history={history} component={SingUp} />
        <Route exact path="/wellcome" component={WellcomePage} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
