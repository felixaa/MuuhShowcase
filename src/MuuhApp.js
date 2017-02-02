import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

import { connect } from 'react-redux'
import MuuhNavigator from './MuuhNavigator'

class VWKickoffApp extends Component{
  render() {
    return(
      <View style={{flex: 1}}>
        <MuuhNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
  }
});

function select(store) {
  return {

  };
}

module.exports = connect(select)(MuuhNavigator);
