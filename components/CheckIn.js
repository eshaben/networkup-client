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

  componentWillUpdate(){
    AsyncStorage.getItem('event_id').then((data) => {
      this.setState({event_id: data})
    })
  }

  componentDidMount(){
    AsyncStorage.getItem('event_id').then((data) => {
      this.setState({event_id: data})
    })
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  checkIn() {
    AsyncStorage.getItem('id_token').then((token) => {
      let decodedToken = jwt_decode(token)
      let id = decodedToken.id
      fetch('https://boiling-mesa-67164.herokuapp.com/events', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
         },
        body: JSON.stringify({
          checked_in: true,
          checked_out: false,
          account_id: id,
          goals: []
        })
      })
      .then((response) => response.text())
      .then((data) => {
        Alert.alert('You have been checked in successfully!')
        data = JSON.parse(data);
        this.saveItem('event_id', JSON.stringify(data.id))
        this.setState({event_id: data.id})
      })
      .done();
    })
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
          <View style={{marginBottom: 60}}>
            <Image
             source={require('../assets/logo.png')}
             style={{width: 350, height:70}}
            />
            <Text style={{textAlign: 'center', fontSize: 16}}> Level up your networking skills </Text>
          </View>
          <View style={{alignItems: 'center', marginBottom: 120}}>
            <Text style={styles.subtitle}> Are you ready to check into an event? </Text>
          <TouchableOpacity style={styles.buttonWrapper} onPress={this.checkIn.bind(this)}>
            <Text style={styles.buttonText}> Check In </Text>
          </TouchableOpacity>
          </View>

        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={{marginBottom: 60}}>
            <Image
            source={require('../assets/logo.png')}
            style={{width: 350, height:70}}
            />
          </View>
          <View style={{marginBottom: 120}}>
            <Text style={styles.subtitle}>Event Mode</Text>
            <Text style={[styles.text, styles.form]}>You are currently checked into an event.
            If you have not already set your goals, swipe left to do so!</Text>
          </View>
        </View>
      )
    }
  }
}
