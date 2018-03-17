import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View } from "react-native";
import PropTypes from "prop-types";

import Dot from "./Dot";

import style from "./LinePinVisualizer.style";

class LinePinVisualizer extends Component {
  static propTypes = {
    dots: PropTypes.number
  };

  static defaultProps = {
    dots: 0
  };

  _renderState() {
    let dots = [];

    for (let index = 0; index < this.props.dots; index++) {
      dots.push(<Dot key={index} style={this.props.style} />);
    }

    return dots;
  }

  render() {
    return <View style={style.container}>{this._renderState()}</View>;
  }
}

export default LinePinVisualizer;
