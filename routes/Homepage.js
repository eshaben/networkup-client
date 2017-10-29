import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import Container from 'native-base';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import EventHome from '../components/EventHome.js'

class HomePage extends Component {

  constructor() {
    super();
    this.state = {
      event_id: null,
    };
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('event_id');
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
    try {
      await AsyncStorage.removeItem('id_token');
      Alert.alert('Logout Success!');
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  getEventId(){
    AsyncStorage.getItem('event_id').then((data) => {
      this.setState({event_id: data})
      this.redirect()
    })
  }

  redirect(){
    if (this.state.event_id === null){
      Actions.CheckIn()
    } else {
      Actions.EventDetails()
    }
  }

  render() {
    return (
        <EventHome />
    );
  }
}

export default HomePage;
