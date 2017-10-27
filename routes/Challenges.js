import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import { Card, ListItem, Button, Badge } from 'react-native-elements';
import jwt_decode from 'jwt-decode';

class Challenges extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      data: [],
    };
  }

  componentDidMount(){
    this.getChallenges()
  }

  getChallenges() {
    AsyncStorage.getItem('id_token').then((token) => {
      fetch('http://localhost:3000/challenges', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => response.text())
      .then((data) => {
        let datas = JSON.parse(data)
        this.setState({data: datas})
      })
      .done();
    })
  }


  render() {
    this.getChallenges()
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Challenges </Text>
        <View style={styles.form}>
         {this.state.data.map(function(list, l){
           return (
             <Card key={l}>
               <Text style={styles.text}>
                {list.description}
               </Text>
               <Badge
                value={list.points + ' points'}
                textStyle={{ color: 'orange' }}
              />
             </Card>
           )
         })}
         </View>
        <TouchableOpacity style={styles.buttonWrapper} onPress={Actions.HomePage}>
          <Text style={styles.buttonText}> Go Back </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Challenges;
