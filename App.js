import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Text, View, ActivityIndicator, AsyncStorage } from 'react-native';

import Authentication from './routes/Authentication.js'
import HomePage from './routes/Homepage.js'
import CheckIn from './routes/CheckIn.js'
import SetGoals from './routes/SetGoals.js'
import EventDetails from './routes/EventDetails.js'
import SeeGoals from './routes/SeeGoals.js'
import Retro from './routes/Retro.js'
import Challenges from './routes/Challenges.js'

class App extends Component {
  constructor(){
    super();
    this.state = {
      hasToken: false,
      isLoaded: false,
      event_id: null,
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({
        hasToken: token !== null,
        isLoaded: true
      })
    })
    AsyncStorage.getItem('event_id').then((id) => {
      this.setState({
        event_id: id
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
            <Scene
              component= {SetGoals}
              key="SetGoals"
              title="Set Goals"
            />
            <Scene
              component= {EventDetails}
              key="EventDetails"
              title="Event Details"
            />
            <Scene
              component= {SeeGoals}
              key="SeeGoals"
              title="See Goals"
            />
            <Scene
              component= {Retro}
              key="Retro"
              title="Retro"
            />
            <Scene
              component= {Challenges}
              key="Challenges"
              title="Challenges"
            />
          </Scene>
        </Router>
      );
    }
  }
}

module.exports = App;
