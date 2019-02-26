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
      <View style={styles.rootContainer}>
        <MuuhNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    backgroundColor: 'white'
  }
});

function select(store) {
  return {

  };
}

module.exports = connect(select)(MuuhNavigator);
