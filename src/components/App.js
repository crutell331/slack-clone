import React from 'react';
import { Route, Switch } from 'react-router-dom'
import '../App.css';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

function App() {
  return (

    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
    </Switch>
  );
}

export default App;
