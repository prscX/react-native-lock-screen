import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import * as Animatable from "react-native-animatable";

import LinePinVisualizer from "./LinePinVisualizer";

import style from "./HeaderFragment.style";

import lockIcon from "../../assets/lock.png";
import successIcon from "../../assets/lock.png";


class HeaderFragment extends Component {
  static State = {
    Default: 0,
    Reenter: 1,
    Success: 2,
    Error: 3
  };

  static propTypes = {
    ...ViewPropTypes,

    defaultState: PropTypes.object,
    reenterState: PropTypes.object,
    successState: PropTypes.object,
    errorState: PropTypes.object,

    state: PropTypes.number,
    dots: PropTypes.number,

    backgroundColor: PropTypes.string
  };

  static defaultProps = {
    defaultState: {
      title: "Enter a passcode",
      titleStyle: style.defaultTitleStyle,
      icon: lockIcon
    },

    reenterState: {
      title: "Re-enter new passcode",
      titleStyle: style.reenterTitleStyle,
      icon: lockIcon,
    },

    successState: {
      title: "Passcode is correct",
      titleStyle: style.successTitleStyle,
      icon: successIcon
    },

    errorState: {
      title: "Passcode do not match",
      titleStyle: style.errorTitleStyle,
      icon: lockIcon
    },

    state: 0,
    dots: 0
  };

  _renderState() {
    if (this.props.renderState) return this.props.renderState();

    let props;
    switch (this.props.state) {
      case HeaderFragment.State.Default:
        props = HeaderFragment.defaultProps.defaultState
        if (this.props.defaultState) {
          props = Object.assign(props, this.props.defaultState)
        }

        return renderState({...props});
      case HeaderFragment.State.Reenter:
        props = HeaderFragment.defaultProps.reenterState
        if (this.props.reenterState) {
          props = Object.assign(props, this.props.reenterState)
        }

        return renderState({...props});
      case HeaderFragment.State.Success:
        props = HeaderFragment.defaultProps.successState
        if (this.props.successState) {
          props = Object.assign(props, this.props.successState)
        }

        return renderState({...props});
      case HeaderFragment.State.Error:
        props = HeaderFragment.defaultProps.errorState
        if (this.props.errorState) {
          props = Object.assign(props, this.props.errorState)
        }

        return renderState({...props});
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

    let renderPasscodeVisualizer = props => {
      let styles = [style.passcodeVisualizerContainer];
      if (this.props.backgroundColor) {
        styles.push({ backgroundColor: this.props.backgroundColor });
      }

      return (
        <View style={styles}>
          <Animatable.View
            ref={ref => {
              this.view = ref;
            }}
          >
            <LinePinVisualizer dots={this.props.dots} style={props.style} />
          </Animatable.View>;
        </View>
      );
    };

    let styles
    switch (this.props.state) {
      case HeaderFragment.State.Default:
        styles = [style.defaultDotsStyle]
        if (this.props.defaultState) {
          styles.push({...this.props.defaultState.dotsStyle});
        }

        return renderPasscodeVisualizer({
          style: styles
        });
      case HeaderFragment.State.Reenter:
        styles = [style.reenterDotsStyle]
        if (this.props.reenterState) {
          styles.push({...this.props.reenterState.dotsStyle});
        }

        return renderPasscodeVisualizer({
          style: styles
        });
      case HeaderFragment.State.Success:
        styles = [style.successDotsStyle]
        if (this.props.successState) {
          styles.push({...this.props.successState.dotsStyle});
        }

        return renderPasscodeVisualizer({
          style: styles
        });
      case HeaderFragment.State.Error:
        styles = [style.errorDotsStyle]
        if (this.props.errorState) {
          styles.push({...this.props.errorState.dotsStyle});
        }

        return renderPasscodeVisualizer({
          style: styles
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.state === HeaderFragment.State.Error &&
      prevProps.state !== HeaderFragment.State.Error
    ) {
      this.view.shake(800);
    }
  }

  render() {
    let styles = [style.container];
    if (this.props.backgroundColor) {
      styles.push({ backgroundColor: this.props.backgroundColor });
    }

    return <View style={styles}>
        {this._renderState()}
        {this._renderPasscodeVisualizer()}
      </View>;
  }
}

export { HeaderFragment };
