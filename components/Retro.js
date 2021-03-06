import React, { Component } from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, ScrollView, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from '../routes/styles';
import jwt_decode from 'jwt-decode';


export default class CheckOut extends Component {

  constructor() {
    super();
    this.state = {
      converations: null,
      meaningful_conversations: null,
      received_help: null,
      provided_help: null,
      one_gain: null,
      cards_received: null,
      cards_given: null,
      connector_connections: null,
      rating: null,
      event_id: null,
      checked_out: false
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
          this.setState({checked_out: data[0].checked_out})
        })
        .done();
      })
  }

  getEventId(){
    AsyncStorage.getItem('event_id').then((data) => {
      this.setState({event_id: data})
    })
  }

  getCheckedOutDetails(){
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
          this.setState({checked_out: data[0].checked_out})
        })
        .done();
      })
    }
  }

  saveRetro() {
    if (this.state.event_id !== null){
      console.log("before the fetch");
      AsyncStorage.getItem('id_token').then((token) => {
        console.log(token);
        let decodedToken = jwt_decode(token)
        fetch('https://boiling-mesa-67164.herokuapp.com/events/retros/' + this.state.event_id, {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           },
          body: JSON.stringify({
            conversations: this.state.conversations,
            meaningful_conversations: this.state.meaningful_conversations,
            received_help: this.state.received_help,
            provided_help: this.state.provided_help,
            one_gain: this.state.one_gain,
            cards_received: this.state.cards_received,
            cards_given: this.state.cards_given,
            connector_connections: this.state.connector_connections,
            rating: this.state.rating,
          })
        })
        .then((response) => response.text())
        .then((data) => {
          console.log("after the fetch");
          Alert.alert('Retro Saved!')
          data = JSON.parse(data);
          AsyncStorage.getItem('event_id').then((data) => {
            this.setState({event_id: data})
            console.log(data);
          })
          this.removeItem('event_id')
          AsyncStorage.getItem('event_id').then((data) => {
            console.log(data);
          })
          Actions.HomePage()
        })
        .done(Actions.HomePage());
      })
    }
  }

  async removeItem(item) {
    try {
      await AsyncStorage.removeItem(item);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }


  render(){
    if(this.state.event_id === null){
      return (
        <View style={styles.container}>
          <Text style={[styles.subtitle, styles.form]}>You have not checked in yet. To enter event mode, please check in first!</Text>
        </View>
      )
    } else {
      if (this.state.checked_out){
        return (
          <ScrollView contentContainerStyle= {styles.contentContainer}>
          <View style={styles.container}>
            <Text style={styles.subtitle}> Retro</Text>
            <View style={styles.form}>
              <Text style={styles.text}>Number of conversations, roughly: </Text>
              <TextInput
                editable={true}
                onChangeText={(conversations) => this.setState({conversations})}
                placeholder='e.g. 2'
                ref='conversations'
                returnKeyType='next'
                keyboardType='numeric'
                style={styles.inputText}
                value={this.state.conversations}
              />
              <Text style={styles.text}> Of which, how many were meaningful? </Text>
              <TextInput
                editable={true}
                onChangeText={(meaningful_conversations) => this.setState({meaningful_conversations})}
                placeholder='e.g. 1'
                ref='meaningful_conversations'
                returnKeyType='next'
                keyboardType='numeric'
                style={styles.inputText}
                value={this.state.meaningful_conversations}
              />
              <Text style={styles.text}> Did you receive any help? </Text>
              <TextInput
                editable={true}
                onChangeText={(received_help) => this.setState({received_help})}
                placeholder='e.g Yes'
                ref='received_help'
                returnKeyType='next'
                style={styles.inputText}
                value={this.state.received_help}
              />
              <Text style={styles.text}> Did you provide help to anyone? </Text>
              <TextInput
                editable={true}
                onChangeText={(provided_help) => this.setState({provided_help})}
                placeholder='e.g No'
                ref='provided_help'
                returnKeyType='next'
                style={styles.inputText}
                value={this.state.provided_help}
              />
              <Text style={styles.text}> One gain from this event: </Text>
              <TextInput
                editable={true}
                onChangeText={(one_gain) => this.setState({one_gain})}
                placeholder='e.g Insight on branding'
                ref='one_gain'
                returnKeyType='next'
                style={styles.inputText}
                value={this.state.one_gain}
              />
              <Text style={styles.text}> Number of business cards received: </Text>
              <TextInput
                editable={true}
                onChangeText={(cards_received) => this.setState({cards_received})}
                placeholder='e.g 5'
                ref='cards_received'
                keyboardType='numeric'
                returnKeyType='next'
                style={styles.inputText}
                value={this.state.cards_received}
              />
              <Text style={styles.text}> Number of business cards given out: </Text>
              <TextInput
                editable={true}
                onChangeText={(cards_given) => this.setState({cards_given})}
                placeholder='e.g 2'
                ref='cards_given'
                keyboardType='numeric'
                returnKeyType='next'
                style={styles.inputText}
                value={this.state.cards_given}
              />
              <Text style={styles.text}> Did you introduce any of your connections to one another, how many? </Text>
              <TextInput
                editable={true}
                onChangeText={(connector_connections) => this.setState({connector_connections})}
                placeholder='e.g 0'
                ref='connector_connections'
                returnKeyType='next'
                style={styles.inputText}
                value={this.state.connector_connections}
              />
              <Text style={styles.text}> Scale of 1-10: overall rating of the event: </Text>
              <TextInput
                editable={true}
                onChangeText={(rating) => this.setState({rating})}
                placeholder='e.g 7'
                ref='rating'
                keyboardType='numeric'
                returnKeyType='next'
                style={styles.inputText}
                value={this.state.rating}
              />

              <TouchableOpacity style={styles.buttonWrapper} onPress={this.saveRetro.bind(this)} >
                <Text style={styles.buttonText}> Submit </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonWrapper} onPress={Actions.HomePage}>
                <Text style={styles.buttonText}> Go Back </Text>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        );
      } else {
        return (
          <View style={styles.container}>
            <Text style={[styles.subtitle, styles.form]}>You have not checked out yet. To submit a retro please check out of the event first!</Text>
          </View>
        )
      }
    }
  }
}
