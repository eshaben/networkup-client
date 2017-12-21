import React, { Component } from 'react';
import { Container } from 'native-base';
import MyStats from './MyStats.js'
import HeaderExample from './Header.js'
import FooterTabs from './Footer.js'

export default class MyStatsHome extends Component {
  render() {
    return (
      <Container>
        <HeaderExample />
        <MyStats />
        <FooterTabs />
      </Container>
    );
  }
}
