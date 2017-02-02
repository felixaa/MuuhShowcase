import React, { PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    zIndex: 2,
  },
  square: {
    flex: 1,
    opacity: 0.95,
    justifyContent: 'center',
    padding: 30,
  },
  text: {
    color: 'white',
    fontSize: 24,
    maxWidth: 140,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: .14,
    shadowRadius: 10,
  },
});

const Title = props => (
  <TouchableHighlight onPress={props.onPress} underlayColor="white" style={[
    styles.touchable,
    props.style,
  ]}>
    <View style={[
      styles.square,
      { backgroundColor: props.color},
      props.noShadow ? null : styles.shadow
    ]}>
      <Text style={styles.text}>
        {props.client.title}
      </Text>
    </View>
  </TouchableHighlight>
);

Title.propTypes = {
  client: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.any,
  color: PropTypes.string,
  noShadow: PropTypes.bool,
};

Title.defaultProps = {
  color: '#7e57c2',
};

export default Title;
