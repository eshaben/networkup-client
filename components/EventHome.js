import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Tab, Tabs, ScrollableTab } from 'native-base';
import styles from '../routes/styles.js'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HeaderExample from './Header.js'
import HeaderTabs from './Tabs.js'
import FooterTabs from './Footer.js'

export default class EventHome extends Component {
  render() {
    return (
      <Container>
        <HeaderExample />
        <HeaderTabs />
        <FooterTabs />
      </Container>
    );
  }
}
