import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { Navigation } from './shared/components';

import './App.css';
import { AuthContext } from './shared/context';
import { User } from './user';
import { NewTrip, Trip, TripList } from './trip/pages/';

function App() {

  const [token, setToken] = useState('null');
  const [userId, setUserId] = useState('userId');

  const login = () => {
    setToken('token');
    setUserId('userIdOtrzymaneZMongo');
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  const authContextInitialValue = {
    isLoggedIn: !!token,
    token,
    userId,
    login,
    logout
  }

  let routes = (
    token
      ? (
        <Switch>
          <Route path='/user'>
            <User
              userId={userId}
            />
          </Route>
          <Route path='/trips/current'>
            <div>obecna wycieczka</div>
          </Route>
          <Route path='/trips/new'>
            <NewTrip />
          </Route>
          <Route path='/:userId/trips/:tripId'>
            <Trip />
          </Route>
          <Route path='/:userId/shared'>
            <div>udostępnione</div>
          </Route>
          <Route path='/:userId/notification'>
            <div>powiadomienia</div>
          </Route>
          <Route exact path='/:userId/trips'>
            <TripList />
          </Route>
          <Redirect to='/user' />
        </Switch>
      )
      : (
        <Switch>
          <Route exact path='/auth'>
            <div>logowanie</div>
          </Route>
          <Route exact path='/'>
            <div>musisz się zalogować</div>
          </Route>
          <Redirect to='/' />
        </Switch>
      )
  )


  return (
    <div className="App">
      <AuthContext.Provider value={authContextInitialValue}>
          <Router>
            <Navigation />
            {routes}
          </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
