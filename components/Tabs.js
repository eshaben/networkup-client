import React, { Component } from 'react';
import { Tab, Tabs, ScrollableTab } from 'native-base';
import CheckIn from './CheckIn.js'
import SetGoals from './SetGoals.js'
import Network from './Network.js'
import CheckOut from './CheckOut.js'

export default class HeaderTabs extends Component {
  render(){
    return (
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          <Tab heading="Check In">
            <CheckIn />
          </Tab>
          <Tab heading="Goals">
            <SetGoals />
          </Tab>
          <Tab heading="Network">
            <Network />
          </Tab>
          <Tab heading="Check Out">
            <CheckOut />
          </Tab>
          <Tab heading="Retro">
          </Tab>
        </Tabs>
    );
  }
}
