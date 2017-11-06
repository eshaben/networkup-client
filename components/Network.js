import React, { Component } from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button} from 'native-base'
import styles from '../routes/styles';
import jwt_decode from 'jwt-decode';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'



export default class CheckIn extends Component {

  constructor() {
    super();
    this.state = {
      event_id: null,
      goals: [],
      one_completed: false,
      two_completed: false,
      three_completed: false,
      one_description: null,
      two_description: null,
      three_description: null
    };
  }

  componentDidMount(){
    AsyncStorage.getItem('event_id').then((data) => {
      this.setState({event_id: data})
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
        if (eventGoals.length > 0){
          this.setState({goals: eventGoals})
          this.setState({one_completed: data[0].goals[0].one_completed})
          this.setState({two_completed: eventGoals[0].two_completed})
          this.setState({three_completed: eventGoals[0].three_completed})
          this.setState({one_description: eventGoals[0].one_description})
          this.setState({two_description: eventGoals[0].two_description})
          this.setState({three_description: eventGoals[0].three_description})
        }
      })
      .done();
    })
  }

  componentWillMount(){
    this.getGoalsData()
  }

  getEventId(){
    AsyncStorage.getItem('event_id').then((data) => {
      this.setState({event_id: data})
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
          if (eventGoals.length > 0){
            this.setState({goals: eventGoals})
            this.setState({one_completed: data[0].goals[0].one_completed})
            this.setState({two_completed: eventGoals[0].two_completed})
            this.setState({three_completed: eventGoals[0].three_completed})
            this.setState({one_description: eventGoals[0].one_description})
            this.setState({two_description: eventGoals[0].two_description})
            this.setState({three_description: eventGoals[0].three_description})
          }
        })
        .done();
      })
    }
  }

  confirmGoalOne(){
    this.setState({one_completed: true})
    Alert.alert('Way to go!')
  }

  confirmGoalTwo(){
    this.setState({two_completed: true})
    Alert.alert('Awesome!')
  }

  confirmGoalThree(){
    this.setState({three_completed: true})
    Alert.alert('Killing it!')
  }

  sendGoalCompletion(){
    AsyncStorage.getItem('id_token').then((token) => {
      fetch('https://boiling-mesa-67164.herokuapp.com/events/goals/' + this.state.event_id, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          one_description: this.state.one_description,
          one_completed: this.state.one_completed,
          two_description: this.state.two_description,
          two_completed: this.state.two_completed,
          three_description: this.state.three_description,
          three_completed: this.state.three_completed
        })
      })
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(data)
        Alert.alert('Goal completions saved!')
      })
      .done();
    })
  }

  render(){
    var completedOne = ''
    var completedTwo = ''
    var completedThree = ''

    if (this.state.one_completed === true){
      completedOne = 'Completed'
    } else {
      completedOne = 'Mark As Complete'
    }
    if (this.state.two_completed){
      completedTwo = 'Completed'
    } else {
      completedTwo = 'Mark As Complete'
    }
    if (this.state.three_completed){
      completedThree = 'Completed'
    } else {
      completedThree = 'Mark As Complete'
    }

    if(this.state.event_id === null){
      return (
        <View style={styles.container}>
          <Text style={[styles.subtitle, styles.form]}>You have not checked in yet. To enter event mode, please check in first!</Text>
        </View>
      )
    } else {
      if (this.state.goals.length === 0){
        return (
          <View style={styles.container}>
            <Text style={[styles.subtitle, styles.form]}>Event Mode</Text>
            <Text style={[styles.text, styles.form]}>You have not yet entered any goals for this event. Swipe right to set your goals for the event!</Text>
          </View>
        )
      } else {
        return (
          <View style={styles.container}>
            <Text style={styles.subtitle}>Event Mode</Text>
            <Text style={[styles.text, styles.form]}>You have successfully checked in
            and set your goals for the event! You got this! Once you accomplish a goal mark it as complete. </Text>

            <View style={inlineStyles.footerWrapper}>
              <Text style={styles.text}>1.</Text>
              <Text style={styles.text}> {this.state.one_description} </Text>
              </View>
            <View style = {inlineStyles.buttonWrapper}>
            <Button iconLeft bordered success onPress={this.confirmGoalOne.bind(this)}>
              <MaterialIcons style={{fontSize: 18}} name="check" />
              <Text >{completedOne} </Text>
            </Button>
            </View>

            <View style={inlineStyles.footerWrapper}>
              <Text style={styles.text}>2.</Text>
              <Text style={styles.text}> {this.state.two_description} </Text>
            </View>
            <View style = {inlineStyles.buttonWrapper}>
              <Button iconLeft bordered success onPress={this.confirmGoalTwo.bind(this)} >
                <MaterialIcons style={{fontSize: 18}} name="check" />
                <Text>{completedTwo} </Text>
              </Button>
            </View>

            <View style={inlineStyles.footerWrapper}>
              <Text style={styles.text}>3.</Text>
              <Text style={styles.text}> {this.state.three_description} </Text>
            </View>
            <View style={inlineStyles.footerWrapper}>
              <Button iconLeft bordered success onPress={this.confirmGoalThree.bind(this)} >
                <MaterialIcons style={{fontSize: 18}} name="check" />
                <Text>{completedThree} </Text>
              </Button>
            </View>

            <View style={inlineStyles.seperator}>
            <TouchableOpacity style={styles.buttonWrapper} onPress={this.sendGoalCompletion.bind(this)}>
              <Text style={styles.buttonText}> Done </Text>
            </TouchableOpacity>
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
  },
  buttonWrapper: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextSmall: {
    fontSize: 14,
    textAlign: 'center',
    margin: 5
  },
  buttonWrapperSmall: {
    backgroundColor:'#D3D3D3',
    marginBottom: 10,
    width: 200
  },
  seperator: {
    marginTop: 15
  }
})
