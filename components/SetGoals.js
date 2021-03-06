import React, { Component } from 'react';
import {Alert, Image, Text, TextInput, TouchableOpacity, View, AsyncStorage, StyleSheet, Container} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from '../routes/styles';
import jwt_decode from 'jwt-decode';


export default class SetGoals extends Component {

  constructor() {
    super();
    this.state = {
      goalOne: null,
      goalTwo: null,
      goalThree: null,
      event_id: null,
      saved: false,
      goals: []
    };
  }

  componentWillUpdate(){
    AsyncStorage.getItem('event_id').then((data) => {
      if (data !== null || data !== undefined){
        this.setState({event_id: data})
      }
    })
  }

  componentDidMount(){
    AsyncStorage.getItem('event_id').then((data) => {
      if (data !== null || data !== undefined){
        this.setState({event_id: data})
      }
    })
      AsyncStorage.getItem('id_token').then((token) => {
        fetch('https://boiling-mesa-67164.herokuapp.com/events/goals/' + this.state.event_id, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           }
        })
        .then((response) => response.text())
        .then((data) => {
          data = JSON.parse(data)
          let eventGoals = data[0].goals
          this.setState({goals: eventGoals})
        })
        .done();
      })
  }

  getEventId(){
    AsyncStorage.getItem('event_id').then((data) => {
      if (data !== null || data !== undefined){
        this.setState({event_id: data})
      }
    })
  }

  getGoalsData(){
    if (this.state.event_id !== null){
      AsyncStorage.getItem('id_token').then((token) => {
        fetch('https://boiling-mesa-67164.herokuapp.com/events/goals/' + this.state.event_id, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           }
        })
        .then((response) => response.text())
        .then((data) => {
          data = JSON.parse(data)
          let eventGoals = data[0].goals
          this.setState({goals: eventGoals})
        })
        .done();
      })
    }
  }

  setGoals() {
    AsyncStorage.getItem('id_token').then((token) => {
      fetch('https://boiling-mesa-67164.herokuapp.com/events/goals/' + this.state.event_id, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
         },
        body: JSON.stringify({
          one_description: this.state.goalOne,
          one_completed: false,
          two_description: this.state.goalTwo,
          two_completed: false,
          three_description: this.state.goalThree,
          three_completed: false
        })
      })
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(data)
        Alert.alert('Goals Saved!')
        this.setState({saved: true})
        this.getGoalsData()
      })
      .done();
    })
  }

  render(){
    if(this.state.event_id === null){
      return (
        <View style={styles.container}>
        <Text style={[styles.subtitle, styles.form]}>You have not checked in yet. To set goals for an event, please check in first!</Text>
        </View>
      )
    } else {
      if (this.state.goals.length === 0){
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

              <TouchableOpacity style={styles.buttonWrapper} onPress={this.setGoals.bind(this)} >
                <Text style={styles.buttonText}> Submit </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      } else if (this.state.goals.length > 0) {
        return (
          <View style={styles.container}>
            <Text style={styles.subtitle}> Event Mode </Text>
            <View style={inlineStyles.footerWrapper}>
              <Text style={styles.text}>1.</Text>
              <Text style={styles.text}> {this.state.goals[0].one_description} </Text>
            </View>
            <View style={inlineStyles.footerWrapper}>
              <Text style={styles.text}>2.</Text>
              <Text style={styles.text}> {this.state.goals[0].two_description} </Text>
            </View>
            <View style={inlineStyles.footerWrapper}>
              <Text style={styles.text}>3.</Text>
              <Text style={styles.text}> {this.state.goals[0].three_description} </Text>
            </View>
          </View>
        )
      }
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
