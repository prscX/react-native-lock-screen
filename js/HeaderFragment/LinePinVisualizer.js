import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View } from "react-native";
import PropTypes from "prop-types";

import Dot from "./Dot";

import style from "./LinePinVisualizer.style";

class LinePinVisualizer extends Component {
  static propTypes = {
    dots: PropTypes.number,
    dotsLimit: PropTypes.number,
    dotProps: PropTypes.object
  };

  static defaultProps = {
    dots: 0,
    dotsLimit: 4
  };

  _renderState() {
    let {
      dots,
      dotsLimit,
      dotProps
    } = this.props

    let dotsComponent = [];

    for (let index = 0; index < dotsLimit; index++) {
      if (index < dots) {
        dotsComponent.push(<Dot key={index} {...dotProps} />);
      } else {
        dotsComponent.push(<Dot key={index} />);
      }
    }

    return dotsComponent;
  }

  render() {
    return <View {...this.props} style={[style.container, this.props.style]} >
      {this._renderState()}
    </View>;
  }
}

export default LinePinVisualizer;
