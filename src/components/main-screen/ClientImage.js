
import React, { PropTypes } from 'react';
import { View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    zIndex: 1,
    //resizeMode: 'cover',
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 10},
    shadowOpacity: .30,
    shadowRadius: 10,
    marginLeft: 15,
    marginRight: 5,
  },
});

const ClientImage = props => (
  <View style={[ styles.container, props.noShadow ? null : styles.shadow, props.style]}>
    <Image source={{uri: props.client.image}}
           style={[styles.image, props.noShadow ? {borderTopLeftRadius: 10, borderTopRightRadius: 10} : null]}
      />
  </View>
);

ClientImage.propTypes = {
  client: PropTypes.object.isRequired,
  noShadow: PropTypes.bool,
  style: PropTypes.any,
};

ClientImage.defaultProps = {
};

export default ClientImage;
