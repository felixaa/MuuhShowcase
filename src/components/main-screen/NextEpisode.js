import React, { PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  square: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  text: {
    color: 'cyan',
    fontSize: 24,
    maxWidth: 140,
  },
});

const NextEpisode = props => (
  <TouchableHighlight onPress={props.onPress} underlayColor="white" style={[
    styles.touchable,
    props.style,
  ]}>
    <View style={[styles.square, { backgroundColor: props.color}]}>
      <Animatable.Text style={styles.text} animation="fadeInUp" delay={400}>
        Besøk nettside
      </Animatable.Text>
    </View>
  </TouchableHighlight>
);

NextEpisode.propTypes = {
  client: PropTypes.object,
  style: PropTypes.any,
  color: PropTypes.string,
};

NextEpisode.defaultProps = {
  color: 'white',
};

export default NextEpisode;
