import React, { Component } from 'react';
import { Container, Header, Tab, Tabs } from 'native-base';
import Tab1 from './tabOne';
import Tab2 from './tabTwo';
​export default class TabsScrollableExample extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs/>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          <Tab heading="Tab1">
            <Tab1 />
          </Tab>
          <Tab heading="Tab2">
            <Tab2 />
          </Tab>
          <Tab heading="Tab3">
            <Tab3 />
          </Tab>
          <Tab heading="Tab4">
            <Tab4 />
          </Tab>
          <Tab heading="Tab5">
            <Tab5 />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
