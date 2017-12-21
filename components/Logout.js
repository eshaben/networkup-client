import React, { Component } from 'react';
import { Text, View} from 'native-base';
import {TouchableOpacity, AsyncStorage, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from '../routes/styles.js'

export default class Logout extends Component {

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

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Are you sure you want to log out? </Text>
        <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogout.bind(this)}>
          <Text style={styles.buttonText}> Log Out </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper} onPress={Actions.HomePage}>
          <Text style={styles.buttonText}> Nevermind </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
