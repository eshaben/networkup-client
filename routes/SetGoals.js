import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import jwt_decode from 'jwt-decode';

class SetGoals extends Component {

  constructor() {
    super();
    this.state = { goalOne: null, goalTwo: null, goalThree: null };
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  setGoals() {
    AsyncStorage.getItem('id_token').then((token) => {
      let decodedToken = jwt_decode(token)
      let id = decodedToken.id
      console.log(id);
      fetch('https://boiling-mesa-67164.herokuapp.com/', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
         },
        body: JSON.stringify({
          checked_in: true,
          checked_out: false,
          account_id: id,
          goals: [{
            one_description: this.state.goalOne,
            one_completed: false,
            two_description: this.state.goalTwo,
            two_completed: false,
            three_description: this.state.goalThree,
            three_completed: false
          }]
        })
      })
      .then((response) => response.text())
      .then((data) => {
        Alert.alert('Goals Saved!')
        data = JSON.parse(data);
        this.saveItem('event_id', JSON.stringify(data.id))
        Actions.HomePage();
      })
      .done();
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> What would you like to accomplish? </Text>
        <Text style={styles.subtitle}> Goal One: </Text>
        <View style={styles.form}>
          <TextInput
            editable={true}
            onChangeText={(goalOne) => this.setState({goalOne})}
            placeholder='goal one'
            ref='goalOne'
            returnKeyType='next'
            style={styles.inputText}
            value={this.state.goalOne}
          />
          <Text style={styles.subtitle}> Goal Two: </Text>

          <TextInput
            editable={true}
            onChangeText={(goalTwo) => this.setState({goalTwo})}
            placeholder='goal two'
            ref='goalTwo'
            returnKeyType='next'
            style={styles.inputText}
            value={this.state.goalTwo}
          />
          <Text style={styles.subtitle}> Goal Three: </Text>

          <TextInput
            editable={true}
            onChangeText={(goalThree) => this.setState({goalThree})}
            placeholder='goal three'
            ref='goalThree'
            returnKeyType='next'
            style={styles.inputText}
            value={this.state.goalThree}
          />

          <TouchableOpacity style={styles.buttonWrapper} onPress={this.setGoals.bind(this)}>
            <Text style={styles.buttonText}> Submit </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonWrapper} onPress={Actions.HomePage}>
            <Text style={styles.buttonText}> Go Back </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SetGoals;
