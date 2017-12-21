import React, { Component } from 'react';
import { Container } from 'native-base';
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
