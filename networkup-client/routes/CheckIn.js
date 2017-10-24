import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

class CheckIn extends Component {

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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Are you ready to check into an event? </Text>
        <TouchableOpacity style={styles.buttonWrapper} onPress={this.checkIn}>
          <Text style={styles.buttonText}> Check In </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper} onPress={Actions.HomePage}>
          <Text style={styles.buttonText}> Nevermind </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CheckIn;
