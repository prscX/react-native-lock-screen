import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View } from "react-native";
import PropTypes from "prop-types";

import Dot from "./Dot";

import style from "./LinePinVisualizer.style";

class LinePinVisualizer extends Component {
  static State = {
    Default: 0,
    Reenter: 1,
    Success: 2,
    Error: 3
  };

  static propTypes = {
    dots: PropTypes.number,
    state: PropTypes.number,
    count: PropTypes.number
  };

  static defaultProps = {
    dots: 0,
    state: 0,
    count: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      dots: props.dots
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dots != this.props.dots) {
      this.setState({
        dots: nextProps.dots
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.dots != nextState.dots) {
      return true;
    }

    return false;
  }

  _renderState() {
    switch (this.props.state) {
      case LinePinVisualizer.State.Default:
        let dots = [];

        for (let index = 0; index < this.state.dots; index++) {
          dots.push(<Dot key={index} />);
        }

        return dots;
      case LinePinVisualizer.State.Reenter:
        break;
      case LinePinVisualizer.State.Success:
        break;
      case LinePinVisualizer.State.Error:
        break;
    }
  }

  render() {
    return <View style={style.container}>{this._renderState()}</View>;
  }
}

export default LinePinVisualizer;
