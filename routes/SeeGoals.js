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
      event_id: props.event_id['_55'].event_id,
      event_details: props.event_details[0],
      goal_one: false,
      goal_two: false,
      goal_three: false
    };
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
      fetch('http://localhost:3000/events/goals/' + this.state.event_id, {
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
    console.log(this.state.goal_one);
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
          <Card title = {this.state.event_details.goals[0].one_description}>
            <Button
              raised
              onPress={this.confirmGoalOne.bind(this)}
              title={completedOne} />
          </Card>
          <Card title = {this.state.event_details.goals[0].two_description}>
              <Button
                raised
                onPress={this.confirmGoalTwo.bind(this)}
                title={completedTwo} />
          </Card>
          <Card title = {this.state.event_details.goals[0].three_description}>
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
