import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Text, View, ActivityIndicator, AsyncStorage } from 'react-native';

import Authentication from './routes/Authentication.js'
import HomePage from './routes/Homepage.js'
import CheckIn from './routes/CheckIn.js'

class App extends Component {
  constructor(){
    super();
    this.state = {
      hasToken: false,
      isLoaded: false
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({
        hasToken: token !== null,
        isLoaded: true
      })
    })
  }

  render() {
    if(!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else {
      return (
        <Router>
          <Scene key='root'>
            <Scene
              component= {Authentication}
              hideNavBar= {true}
              initial= {!this.state.hasToken}
              key= 'Authentication'
              title='Authentication'
            />
            <Scene
              component= {HomePage}
              initial= {this.state.hasToken}
              hideNavBar = {true}
              key='HomePage'
              title='Home Page'
            />
            <Scene
              component= {CheckIn}
              key="CheckIn"
              title="Check In"
            />
          </Scene>
        </Router>
      );
    }
  }
}

module.exports = App;
