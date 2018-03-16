import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import style from "./HeaderFragment.style";

import lockIcon from "../../assets/lock.png";
import LinePinVisualizer from "./LinePinVisualizer";

class HeaderFragment extends Component {
  static State = {
    Default: 0,
    Reenter: 1,
    Success: 2,
    Error: 3
  };

  static propTypes = {
    ...ViewPropTypes,

    defaultTitle: PropTypes.string,
    defaultTitleStyle: PropTypes.number,
    defaultIcon: PropTypes.number,

    reenterTitle: PropTypes.string,
    reenterTitleStyle: PropTypes.number,
    reenterIcon: PropTypes.number,

    successTitle: PropTypes.string,
    successTitleStyle: PropTypes.number,
    successIcon: PropTypes.number,

    errorTitle: PropTypes.string,
    errorTitleStyle: PropTypes.number,
    errorIcon: PropTypes.number,

    state: PropTypes.number
  };

  static defaultProps = {
    defaultTitle: "Enter a passcode",
    defaultTitleStyle: style.defaultTitleStyle,
    defaultIcon: lockIcon,

    reenterTitle: "Re-enter new passcode",
    reenterTitleStyle: style.reenterTitleStyle,
    reenterIcon: undefined,

    successTitle: "Passcode is correct",
    successTitleStyle: style.successTitleStyle,
    successIcon: undefined,

    errorTitle: "Passcode do not match",
    errorTitleStyle: style.errorTitleStyle,
    errorIcon: undefined,

    state: 0
  };

  _renderState() {
    if (this.props.renderState) return this.props.renderState();

    switch (this.props.state) {
      case HeaderFragment.State.Default:
        return renderState({
          title: this.props.defaultTitle,
          titleStyle: this.props.defaultTitleStyle,
          icon: this.props.defaultIcon
        });
      case HeaderFragment.State.Reenter:
        return renderState({
          title: this.props.reenterTitle,
          titleStyle: this.props.reenterTitleStyle,
          icon: this.props.reenterIcon
        });

        break;
      case HeaderFragment.State.Success:
        return renderState({
          title: this.props.successTitle,
          titleStyle: this.props.successTitleStyle,
          icon: this.props.successIcon
        });

        break;
      case HeaderFragment.State.Error:
        return renderState({
          title: this.props.errorTitle,
          titleStyle: this.props.errorTitleStyle,
          icon: this.props.errorIcon
        });

        break;
    }

    function renderState(props) {
      return (
        <View style={style.circleGroup}>
          <View style={style.circleContainer}>
            <View style={style.circle}>
              <Image source={props.icon} style={style.circleIcon} />
            </View>
          </View>
          <Text style={props.titleStyle}>{props.title}</Text>
        </View>
      );
    }
  }

  _renderPasscodeVisualizer() {
    if (this.props.renderPasscodeVisualizer)
      return this.props.renderPasscodeVisualizer();

    return (
      <View style={style.passcodeVisualizerContainer}>
        <LinePinVisualizer dots={10} />
      </View>
    );
  }

  render() {
    return (
      <View style={style.container}>
        {this._renderState()}
        {this._renderPasscodeVisualizer()}
      </View>
    );
  }
}

export { HeaderFragment };
