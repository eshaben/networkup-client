import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, TextInput, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import jwt_decode from 'jwt-decode';

class Retro extends Component {

  constructor(props) {
    super(props);
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
      event_id: null
    };
  }

  getEventId(){
    AsyncStorage.getItem('event_id').then((data) => {
      this.setState({event_id: data})
    })
  }

  saveRetro() {
    this.getEventId()
    console.log(this.state.event_id);
    AsyncStorage.getItem('id_token').then((token) => {
      let decodedToken = jwt_decode(token)
      fetch('http://localhost:3000/events/retros/' + this.state.event_id, {
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
        Alert.alert('Retro Saved!')
        this.removeItem('event_id')
        Actions.HomePage()
      })
      .done(() => {
        Actions.HomePage()
      });
    })
  }

  async removeItem(item, selectedValue) {
    try {
      await AsyncStorage.removeItem(item);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  render(props) {
    console.log(props.event_id);

    return (
      <ScrollView contentContainerStyle= {styles.contentContainer}>
      <View style={styles.container}>
        <Text style={styles.title}> Retro</Text>
        <View style={styles.form}>
          <Text style={styles.text}> How many conversations did you have approximately? </Text>
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
          <Text style={styles.text}> How many of those conversations were meaningful to you? </Text>
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
          <Text style={styles.text}> If there was one thing that you gained from this event, what was it? </Text>
          <TextInput
            editable={true}
            onChangeText={(one_gain) => this.setState({one_gain})}
            placeholder='e.g Insight on branding'
            ref='one_gain'
            returnKeyType='next'
            style={styles.inputText}
            value={this.state.one_gain}
          />
          <Text style={styles.text}> How many business cards did you receive? </Text>
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
          <Text style={styles.text}> How many business cards of yours did you give out? </Text>
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
          <Text style={styles.text}> On a scale of 1-10, 10 being the best, how do you feel after attending this event? </Text>
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
  }
}

export default Retro;
