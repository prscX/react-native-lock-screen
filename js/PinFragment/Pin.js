import React, { Component } from "react";
import {
  StyleSheet,
  ViewPropTypes,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

import Ripple from "react-native-material-ripple"

import style from './Pin.style'

class Pin extends Component {
  static propTypes = {
    value: PropTypes.number,
    onPress: PropTypes.func
  };

  static defaultProps = {
    value: -1
  }

  render() {
    const { onPress, value } = this.props

    return <Ripple onPress={onPress}>
        <View style={style.container}>
          <Text style={style.text}>{this.props.value}</Text>
        </View>
      </Ripple>;
      
  }
}

export { Pin };
