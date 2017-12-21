import React, { Component } from 'react';
import { Container } from 'native-base';
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
