import MuuhApp from './MuuhApp';
import React, { Component } from 'react';
import {
  View,
} from 'react-native'
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';

function setup(): React.Component {
  // Do inital app-configuration here
  // Sett global constants
  console.log('Setting up muuh-showcase-app');

  class Root extends Component {
    constructor() {
      super();
      this.state = {
        isLoading: false,
        // TODO Callback from configureStore for persistStore etc
        store: configureStore(),
      };
    }

    render() {
      return (
        <Provider store={this.state.store}>
          <MuuhApp/>
        </Provider>
      );
    }
  }
  return Root;
}

module.exports = setup;
