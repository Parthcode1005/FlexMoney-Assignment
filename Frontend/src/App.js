import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {BrowserRouter as Router } from "react-router-dom";
import Login from './components/Login';
import Registration from './components/Registration';
import Payment from './components/Payment';
import Confirmation from './components/Confirmation';
import { UserProvider } from './contexts/UserContext';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();

function App() {
  return (
    <UserProvider>
      {/* Use Router from 'react-router-dom' with your custom history */}
      <Router history={browserHistory}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/payment" component={Payment} />
          <Route path="/confirmation" component={Confirmation} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
