import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Tab, Tabs, ScrollableTab } from 'native-base';
import styles from '../routes/styles.js'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Challenges from './Challenges.js'
import HeaderExample from './Header.js'
import FooterTabs from './Footer.js'
import Logout from './Logout.js'

export default class LogoutHome extends Component {
  render() {
    return (
      <Container>
        <HeaderExample />
        <Logout />
        <FooterTabs />
      </Container>
    );
  }
}
