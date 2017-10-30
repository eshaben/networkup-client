import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export default class FooterTabs extends Component {
  render() {
    return (
        <Footer>
          <FooterTab>
            <Button active>
              <MaterialIcons style={{fontSize: 25}}  name="event-available" />
            </Button>
            <Button>
              <MaterialCommunityIcons style={{fontSize: 25}} name="trophy" />
            </Button>
            <Button>
              <MaterialCommunityIcons style={{fontSize:25}} name="chart-bar" />
            </Button>
            <Button>
              <MaterialCommunityIcons style={{fontSize:25}} name="logout" />
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}
