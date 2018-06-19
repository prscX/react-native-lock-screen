import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View } from "react-native";
import PropTypes from "prop-types";

import styles from "./Dot.style";

class Dot extends Component {
  render() {
    let { style } = this.props

    return <View {...this.props} style={[styles.container, style]} />;
  }
}

export default Dot;
