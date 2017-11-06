import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import { Card, ListItem, Button, CheckBox } from 'react-native-elements';
import jwt_decode from 'jwt-decode';


class EventDetails extends Component {

  constructor(props) {
    super();
    this.state = {
      event_id: null,
      event_details: null,
      goal_one: false,
      goal_two: false,
      goal_three: false,
      goal_one_desc: '',
      goal_two_desc: '',
      goal_three_desc: ''
    };
  }

  getEventId(){
    AsyncStorage.getItem('event_id').then((data) => {
      this.setState({event_id: data})
    })
  }

  componentDidMount(){
    this.getEventId()
    AsyncStorage.getItem('id_token').then((token) => {
      let decodedToken = jwt_decode(token)
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
        data = JSON.parse(data);
        this.setState({
          goal_one: data[0].goals[0].one_completed,
          goal_two: data[0].goals[0].two_completed,
          goal_three: data[0].goals[0].three_completed,
          goal_one_desc: data[0].goals[0].one_description,
          goal_two_desc: data[0].goals[0].two_description,
          goal_three_desc: data[0].goals[0].three_description
        })
      })
      .done();
    })
  }

  confirmGoalOne(){
    this.setState({goal_one: true})
    Alert.alert('Way to go!')

  }

  confirmGoalTwo(){
    this.setState({goal_two: true})
    Alert.alert('Awesome!')

  }

  confirmGoalThree(){
    this.setState({goal_three: true})
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
          id: this.state.event_id,
          one: this.state.goal_one,
          two: this.state.goal_two,
          three: this.state.goal_three
        })
      })
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(data)
        Actions.EventDetails()
      })
      .done();
    })
  }

  render(props) {
    if(this.state.goal_one){
      completedOne = "Completed"
    } else {
      completedOne = "Mark as Completed"
    }
    if(this.state.goal_two){
      completedTwo = "Completed"
    } else {
      completedTwo = "Mark as Completed"
    }
    if(this.state.goal_three){
      completedThree = "Completed"
    } else {
      completedThree = "Mark as Completed"
    }

    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}> Goals </Text>
        <View style={styles.form}>
          <Card title = {this.state.goal_one_desc}>
            <Button
              raised
              onPress={this.confirmGoalOne.bind(this)}
              title={completedOne} />
          </Card>
          <Card title = {this.state.goal_two_desc}>
              <Button
                raised
                onPress={this.confirmGoalTwo.bind(this)}
                title={completedTwo} />
          </Card>
          <Card title = {this.state.goal_three_desc}>
              <Button
                raised
                onPress={this.confirmGoalThree.bind(this)}
                title={completedThree} />
          </Card>
        </View>
        <TouchableOpacity style={styles.buttonWrapper} onPress={this.sendGoalCompletion.bind(this)}>
          <Text style={styles.buttonText}> Done </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper} onPress={Actions.HomePage}>
          <Text style={styles.buttonText}> Go Back </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default EventDetails;
