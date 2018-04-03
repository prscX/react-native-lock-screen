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
import SvgUri from "react-native-svg-uri";

let checkedSVG = require("../../assets/checked.svg");
let backspaceSVG = require("../../assets/backspace.svg");

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

    let styles = StyleSheet.flatten([style.image]);

    let pin
    if (value === 10) {
      pin = <SvgUri width={styles.width} height={styles.height} source={checkedSVG} />;
    } else if (value === 11) {
      pin = <SvgUri width={styles.width} height={styles.height} source={backspaceSVG} />;
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
