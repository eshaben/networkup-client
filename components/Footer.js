import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Tab, Tabs, ScrollableTab } from 'native-base';
import styles from '../routes/styles.js'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class FooterTabsIconExample extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs>
          <Text style={styles.subtitle}> NetworkUp </Text>
        </Header>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          <Tab heading="Check In">
          </Tab>
          <Tab heading="Goals">
          </Tab>
          <Tab heading="Network">
          </Tab>
          <Tab heading="Check Out">
          </Tab>
          <Tab heading="Retro">
          </Tab>
        </Tabs>
        <Content />
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
      </Container>
    );
  }
}
