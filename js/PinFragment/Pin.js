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

let checkedSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65.36 53.45"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M.66,28.71l6-7,15,16,36-37,7,7-43,45Z" fill="#747474" stroke="#747474" stroke-miterlimit="10"/></g></g></svg>'
let backspaceSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63.74 49"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M59.72,48.5H16.24a3.51,3.51,0,0,1-3-1.72L1,26.15a3.51,3.51,0,0,1,0-3.6L13.21,2.21a3.51,3.51,0,0,1,3-1.71h43.5A3.51,3.51,0,0,1,63.24,4V45A3.51,3.51,0,0,1,59.72,48.5Z" fill="#747474" stroke="#747474" stroke-miterlimit="10"/><path d="M23.24,15.5l3-4,10,10,9-9,4,3-9,9,9,10-4,4-9-10-10,10-4-4,10-10Z" fill="#fff" stroke="#747474" stroke-miterlimit="10"/></g></g></svg>'

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
            svgXmlData={deletePin.icon}
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
