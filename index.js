import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, Platform, Dimensions } from "react-native";
import PropTypes from "prop-types";

import { requireNativeComponent } from "react-native";

class RNLockScreen extends Component {
  static propTypes = {
    ...ViewPropTypes,

    type: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    pattern: PropTypes.object,
    pin: PropTypes.object,
    props: PropTypes.object
  };

  static defaultProps = {
    type: "pin",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    onStarted: undefined,
    onProgress: undefined,
    onComplete: undefined,
    onCleared: undefined,
    onEmpty: undefined,
    onChange: undefined,
    pattern: {
      dotCount: 9,
      dotNormalSize: 12,
      dotSelectedSize: 24,
      pathWidth: 4,
      aspectRatioEnabled: true,
      aspectRatio: "square",
      normalStateColor: "#0053a0",
      correctStateColor: "#00b300",
      wrongStateColor: "#fd1c00",
      dotAnimationDuration: 200,
      pathEndAnimationDuration: 100,
      lock: "-1"
    },
    pin: {
      pinLength: 4,
      textColor: "#E6E6E6",
      textSize: 16,
      buttonSize: 72,
      verticalSpacing: 24,
      horizontalSpacing: 36,
      buttonBackgroundDrawable: undefined,
      deleteButtonDrawable: undefined,
      deleteButtonSize: 16,
      showDeleteButton: false,
      deleteButtonPressedColor: "#C8C8C8",
      dotEmptyBackground: "",
      dotFilledBackground: "",
      dotDiameter: 12,
      dotSpacing: 16,
      indicatorType: "fillWithAnimation",
      lock: "-1"
    }
  };

  _onChange = event => {
    if (event.nativeEvent.eventType === "started") {
      this.props.onStarted && this.props.onStarted();
    } else if (event.nativeEvent.eventType === "progress") {
      this.props.onProgress && this.props.onProgress(event.nativeEvent.pattern);
    } else if (event.nativeEvent.eventType === "completed") {
      this.props.onCompeted && this.props.onCompeted(event.nativeEvent.pattern);
    } else if (event.nativeEvent.eventType === "cleared") {
      this.props.onCleared && this.props.onCleared();
    } else if (event.nativeEvent.eventType === "empty") {
      this.props.onEmpty && this.props.onEmpty();
    } else if (event.nativeEvent.eventType === "change") {
      this.props.onChange && this.props.onChange(event.nativeEvent.pattern);
    }

    console.log(
      "Event: " +
        event.nativeEvent.eventType +
        ", Pattern: " +
        event.nativeEvent.pattern
    );
  };

  render() {
    let patternProps = Object.assign(
      {},
      RNLockScreen.defaultProps.pattern,
      this.props.pattern
    );
    let pinProps = Object.assign(
      {},
      RNLockScreen.defaultProps.pin,
      this.props.pin
    );

    return (
      <LockScreen
        style={[style.container, this.props.style]}
        props={{
          type: this.props.type,
          width: this.props.width,
          height: this.props.height,
          pattern: patternProps,
          pin: pinProps
        }}
        onChange={this._onChange}
      />
    );
  }
}

const LockScreen = requireNativeComponent("RNLockScreen", RNLockScreen, {
  nativeOnly: { onChange: true }
});


const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303030"
  }
});

export default RNLockScreen;
