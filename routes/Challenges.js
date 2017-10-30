import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import { Card, ListItem, Button, Badge } from 'react-native-elements';
import jwt_decode from 'jwt-decode';
import ChallengeHome from '../components/ChallengeHome.js'

class Challenges extends Component {

  render() {
    return (
      <ChallengeHome />
    );
  }
}

export default Challenges;
