import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import jwt_decode from 'jwt-decode';

class EventMode extends Component {

  constructor() {
    super();
    this.state = {  };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> What would you like to accomplish? </Text>


          <TouchableOpacity style={styles.buttonWrapper} onPress={Actions.HomePage}>
            <Text style={styles.buttonText}> Go Back </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

export default EventMode;
