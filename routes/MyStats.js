import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import { Card, ListItem, Button, Badge } from 'react-native-elements';
import jwt_decode from 'jwt-decode';
import MyStatsHome from '../components/MyStatsHome.js'

class MyStats extends Component {

  render() {
    return (
      <MyStatsHome />
    );
  }
}

export default MyStats;
