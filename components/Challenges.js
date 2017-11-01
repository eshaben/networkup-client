import React, {Component} from 'react';
import {Alert, Image, Text, StyleSheet, TouchableOpacity, View, AsyncStorage, ScrollView} from 'react-native';
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
      challenge1: false,
      challenge2: false,
      challenge3: false,
      challenge4: false,
      challenge5: false,
      challenge6: false,
      challenge7: false,
      challenge8: false,
      challenge9: false,
      challenge10: false,
      challenge11: false,
      challenge12: false,
      challenge13: false,
      challenge14: false,
      challenge15: false,
      challenge16: false,
      challenge17: false,
      challenge18: false,
      challenge19: false,
      challenge20: false
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
    let challengeIds = []
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
        data.forEach(function(){
          let challenge = data[0].challenge_id
          console.log(challenge);
          challengeIds.push(challenge)
        })
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
        Alert.alert('Challenge: ' + description + '. Points: ' + points)
      })
      .done();
    })
  }

  render() {
    return (
      <ScrollView style={inStyles.background}>
        <View style={styles.container}>
          <Text style={styles.subtitle}> Challenges </Text>
          <View style={inStyles.list}>
           {this.state.data.map((list, l) =>{
             return (
               <View style={inStyles.listItem} key={l}>
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
      </ScrollView>
    );
  }
}

export default Challenges;

var inStyles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
    justifyContent: 'center'
  },
  listItem: {
    margin: 10
  },
  background: {
    backgroundColor: 'white'
  }
})
