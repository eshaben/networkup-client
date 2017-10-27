import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import { Card, ListItem, Button } from 'react-native-elements';
import jwt_decode from 'jwt-decode';


class EventDetails extends Component {

  constructor(props) {
    super();
    this.state = {
      event_id: props.event_id['_55'].event_id,
      event_details: props.event_details[0],
    };
  }

  confirmGoal(){
    console.log("hi");
  }

  render(props) {

    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}> Goals </Text>
        <View style={styles.form}>
          <Card title = {this.state.event_details.goals[0].one_description}>
            <View style={{flexDirection: 'row'}}>
              <Button
                raised
                onPress={this.confirmGoal}
                title='Completed' />
              <Button
                raised
                title='Skip' />
            </View>
          </Card>
          <Card title = {this.state.event_details.goals[0].two_description}>
            <View style={{flexDirection: 'row'}}>
              <Button
                raised
                onPress={this.confirmGoal}
                title='Completed' />
              <Button
                raised
                title='Skip' />
            </View>
          </Card>
          <Card title = {this.state.event_details.goals[0].three_description}>
            <View style={{flexDirection: 'row'}}>
              <Button
                raised
                onPress={this.confirmGoal}
                title='Completed' />
              <Button
                raised
                title='Skip' />
            </View>
          </Card>
        </View>
        <TouchableOpacity style={styles.buttonWrapper} onPress={Actions.EventDetails}>
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
