import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import jwt_decode from 'jwt-decode';

import LogoutHome from '../components/LogoutHome.js'

class LogoutPage extends Component {

  render() {
    return (
      <LogoutHome />
    );
  }
}

export default LogoutPage;
