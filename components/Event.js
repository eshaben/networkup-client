import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'native-base';
import { Container } from 'native-base';
import styles from '../routes/styles.js'
import Actions from 'react-native-router-flux'

export default class EventStuff extends Component {
  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Event Mode</Text>
        </View>
    );
  }
}
