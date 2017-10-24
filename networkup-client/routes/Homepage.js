import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

class HomePage extends Component {

  checkIn() {
    AsyncStorage.getItem('id_token').then((token) => {
      fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => response.text())
      .then((quote) => {
        Alert.alert('Chuck Norris Quote', quote)
      })
      .done();
    })
  }

  getChallenges() {
    AsyncStorage.getItem('id_token').then((token) => {
      fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => response.text())
      .then((quote) => {
        Alert.alert('Chuck Norris Quote', quote)
      })
      .done();
    })
  }

  getMyEvents() {
    AsyncStorage.getItem('id_token').then((token) => {
      fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => response.text())
      .then((quote) => {
        Alert.alert('Chuck Norris Quote', quote)
      })
      .done();
    })
  }

  getMyStats() {
    AsyncStorage.getItem('id_token').then((token) => {
      fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => response.text())
      .then((quote) => {
        Alert.alert('Chuck Norris Quote', quote)
      })
      .done();
    })
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      Alert.alert('Logout Success!');
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonWrapper} onPress={this.checkIn}>
          <Text style={styles.buttonText}> Check In </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper} onPress={this.getChallenges}>
          <Text style={styles.buttonText}> Challenges </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper} onPress={this.getMyEvents}>
          <Text style={styles.buttonText}> My Events </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper} onPress={this.getMyStats}>
          <Text style={styles.buttonText}> My Stats </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogout}>
          <Text style={styles.buttonText} > Log out </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomePage;
