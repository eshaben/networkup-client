import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import { Card, ListItem, Button } from 'react-native-elements';
import jwt_decode from 'jwt-decode';


class EventDetails extends Component {

  constructor() {
    super();
    this.state = {
      event_id: null,
      event_details: null,
    };
  }

  getEventId(){
    AsyncStorage.getItem('event_id').then((data) => {
      this.setState({event_id: data})
    })
  }

  getGoals() {
    this.getEventId()
    AsyncStorage.getItem('id_token').then((token) => {
      let decodedToken = jwt_decode(token)
      fetch('https://boiling-mesa-67164.herokuapp.com/events/goals/' + this.state.event_id, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
         }
      })
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(data)
        this.setState({event_details: data})
        Actions.SeeGoals({event_details: data})
      })
      .done();
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Event Mode </Text>
        <Text style={styles.subtitle}> You are currently checked into an event </Text>
        <TouchableOpacity style={styles.buttonWrapper} onPress={this.getGoals.bind(this)}>
          <Text style={styles.buttonText}> Goals </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper} onPress={Actions.Retro}>
          <Text style={styles.buttonText}> Check Out </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper} onPress={Actions.HomePage}>
          <Text style={styles.buttonText}> Go Back </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default EventDetails;
