import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import firebase from 'firebase'
import { setUser } from '../redux/actions/index'
import '../App.css';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

class App extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user)
        this.props.setUser(user)
        this.props.history.push('/')
      }
    })
  }
  render() {
    return (

      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      </Switch>
    );

  }
}


export default connect(null, { setUser })(withRouter(App));
