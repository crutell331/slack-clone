import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import firebase from 'firebase'
import { setUser, clearUser } from '../redux/actions/index'
import '../App.css';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import ChatApp from './ChatApp';

class App extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user)
        this.props.setUser(user)
        this.props.history.push('/')
      } else {
        this.props.clearUser()
        this.props.history.push('/login')
      }
    })
  }
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path="/" component={ChatApp} />
      </Switch>
    );

  }
}


export default connect(null, { setUser, clearUser })(withRouter(App));
