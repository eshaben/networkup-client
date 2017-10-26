import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import { Card, ListItem, Button, ButtonGroup } from 'react-native-elements';
import jwt_decode from 'jwt-decode';


class EventDetails extends Component {

  constructor(props) {
    super();
    this.state = {
      event_id: props.event_id['_55'].event_id,
      event_details: props.event_details[0]
    };
  }

  whatButtonIsThis(){
    console.log(selectedIndex);
  }

  render(props) {
    let buttons = ["Completed", "Skip"]
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}> Goals </Text>
        <View style={styles.form}>
          <Card title = {this.state.event_details.goals[0].one_description}>
            <ButtonGroup
              buttons= {buttons}
              onPress={this.whatButtonIsThis}
            />
          </Card>
          <Card title = {this.state.event_details.goals[0].two_description}>
            <ButtonGroup
              buttons= {buttons}
            />
          </Card>
          <Card title = {this.state.event_details.goals[0].three_description}>
            <ButtonGroup
              buttons= {buttons}
            />
          </Card>
        </View>
        <TouchableOpacity style={styles.buttonWrapper} onPress={Actions.HomePage}>
          <Text style={styles.buttonText}> Go Back </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default EventDetails;
