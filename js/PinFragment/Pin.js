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
    confirmPin: PropTypes.object,
    deletePin: PropTypes.object,
    onPress: PropTypes.func
  };

  static defaultProps = {
    value: -1,
    confirmPin: {
      icon: checkedSVG
    },
    deletePin: {
      icon: backspaceSVG
    }
  };

  render() {
    const { value, confirmPin, deletePin, onPress } = this.props;

    let styles = StyleSheet.flatten([style.image]);

    let pin;
    if (value === 10) {
        if (confirmPin.title) {
          pin = <Text style={[style.text, confirmPin.style]}>{confirmPin.title}</Text>;
        } else if (confirmPin.icon) {
          pin = <SvgUri width={styles.width} height={styles.height} source={confirmPin.icon} />;
        }
    } else if (value === 11) {
        if (deletePin.title) {
          pin = <Text style={[style.text, deletePin.style]}>{deletePin.title}</Text>;
        } else if (deletePin.icon) {
          pin = <SvgUri width={styles.width} height={styles.height} source={deletePin.icon} />;
        }
    } else {
      pin = <Text style={style.text}>{this.props.value}</Text>;
    }

    return (
      <Ripple onPress={onPress}>
        <View style={style.container}>{pin}</View>
      </Ripple>
    );
  }
}

export { Pin };
