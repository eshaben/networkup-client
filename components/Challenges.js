import React, {Component} from 'react';
import {Alert, TouchableHighlight, Image, Container, Text, TouchableOpacity, View, AsyncStorage, ListView, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from '../routes/styles';
import { Thumbnail } from 'native-base';
import jwt_decode from 'jwt-decode';

class Challenges extends Component {

  constructor() {
    super();
    this.state = {
      data: [],
      userData: null,
    };
  }

  componentDidMount(){
    this.getChallenges()
    this.getUsersChallenges()
  }

  getChallenges() {
    AsyncStorage.getItem('id_token').then((token) => {
      fetch('http://localhost:3000/challenges', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(data)
        this.setState({data: data})
      })
      .done();
    })
  }

  getUsersChallenges() {
    AsyncStorage.getItem('id_token').then((token) => {
      let decodedToken = jwt_decode(token)
      let id = decodedToken.id
      fetch('http://localhost:3000/account_challenges/' + id, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(data)
        this.setState({userData: data})
      })
      .done();
    })
  }

  getChallengesById(id) {
    AsyncStorage.getItem('id_token').then((token) => {
      fetch('http://localhost:3000/challenges/' + id, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(data)
        let description = data[0].description
        let points = data[0].points
        Alert.alert(description + ' Points: ' + points)
      })
      .done();
    })
  }

  abcd(id) {
    Alert.alert("yoooo")
    console.log(id);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}> Challenges </Text>
        <View style={styles.form}>
         {this.state.data.map((list, l) =>{
           return (
             <View key={l}>
              <TouchableOpacity onPress={ ()=> this.getChallengesById(list.id)}>
                  <View>
                    <Thumbnail medium source={require('../assets/lock.png')}/>
                  </View>
                </TouchableOpacity>
              </View>
           )
         })}
         </View>
      </View>
    );
  }
}

export default Challenges;
