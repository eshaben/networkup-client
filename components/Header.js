import React, { Component } from 'react';
import {Header, Text} from 'native-base';

export default class HeaderExample extends Component {
  render(){
    return (
      <Header hasTabs>
        <Text style={styles.subtitle}> NetworkUp </Text>
      </Header>
    )
  }
}
