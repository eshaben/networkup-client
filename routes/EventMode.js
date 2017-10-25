import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Card, ListItem, Button } from 'react-native-elements'
import styles from './styles';
import jwt_decode from 'jwt-decode';


class EventMode extends Component {

  constructor() {
    super();
    this.state = {  };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Event Mode </Text>
        <Card title="CARD WITH DIVIDER">
            {
              users.map((u, i) => {
                return (
                  <View key={i} style={styles.user}>
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={{ uri: u.avatar }}
                    />
                    <Text style={styles.name}>{u.name}</Text>
                  </View>
                );
              })
            }
          </Card>

          <TouchableOpacity style={styles.buttonWrapper} onPress={Actions.HomePage}>
            <Text style={styles.buttonText}> Go Back </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

export default EventMode;
