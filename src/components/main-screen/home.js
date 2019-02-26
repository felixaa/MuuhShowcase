import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
} from 'react-native'

const DATA = require('../../data/data');
import ListItem from './list-item';
import * as Animatable from 'react-native-animatable';
const AnimatableListView = Animatable.createAnimatableComponent(ListView);
import { connect } from 'react-redux'

import {
  toggleStatusBar
} from '../../actions'

import Muuh from '../../commons/muuhLogo'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id}
    );

    this.state = {
      dataSource: ds,
      active: false,
      currentId: null
    }

    this.listItems = {};
  }

  toggleActive(rowID) {
    if (this.state.active) {
      this.animate(false, this.state.currentId);
      this.props.dispatch(toggleStatusBar(false))
      return this.setState({ active: false });
    }

    this.setState({ currentId: rowID, active: true });
    this.animate(true, rowID);
    this.props.dispatch(toggleStatusBar(true))
  }

  animate(out, currentId) {
    for (let rowId in this.listItems) {
      if (rowId === currentId) {
        continue;
      }
      const item = this.listItems[rowId];

      if (out) {
        item.fadeOutUp(400);
      } else {
        item.fadeInUp(400);
      }
    }
  }

  render() {
    const { active } = this.state;
    return (
      <View style={styles.container}>
        <AnimatableListView
          animation="fadeInUp"
          duration={1500}
          delay={400}
          ref="list"
          renderHeader={() => this.renderHeader()}
          dataSource={this.state.dataSource.cloneWithRows(DATA.clients)}
          scrollEnabled={!active}
          renderRow={(client, sectionID, rowID) => (
            <Animatable.View ref={(ref) => {this.listItems[rowID] = ref;}} style={{ flex: 1 }} >
              <ListItem client={client} index={rowID} onPress={() => this.toggleActive(rowID)} />
            </Animatable.View>
          )}
          enableEmptySections
        />
      </View>
    );
  }

  renderHeader() {
    return(
      <Animatable.View
        animation={"zoomInUp"}
        duration={2000}
        delay={1900}
        style={styles.header}>
        <Muuh/>
      </Animatable.View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function select(store) {
  return {

  }
}

module.exports = connect(select)(HomeScreen)
