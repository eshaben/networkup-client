import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import { Card, ListItem, Button, Badge } from 'react-native-elements';
import jwt_decode from 'jwt-decode';

class Challenges extends Component {

  constructor() {
    super();
    this.state = {
      data: [],
      events: null,
      cards_received: null,
      cards_given: null,
      conversations: null,
      meaningful_conversations: null,
      average_rating: null,
      help_received: null,
      help_provided: null,
      connector_connections: null,
      badges: null,
      challenges_completed: null
    };
  }

  componentDidMount(){
    this.getRetros()
  }

  getRetros() {
    var events = 0
    var cards_given = 0
    var cards_received = 0
    var connector_connections = 0
    var conversations = 0
    var meaningful_conversations = 0
    var provided_help = []
    var received_help = []
    var rating = []

    AsyncStorage.getItem('id_token').then((token) => {
      let decodedToken = jwt_decode(token)
      let id = decodedToken.id
      fetch('http://localhost:3000/events/retros/byuser/' + 1, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(data)
        data.forEach(function(event){
          events++
          cards_given += event.retros[0].cards_given
          cards_received += event.retros[0].cards_received
          connector_connections += event.retros[0].connector_connections
          conversations += event.retros[0].conversations
          meaningful_conversations += event.retros[0].meaningful_conversations
          provided_help.push(event.retros[0].provided_help)
          received_help.push(event.retros[0].received_help)
          rating.push(event.retros[0].rating)
        })
        this.setState({data: data})
        this.setState({events: events})
        this.setState({cards_given: cards_given})
        this.setState({cards_received: cards_received})
        this.setState({conversations: conversations})
        this.setState({meaningful_conversations: meaningful_conversations})
        this.setState({connector_connections: connector_connections})
        this.setState({provided_help: provided_help})
        this.setState({received_help: received_help})
        this.setState({rating: rating})
      })
      .done();
    })
  }

  render() {
    let events = ''
    if (this.state.data.length > 0){
      events = `You have attended ${this.state.data.length} events`
    } else {
      events = 'You have not attended any events yet! Once you start attending events and reporting back we can provide you with some insights!'
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}> My Stats </Text>
        <Text style={styles.text}> {events} </Text>
        <Text style={styles.text}> Cards Given: {this.state.cards_given} </Text>
        <Text style={styles.text}> Cards Received: {this.state.cards_received} </Text>
        <Text style={styles.text}> Conversations: {this.state.conversations} </Text>
        <Text style={styles.text}> Meaningful Converations: {this.state.meaningful_conversations} </Text>


        <TouchableOpacity style={styles.buttonWrapper} onPress={Actions.HomePage}>
          <Text style={styles.buttonText}> Go Back </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Challenges;
