
import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View } from "react-native";
import PropTypes from "prop-types";

import style from './Dot.style'

class Dot extends Component {

  render () {
    return <View style={[style.circle, this.props.style]} />;
  }
}

export default Dot