import React, { Component } from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from '../routes/styles';
import jwt_decode from 'jwt-decode';


export default class CheckOut extends Component {

  constructor() {
    super();
    this.state = {
      event_id: null,
      checked_out: false
    };
  }

  componentDidMount(){
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
        if (data[0].checked_out){
          this.setState({checked_out: true})
        } else {
          this.setState({checked_out: false})
        }
      })
      .done();
    })
  }

  getEventId(){
    AsyncStorage.getItem('event_id').then((data) => {
      this.setState({event_id: data})
    })
  }

  checkOut(){
    this.setState({checked_out: true})
    if (this.state.event_id !== null){
      AsyncStorage.getItem('id_token').then((token) => {
        let decodedToken = jwt_decode(token)
        fetch('https://boiling-mesa-67164.herokuapp.com/events/checkout/' + this.state.event_id, {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           },
          body: JSON.stringify({
            checked_out: true
          })
        })
        .then((response) => response.text())
        .then((data) => {
          Alert.alert('You have been checked out successfully!')
        })
        .done();
      })
    }
  }

  render(){
    if(this.state.event_id === null){
      return (
        <View style={styles.container}>
          <Text style={[styles.subtitle, styles.form]}>You have not checked in yet. To enter event mode, please check in first!</Text>
        </View>
      )
    } else {
      if(!this.state.checked_out){
        return (
          <View style={styles.container}>
            <Text style={styles.subtitle}> Are you ready to check out of the event? </Text>
            <TouchableOpacity style={styles.buttonWrapper} onPress={this.checkOut.bind(this)}>
              <Text style={styles.buttonText}> Check Out </Text>
            </TouchableOpacity>
          </View>
        )
      } else {
        return (
          <View style ={styles.container}>
            <Text style={styles.subtitle}> You have successfully been checked out, swipe left to complete the retro! </Text>
          </View>
        )
      }
    }
  }
}
