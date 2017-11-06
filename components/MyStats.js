import React, {Component} from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View, AsyncStorage, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from '../routes/styles';
import {Thumbnail} from 'native-base'
import { Card, ListItem, Button, Rating } from 'react-native-elements';
import jwt_decode from 'jwt-decode';
import { Stars } from 'react-native-stars';
import {
  VictoryAxis, VictoryPie, VictoryPolarAxis, VictoryArea, VictoryBar, VictoryChart, VictoryStack, VictoryTheme }
from "victory-native";

class MyStats extends Component {

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
      badgeDetails: null,
      numberOfBadges: 0,
      points: 0,
      challenges_completed: null,
      listOfBadges: []
    };
  }

  componentDidMount(){
    this.getRetros()
    this.getBadges()
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
    var rating = 0

    AsyncStorage.getItem('id_token').then((token) => {
      let decodedToken = jwt_decode(token)
      let id = decodedToken.id
      fetch('http://localhost:3000/events/retros/byuser/' + id, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(data)
        data.forEach(function(event){
          if (event.retros.length !== 0){
            events++
            cards_given += event.retros[0].cards_given
            cards_received += event.retros[0].cards_received
            connector_connections += event.retros[0].connector_connections
            conversations += event.retros[0].conversations
            meaningful_conversations += event.retros[0].meaningful_conversations
            if (event.retros[0].received_help){
              received_help.push(event.retros[0].received_help)
            }
            if (event.retros[0].provided_help){
              provided_help.push(event.retros[0].provided_help)
            }
            rating+=event.retros[0].rating
          }
        })
        let averageRating = (rating / events)
        this.setState({data: data})
        this.setState({events: events})
        this.setState({cards_given: cards_given})
        this.setState({cards_received: cards_received})
        this.setState({conversations: conversations})
        this.setState({meaningful_conversations: meaningful_conversations})
        this.setState({connector_connections: connector_connections})
        this.setState({provided_help: provided_help.length})
        this.setState({received_help: received_help.length})
        this.setState({rating: averageRating.toFixed(1)})
      })
      .done();
    })
  }

  getBadges(){
    let points = 0
    let badgesArray = []
    let images = []
    AsyncStorage.getItem('id_token').then((token) => {
      let decodedToken = jwt_decode(token)
      fetch('http://localhost:3000/badges/' + decodedToken.id, {
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
        let badges = data[0].badges
        for(var i=0; i<badges.length; i++){
          badgesArray.push({title: badges[i].title, images: badges[i].image})
          points += badges[i].points_needed;
        }
        this.setState({listOfBadges: badgesArray})
        this.setState({points: points})
        this.setState({badgeDetails: data[0]})
        this.setState({numberOfBadges: data[0].badges.length})
      })
      .done();
    })
  }

  render() {
    let events = ''
    let averageRating = 6

    if (this.state.data.length > 0){
      events = `Total events: ${this.state.data.length}`
    } else {
      events = 'You have not attended any events yet! Once you start attending events and reporting back we can provide you with some insights!'
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.subtitle}> My Stats </Text>

          <View style={{width:370}}>
          <Card title="Quick Overview">
            <Text style={styles.text}> {events} </Text>
            <Text style={styles.text}> Points: {this.state.points} </Text>
            <Text style={styles.text}> Average overall rating: {this.state.rating} </Text>

          </Card>
          </View>

          <View>
            <Card containerStyle={{width: 340, flexDirection:'row', flexWrap: 'wrap', justifyContent: 'center'}} title = "Badges">
             {this.state.listOfBadges.map((list, l) =>{
               return (
                 <View style={{flexDirection: 'row'}} key={l}>
                    <Image
                     style={{width: 100, height: 100, flexDirection: 'row'}}
                     source={{uri: list.images}} />
                </View>
               )
             })}
            </Card>
          </View>

          <Card containerStyle={{width: 340, flexDirection:'row', flexWrap: 'wrap', justifyContent: 'center'}} title="Conversations">
            <View style={{marginLeft: 30}} >
              <VictoryPie
                innerRadius={100}
                height={200}
                colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                data={[
                  {x: 1, y: this.state.meaningful_conversations, label: "Meaningful: " + this.state.meaningful_conversations},
                  {x: 2, y: this.state.conversations, label: "Total: " + this.state.conversations}
                ]}
              />
            </View>
          </Card>

          <Card containerStyle={{width: 340, flexDirection:'row', flexWrap: 'wrap', justifyContent: 'center'}} title="Business Cards">
            <Text style={styles.text}> Cards Received: {this.state.cards_received} </Text>
            <Text style={styles.text}> Cards Given: {this.state.cards_given} </Text>
          </Card>

          <Card containerStyle={{width: 340, flexDirection:'row', flexWrap: 'wrap', justifyContent: 'center'}} title="Received Help">
            <View style={{marginRight: 5}} >
              <VictoryPie
                innerRadius={100}
                height={200}
                colorScale={["gold", "lime", "cyan", "navy" ]}
                data={[
                  {x: 1, y: this.state.received_help, label: "Received Help: " + this.state.received_help},
                  {x: 2, y: this.state.data.length, label: "Total Events: " + this.state.events}
                ]}
              />
            </View>
          </Card>
          <Card containerStyle={{width: 340, flexDirection:'row', flexWrap: 'wrap', justifyContent: 'center'}} title="Provided Help">
            <View style={{marginRight: 5}} >
              <VictoryPie
                innerRadius={100}
                height={200}
                colorScale={["cyan", "pink" ]}
                data={[
                  {x: 1, y: this.state.provided_help, label: "Provided Help: " + this.state.provided_help},
                  {x: 2, y: this.state.data.length, label: "Total Events: " + this.state.events}
                ]}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    );
  }
}

export default MyStats;

var inStyles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
    justifyContent: 'center'
  },
  listItem: {
    margin: 10
  },
  background: {
    backgroundColor: 'white'
  }
})
