import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
} from 'react-native'

const DATA = require('../../data/data');
import ListItem from './list-item';
import * as Animatable from 'react-native-animatable';

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
      return this.setState({ active: false });
    }

    this.setState({ currentId: rowID, active: true });
    this.animate(true, rowID);
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
        <ListView
          ref="list"
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

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1FFEA',
    justifyContent: 'center'
  }
})

module.exports = HomeScreen
