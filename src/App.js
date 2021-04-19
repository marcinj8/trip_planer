import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
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
import { NewTrip, TripList, TripLoader } from './trip/pages';

function App() {

  const queryClient = new QueryClient();

  const [token, setToken] = useState('login autostart');
  const [userId, setUserId] = useState('id użytkownika - string');
  const [currentTripId, setCurrentTripId] = useState('id wycieczki - string - generowany');

  const login = () => {
    setToken('token');
    setUserId('id użytkownika - string');
    setCurrentTripId('id wycieczki - string - generowany');
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setCurrentTripId(null);
  };

  const authContextInitialValue = {
    isLoggedIn: !!token,
    token,
    userId,
    login,
    logout,
    currentTripId // do przeniesienia - userDataContext?
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
          <Route path='/trips/new'>
            <NewTrip />
          </Route>
          <Route path='/:userId/trips/:tripId'>
            <TripLoader />
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
        <QueryClientProvider client={queryClient} >
          <Router>
            <Navigation />
            {routes}
          </Router>
        </QueryClientProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
