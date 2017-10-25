import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import { Card, ListItem, Button } from 'react-native-elements';
import jwt_decode from 'jwt-decode';


class EventMode extends Component {

  constructor() {
    super();
    this.state = {event_id: null };
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
      fetch('http://localhost:3000/events/goals/' + this.state.event_id, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
         }
      })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .done();
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Event Mode </Text>
        <Card title="CARD WITH DIVIDER">
          <View style={styles.user}>
            <Text style={styles.name}>Hi</Text>
          </View>
        </Card>
        <Card title="CARD WITH DIVIDER">
          <View style={styles.user}>
            <Text style={styles.name}>Hi</Text>
          </View>
        </Card>
        <Card title="CARD WITH DIVIDER">
          <View style={styles.user}>
            <Text style={styles.name}>Hi</Text>
          </View>
        </Card>
          <TouchableOpacity style={styles.buttonWrapper} onPress={this.getGoals.bind(this)}>
            <Text style={styles.buttonText}> Go Back </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

export default EventMode;
