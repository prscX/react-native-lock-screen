import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View, Platform, Dimensions } from "react-native";
import PropTypes from "prop-types";

import OnLayout from "react-native-on-layout";

import { requireNativeComponent } from "react-native";

import style from "./PatternFragment.style";

class PatternFragment extends Component {
  static propTypes = {
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    onDone: PropTypes.func,

    backgroundColor: PropTypes.string,

    dotCount: PropTypes.number,
    dotNormalSize: PropTypes.number,
    dotSelectedSize: PropTypes.number,
    pathWidth: PropTypes.number,
    aspectRatioEnabled: PropTypes.bool,
    aspectRatio: PropTypes.string,
    normalStateColor: PropTypes.string,
    correctStateColor: PropTypes.string,
    wrongStateColor: PropTypes.string,
    dotAnimationDuration: PropTypes.number,
    pathEndAnimationDuration: PropTypes.number,

    props: PropTypes.object,
    testID: PropTypes.string,
    importantForAccessibility: PropTypes.string,
    renderToHardwareTextureAndroid: PropTypes.bool,
    accessibilityLabel: PropTypes.string,
    onLayout: PropTypes.bool,
    accessibilityLiveRegion: PropTypes.string,
    accessibilityComponentType: PropTypes.string,
    nativeID: PropTypes.string,

    lock: PropTypes.string,
    clear: PropTypes.bool
  };

  static defaultProps = {
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
    lock: '',
    clear: false
  };

  _onChange = event => {
    if (event.nativeEvent.eventType === "progress") {	
      // let pattern = ''
      // event.nativeEvent.pattern && (pattern = event.nativeEvent.pattern.slice(-1))

      // this.props.onAdd && this.props.onAdd(pattern);	
    } else if (event.nativeEvent.eventType === "completed") {
      this.props.onDone && this.props.onDone(event.nativeEvent.pattern);
    } else if (event.nativeEvent.eventType === "cleared") {	
      this.props.onCleared && this.props.onCleared();	
    }	
	
    console.log(	
      "Event: " +	
        event.nativeEvent.eventType +	
        ", Pattern: " +	
        event.nativeEvent.pattern	
    );	
  };

  _renderPattern() {
    if (this.props.renderPattern) return this.props.renderPattern()

    return (
      <OnLayout style={{ flex: 1 }}>
        {({ width, height}) => {
          if (width == 0 && height == 0) {
            return null
          } else {
            return <LockScreen
              style={{ height: height, width: width }}
              props={{
                  width: width,
                  height: height,
                  dotCount: this.props.dotCount,
                  dotNormalSize: this.props.dotNormalSize,
                  dotSelectedSize: this.props.dotSelectedSize,
                  pathWidth: this.props.pathWidth,
                  aspectRatioEnabled: this.props.aspectRatioEnabled,
                  aspectRatio: this.props.aspectRatio,
                  normalStateColor: this.props.normalStateColor,
                  correctStateColor: this.props.correctStateColor,
                  wrongStateColor: this.props.wrongStateColor,
                  dotAnimationDuration: this.props.dotAnimationDuration,
                  pathEndAnimationDuration: this.props.pathEndAnimationDuration,
                  lock: this.props.lock,
                  clear: this.props.clear
              }}
              onChange={this._onChange}
            />
          }
        }}
      </OnLayout>
    );
  }

  render() {
    return <View style={[style.container, this.props.style]}>
      {this._renderPattern()}
    </View>;
  }
}
	
const LockScreen = requireNativeComponent("RNLockScreen", PatternFragment, {	
  nativeOnly: { onChange: true }	
});

export { PatternFragment };
