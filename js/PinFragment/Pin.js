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

let SUGGESTIONS = {
  1: '',
  2: 'ABC',
  3: 'DEF',
  4: 'GHI',
  5: 'JKL',
  6: 'MNO',
  7: 'PQRS',
  8: 'TUV',
  9: 'WXYZ',
  0: '+'
}

class Pin extends Component {
  static propTypes = {
    value: PropTypes.number,
    confirmPin: PropTypes.object,
    deletePin: PropTypes.object,
    rippleProps: PropTypes.object,
    containerStyle: PropTypes.object,
    textStyle: PropTypes.object,
    suggestionStyle: PropTypes.object,
    alphabetPinSuggestion: PropTypes.bool,
    onPress: PropTypes.func
  };

  static defaultProps = {
    value: -1,
    confirmPin: {
      icon: checkedSVG
    },
    deletePin: {
      icon: backspaceSVG
    },
    alphabetPinSuggestion: true
  };

  render() {
    const {
      value,
      confirmPin,
      deletePin,
      rippleProps,
      containerStyle,
      textStyle,
      suggestionStyle,
      alphabetPinSuggestion,
      onPress
    } = this.props;

    let styles = StyleSheet.flatten([style.image]);

    let pin;
    if (value === 10) {
      if (confirmPin.title) {
        pin = (
          <Text style={[style.pin, confirmPin.style]}>{confirmPin.title}</Text>
        );
      } else if (confirmPin.icon) {
        pin = (
          <SvgUri
            width={styles.width}
            height={styles.height}
            source={confirmPin.icon}
          />
        );
      }
    } else if (value === 11) {
      if (deletePin.title) {
        pin = (
          <Text style={[style.pin, deletePin.style]}>{deletePin.title}</Text>
        );
      } else if (deletePin.icon) {
        pin = (
          <SvgUri
            width={styles.width}
            height={styles.height}
            source={deletePin.icon}
          />
        );
      }
    } else {
      if (!alphabetPinSuggestion) {
        pin = <Text style={[style.pin, textStyle]}>{this.props.value}</Text>;
      } else {
          pin = <View style={{
            flex: 1,
            alignItems: 'center'
          }}>
            <View>
              <Text style={[style.pin, textStyle]}>
                {this.props.value}
              </Text>
            </View>
            <View>
              <Text style={[style.suggestion, suggestionStyle]}>
                {SUGGESTIONS[this.props.value]}
              </Text>
            </View>
          </View>;
      }
    }

    let containerStyl = StyleSheet.flatten(style.container);

    return (
      <Ripple
        onPress={onPress}
        rippleContainerBorderRadius={containerStyl.borderRadius}
        {...rippleProps}
      >
        <View style={[style.container, containerStyle]}>{pin}</View>
      </Ripple>
    );
  }
}

export { Pin };
