import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  StatusBar,
  Navigator,
} from 'react-native';

import HomeScreen from './components/main-screen/home'
import { connect } from 'react-redux';

const ROUTES = {
  home: HomeScreen,
}

class MuuhNavigator extends Component {

  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'home':
        return <HomeScreen navigator={navigator}/>
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated={true}
          //barStyle={'dark-content'}
          showHideTransition={'slide'}
          hidden={this.props.statusBar}
        />
        <Navigator
          initialRoute={{name: 'home'}}
          renderScene={this.renderScene}
          configureScene={(route) => {
            return Navigator.SceneConfigs.FloatFromRight
          }}
          />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

function select(store) {
  return {
    statusBar: store.navigation.statusBar
  }
}



module.exports = connect(select)(MuuhNavigator)
