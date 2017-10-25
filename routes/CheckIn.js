import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import jwt_decode from 'jwt-decode';

class CheckIn extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Are you ready to check into an event? </Text>
        <TouchableOpacity style={styles.buttonWrapper} onPress={Actions.SetGoals}>
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
