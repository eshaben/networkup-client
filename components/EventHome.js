import React, { Component } from 'react';
import { Content, View, TouchableOpacity, Text } from 'native-base';
import { Container } from 'native-base';
import styles from '../routes/styles.js'
import HeaderExample from './Header.js'
import FooterTabs from './Footer.js'
import EventStuff from './Event.js'

export default class EventHome extends Component {
  render() {
    return (
      <Container>
        <HeaderExample />
        <EventStuff />

        <FooterTabs />
      </Container>
    );
  }
}
