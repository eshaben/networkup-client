import React, { Component } from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from '../routes/styles';
import jwt_decode from 'jwt-decode';


export default class CheckIn extends Component {

  constructor() {
    super();
    this.state = {event_id: null };
  }

  componentDidMount(){
    this.getEventId()
  }

  getEventId(){
    AsyncStorage.getItem('event_id').then((data) => {
      this.setState({event_id: data})
    })
  }


  render(){
    if(this.state.event_id === null){
      return (
        <View style={styles.container}>
          <Text style={styles.subtitle, styles.form}>You have not checked in yet. To set goals for an event, please check in first!</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
        <Text style={styles.subtitle}>Event Mode</Text>
        <Text style={[styles.text, styles.form]}>You are currently checked into an event.
        If you have not already set your goals, swipe left to do so!</Text>
        </View>
      )
    }
  }
}
