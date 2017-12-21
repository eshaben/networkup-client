import React, { Component } from 'react';
import { Container} from 'native-base';
import Challenges from './Challenges.js'
import HeaderExample from './Header.js'
import FooterTabs from './Footer.js'

export default class EventHome extends Component {
  render() {
    return (
      <Container>
        <HeaderExample />
        <Challenges />
        <FooterTabs />
      </Container>
    );
  }
}
