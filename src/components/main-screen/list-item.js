import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Dimensions
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import Title from './Title';
import ClientImage from './ClientImage';
import NextEpisode from './NextEpisode';

const height = Dimensions.get('window').height;

const selectOpened = (opened, style) => opened ? style.opened : style.closed;

const colors = [
  '#1ABC9C',
  '#2ECC71',
  '#3498DB',
  '#9B59B6',
  '#34495E',
  '#F1C40F',
  '#E74C3C',
  '#95A5A6',
  '#607d8b',
  '#9c27b0',
  '#00bcd4',
  '#ffc107',
];

const getStyles = (opened, left) => StyleSheet.create({
  container: selectOpened(opened, {
    opened: {
      height,
      width: Dimensions.get('window').width,
      position: 'relative',
      zIndex: 1,
    },
    closed: {
      flex: 1,
      alignItems: 'stretch',
      height: 250,
      justifyContent: 'center',
    },
  }),
  title: selectOpened(opened, {
    opened: {
      height: Dimensions.get('window').width / 2,
      flexDirection: 'row',
    },
    closed: {
      position: 'absolute',
      top: 25,

      zIndex: 2,
      height: 200,
      width: 200,
      left: left ? 5 : undefined,
      right: left ? undefined : 5
    }
  }),
  image: selectOpened(opened, {
    opened: {
      flex: 1
    },
    closed: {
      flex: 0,
      height: 170,
      zIndex: 1,
    },
  }),
  description: selectOpened(opened, {
    opened: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    closed: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  }),
  descriptionText: {
    color: 'black',
    textAlign: 'center',
    maxHeight: height / 3,
  },
  animatableNextEpisode: {
    flex: 1,
    zIndex: 1,
    position: opened ? undefined : 'absolute',
    right: 0,
    bottom: 0,
    top: 0
  },
});

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openend: false,
      exitEnded: true
    };

    this.onPress = this.onPress.bind(this);
  }

  componentWillUpdate() {
    const animation = LayoutAnimation.create(500, 'easeInEaseOut', 'opacity');
    LayoutAnimation.configureNext(animation, () => {
      this.setState({
        exitEnded: true,
      });
    });
  }

  onPress() {
    this.props.onPress();

    if (this.state.opened) {
      this.refs.nextEpisode.fadeOutLeft();
      this.refs.description.fadeOutDownBig();
      return  this.setState({opened: false, windowPos: null, exitEnded: false});
    }
    this.setState({ opened: true });
    this.refs.container.measureInWindow((x, y) => this.setState({
      windowPos: { x, y },
    }));
  }

  render() {
    const props = this.props;
    const { opened, exitEnded } = this.state;
    const styles = getStyles(opened, (props.index % 2 === 0));

    const containerPos = this.state.windowPos ? {
      top: - this.state.windowPos.y,
    } : {};

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={[styles.container, containerPos]} ref="container" >
          <ClientImage client={props.client} style={styles.image} noShadow={opened}/>
          <View style={styles.title}>
            <Title
              client={props.client}
              color={colors[(props.index % colors.length)]}
              onPress={this.onPress}
              noShadow={opened}
            />
            { (opened || ! exitEnded) && (
              <Animatable.View
                animation="slideInLeft"
                style={styles.animatableNextEpisode}
                duration={800}
                ref="nextEpisode"
              >
                <NextEpisode tvShow={this.props.tvShow}/>
              </Animatable.View>
            )}
          </View>
          { (opened || ! exitEnded) && (
            <Animatable.View
              animation="fadeInUpBig"
              style={styles.description}
              duration={800}
              ref="description"
              delay={400}
            >
              <Text style={styles.descriptionText}>{this.props.client.description}</Text>
            </Animatable.View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

ListItem.propTypes = {
  client: PropTypes.object.isRequired,
  index: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onPress: PropTypes.func,
  opened: PropTypes.bool,
};

ListItem.defaultProps = {
  index: 0,
  onPress: () => {}
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 300,
    backgroundColor: 'cyan',
    padding: 20,
  }
})

export default ListItem;
