import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Tab, Tabs, ScrollableTab } from 'native-base';
import styles from '../routes/styles.js'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Actions} from 'react-native-router-flux';

export default class FooterTabs extends Component {
  render() {
    return (
        <Footer>
          <FooterTab>
            <Button active>
              <MaterialIcons style={{fontSize: 25}}  name="event-available" onPress={Actions.HomePage}/>
            </Button>
            <Button>
              <MaterialCommunityIcons style={{fontSize: 25}} name="trophy" onPress={Actions.Challenges}/>
            </Button>
            <Button>
              <MaterialCommunityIcons style={{fontSize:25}} name="chart-bar" onPress={Actions.MyStats}/>
            </Button>
            <Button>
              <MaterialCommunityIcons style={{fontSize:25}} name="logout" onPress={Actions.LogoutPage} />
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}
