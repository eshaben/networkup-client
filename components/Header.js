import React, { Component } from 'react';
import {Header, Text} from 'native-base';

export default class HeaderExample extends Component {
  render(){
    return (
      <Header hasTabs style={{backgroundColor: '#ffa43e'}}>
        <Text style={{
          fontSize: 25,
          margin: 10,
          textAlign: 'left',
          color:'white'
        }}> NetworkUp </Text>
      </Header>
    )
  }
}
