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
    dotsLimit: PropTypes.number,
    enableDots: PropTypes.bool
  };

  static defaultProps = {
    defaultState: {
      title: "Enter a passcode",
      titleStyle: style.defaultTitleStyle,
      icon: lockIcon,
      dotProps: {
        style: {
          backgroundColor: "#FFFFFF"
        }
      }
    },

    reenterState: {
      title: "Re-enter passcode to verify",
      titleStyle: style.reenterTitleStyle,
      icon: lockIcon,
      dotProps: {
        style: {
          backgroundColor: "#FFFFFF"
        }
      }
    },

    successState: {
      title: "Passcode is correct",
      titleStyle: style.successTitleStyle,
      icon: successIcon,
      dotProps: {
        style: {
          backgroundColor: "#037d50",
          borderColor: "#037d50"
        }
      }
    },

    errorState: {
      title: "Passcode do not match",
      titleStyle: style.errorTitleStyle,
      icon: lockIcon,
      dotProps: {
        style: {
          backgroundColor: "#be0000",
          borderColor: "#be0000"
        }
      }
    },

    state: 0,
    dots: 0,
    enableDots: true
  };

  _renderState() {
    if (this.props.renderState) return this.props.renderState();

    let props;
    switch (this.props.state) {
      case HeaderFragment.State.Default:
        props = HeaderFragment.defaultProps.defaultState;
        if (this.props.defaultState) {
          props = Object.assign(props, this.props.defaultState);
        }

        return renderState({ ...props });
      case HeaderFragment.State.Reenter:
        props = HeaderFragment.defaultProps.reenterState;
        if (this.props.reenterState) {
          props = Object.assign(props, this.props.reenterState);
        }

        return renderState({ ...props });
      case HeaderFragment.State.Success:
        props = HeaderFragment.defaultProps.successState;
        if (this.props.successState) {
          props = Object.assign(props, this.props.successState);
        }

        return renderState({ ...props });
      case HeaderFragment.State.Error:
        props = HeaderFragment.defaultProps.errorState;
        if (this.props.errorState) {
          props = Object.assign(props, this.props.errorState);
        }

        return renderState({ ...props });
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
    let {
      dots,
      dotsLimit,
      backgroundColor,
      defaultState,
      reenterState,
      successState,
      errorState,
      renderPasscodeVisualizer,
      state,
      enableDots
    } = this.props;

    if (renderPasscodeVisualizer) return renderPasscodeVisualizer();

    let renderVisualizer = props => {
      let styles = [style.passcodeVisualizerContainer];
      if (backgroundColor) {
        styles.push({ backgroundColor: backgroundColor });
      }

      return (
        <View style={styles}>
          {/* <Animatable.View
            ref={ref => {
              this.view = ref;
            // }}
          > */}
          {enableDots && (
            <LinePinVisualizer
              dotsLimit={dotsLimit}
              dots={dots}
              style={[props.style]}
              {...props}
            />
          )}
          {/* </Animatable.View>; */}
        </View>
      );
    };

    let dotProps;
    switch (state) {
      case HeaderFragment.State.Default:
        dotProps = Object.assign(
          {},
          HeaderFragment.defaultProps.defaultState.dotProps
        );
        if (defaultState && defaultState.dotProps) {
          dotProps = Object.assign(dotProps, defaultState.dotProps);
        }

        return renderVisualizer({
          dotProps: { ...dotProps }
        });
      case HeaderFragment.State.Reenter:
        dotProps = Object.assign(
          {},
          HeaderFragment.defaultProps.reenterState.dotProps
        );
        if (defaultState && reenterState.dotProps) {
          dotProps = Object.assign(dotProps, reenterState.dotProps);
        }

        return renderVisualizer({
          dotProps: { ...dotProps }
        });
      case HeaderFragment.State.Success:
        dotProps = Object.assign(
          {},
          HeaderFragment.defaultProps.successState.dotProps
        );
        if (defaultState && successState.dotProps) {
          dotProps = Object.assign(dotProps, successState.dotProps);
        }

        return renderVisualizer({
          dotProps: { ...dotProps }
        });
      case HeaderFragment.State.Error:
        dotProps = Object.assign(
          {},
          HeaderFragment.defaultProps.errorState.dotProps
        );
        if (defaultState && errorState.dotProps) {
          dotProps = Object.assign(dotProps, errorState.dotProps);
        }

        return renderVisualizer({
          dotProps: { ...dotProps }
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.state === HeaderFragment.State.Error &&
      prevProps.state !== HeaderFragment.State.Error
    ) {
      // this.view.shake(800);
    }
  }

  render() {
    let { backgroundColor } = this.props;
    let styleProps = this.props.style;

    let styles = [style.container, styleProps];
    if (backgroundColor) {
      styles.push({ backgroundColor: backgroundColor });
    }

    return (
      <View style={styles}>
        {this._renderState()}
        {this._renderPasscodeVisualizer()}
      </View>
    );
  }
}

export { HeaderFragment };
