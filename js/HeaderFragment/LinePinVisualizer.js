import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View } from "react-native";
import PropTypes from "prop-types";

import Dot from "./Dot";

import style from "./LinePinVisualizer.style";

class LinePinVisualizer extends Component {
  static propTypes = {
    dots: PropTypes.number,
    dotProps: PropTypes.object
  };

  static defaultProps = {
    dots: 0
  };

  _renderState() {
    let dots = [];

    for (let index = 0; index < this.props.dots; index++) {
      dots.push(<Dot key={index} {...this.props.dotProps} />);
    }

    return dots;
  }

  render() {
    return <View {...this.props} style={[style.container, this.props.style]} >
      {this._renderState()}
    </View>;
  }
}

export default LinePinVisualizer;
