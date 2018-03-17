import React, { Component } from "react";
import {
  StyleSheet,
  ViewPropTypes,
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import PropTypes from "prop-types";

import Ripple from "react-native-material-ripple"

import checked from "../../assets/checked.png";
import backspace from "../../assets/backspace.png";

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

    let pin
    if (value === 10) {
      pin = <Image source={checked} style={style.image} />
    } else if (value === 11) {
      pin = <Image source={backspace} style={style.image} />;
    } else {
      pin = <Text style={style.text}>{this.props.value}</Text>;
    }

    return <Ripple onPress={onPress}>
        <View style={style.container}>
          {pin}
        </View>
      </Ripple>;
      
  }
}

export { Pin };
