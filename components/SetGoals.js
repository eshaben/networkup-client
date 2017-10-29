import React, { Component } from 'react';
import {Alert, Image, Text, TextInput, TouchableOpacity, View, AsyncStorage, StyleSheet, Container} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from '../routes/styles';

export default class SetGoals extends Component {

  constructor() {
    super();
    this.state = { goalOne: null, goalTwo: null, goalThree: null, event_id: null };
  }

  componentDidMount(){
    this.getEventId()
  }

  getEventId(){
    AsyncStorage.getItem('event_id').then((data) => {
      this.setState({event_id: data})
    })
  }

  setGoals() {
    AsyncStorage.getItem('id_token').then((token) => {
      let decodedToken = jwt_decode(token)
      let id = decodedToken.id
      console.log(id);
      fetch('http://localhost:3000/events', {
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

  render(){
    if(this.state.event_id === null){
      return (
        <View style={styles.container}>
        <Text style={styles.subtitle, styles.form}>You have not checked in yet. To set goals for an event, please check in first!</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.subtitle}> Event Mode </Text>
          <Text style={styles.text}> Enter 3 goals to accomplish at this event </Text>
          <View style={styles.form}>
            <View style={inlineStyles.footerWrapper}>
              <Text style={styles.text}>1.</Text>
              <TextInput
                editable={true}
                onChangeText={(goalOne) => this.setState({goalOne})}
                placeholder='Stay for the entire event'
                ref='goalOne'
                returnKeyType='next'
                style={styles.inputText}
                value={this.state.goalOne}
              />
            </View>

            <View style={inlineStyles.footerWrapper}>
              <Text style={styles.text}>2.</Text>
              <TextInput
                editable={true}
                onChangeText={(goalTwo) => this.setState({goalTwo})}
                placeholder='Meet five people'
                ref='goalTwo'
                returnKeyType='next'
                style={styles.inputText}
                value={this.state.goalTwo}
              />
            </View>

            <View style={inlineStyles.footerWrapper}>
              <Text style={styles.text}>3.</Text>
              <TextInput
                editable={true}
                onChangeText={(goalThree) => this.setState({goalThree})}
                placeholder='Get two business cards'
                ref='goalThree'
                returnKeyType='next'
                style={styles.inputText}
                value={this.state.goalThree}
              />
            </View>

            <TouchableOpacity style={styles.buttonWrapper} onPress={this.setGoals.bind(this)}>
              <Text style={styles.buttonText}> Submit </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

const inlineStyles = StyleSheet.create({
  footerWrapper: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row'
  }
})
