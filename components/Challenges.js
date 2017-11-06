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
      challenges: []
    };
  }

  componentDidMount(){
    this.getChallenges()
    this.getUsersChallenges()
  }

  getChallenges() {
    AsyncStorage.getItem('id_token').then((token) => {
      fetch('https://boiling-mesa-67164.herokuapp.com/challenges', {
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
    let completedChallenges = []
    AsyncStorage.getItem('id_token').then((token) => {
      let decodedToken = jwt_decode(token)
      let id = decodedToken.id
      fetch('https://boiling-mesa-67164.herokuapp.com/account_challenges/' + id, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(data)
        for(var i=0; i<data.length; i++){
          completedChallenges.push(data[i].id)
        }
        console.log(completedChallenges);
        this.setState({challenges: completedChallenges})
      })
      .done();
    })
  }

  getChallengesById(id) {
    AsyncStorage.getItem('id_token').then((token) => {
      fetch('https://boiling-mesa-67164.herokuapp.com/challenges/' + id, {
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

  lockOrTrophy(list){
    let challengesState = this.state.challenges
    for(var i=0; i<challengesState.length; i++){
      if (list.id === challengesState[i]){
        return require('../assets/star_trophy.png')
      } else {
        return require('../assets/lock.png')
      }
    }
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
                    <Thumbnail medium source={this.lockOrTrophy(list)}/>
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
