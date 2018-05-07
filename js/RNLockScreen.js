
import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View, Text, Image, ImageBackground } from "react-native";
import PropTypes from "prop-types";

import SvgUri from "react-native-svg-uri";

import { HeaderFragment } from './HeaderFragment'
import { PinFragment } from './PinFragment'
import { PatternFragment } from "./PatternFragment";

import style from './RNLockScreen.style'

let watermark = require("../assets/watermark.svg");

class RNLockScreen extends Component {
  static Mode = {
    Capture: 0,
    Verify: 1
  };

  static Type = {
    Pin: 0,
    Pattern: 1
  };

  static propTypes = {
    ...ViewPropTypes,

    mode: PropTypes.number,
    type: PropTypes.number,
    lock: PropTypes.string,
    backgroundImage: PropTypes.number,
    defaultState: PropTypes.object,
    reenterState: PropTypes.object,
    successState: PropTypes.object,
    errorState: PropTypes.object,

    patternProps: PropTypes.object,
    pinProps: PropTypes.object,

    renderHeaderFragment: PropTypes.func,
    renderSeparator: PropTypes.func,
    renderLockFragment: PropTypes.func,

    headerFragmentProps: PropTypes.object,
    lockFragmentProps: PropTypes.object,

    confirmPin: PropTypes.object,
    deletePin: PropTypes.object
  };

  static defaultProps = {
    type: 0,
    mode: 0,
    lock: ""
  };

  constructor(props) {
    super(props);

    this.state = {
      lock: RNLockScreen.defaultProps.lock,
      state: HeaderFragment.State.Default
    };
  }

  _renderHeaderFragment() {
    if (this.props.renderHeaderFragment)
      return this.props.renderHeaderFragment();

    let dots = 0;
    if (this.state.lock !== RNLockScreen.defaultProps.lock) {
      dots = this.state.lock.length;
    }

    let separator, containerProps = {}
    if (this.props.backgroundImage) {
      containerProps = style.transparentContainer;
    } else {
      separator = this._renderSeparator();
    }

    return (
      <View style={{ flex: 1 }}>
        <HeaderFragment
          style={[style.headerContainer, containerProps]}
          dots={dots}
          state={this.state.state}
          defaultState={this.props.defaultState}
          reenterState={this.props.reenterState}
          successState={this.props.successState}
          errorState={this.props.errorState}
          {...this.props.headerFragmentProps}
        />
        {separator}
      </View>
    );
  }

  _renderSeparator() {
    if (this.props.renderSeparator) return this.props.renderSeparator();

    return (
      <View style={[style.separatorContainer]}>
        <SvgUri width={1200} height={51} source={watermark} />
      </View>
    );
  }

  _onAdd = pin => {
    let lock = this.state.lock;
    this.setState({
      lock: lock.concat(pin)
    });
  };

  _onRemove = () => {
    let lock = this.state.lock;
    if (lock.length > 0) {
      this.setState({ lock: lock.substr(0, lock.length - 1) });
    }
  };

  _onDone = pin => {
    let lock = this.state.lock;
    if (pin !== undefined && pin !== RNLockScreen.defaultProps.lock) {
      lock = pin;
    }

    if (this.props.mode === RNLockScreen.Mode.Capture) {
      this._onCapture(lock);
    } else if (this.props.mode === RNLockScreen.Mode.Verify) {
      this._onVerify(lock);
    }
  };

  _onCapture = lock => {
    if (this.state.state === HeaderFragment.State.Default) {
      this.setState({
        primaryLock: lock,
        lock: RNLockScreen.defaultProps.lock,
        state: HeaderFragment.State.Reenter
      });
    } else if (
      this.state.state === HeaderFragment.State.Reenter ||
      this.state.state === HeaderFragment.State.Error ||
      this.state.state === HeaderFragment.State.Success
    ) {
      if (this.state.primaryLock === lock) {
        this.setState({
          state: HeaderFragment.State.Success
        });

        this.props.onCapture && this.props.onCapture(lock);
      } else {
        if (this.props.type === RNLockScreen.Type.Pattern) {
          this.setState({
            state: HeaderFragment.State.Error,
            lock: RNLockScreen.defaultProps.lock
          });
        } else if (this.props.type === RNLockScreen.Type.Pin) {
          this.setState({
            state: HeaderFragment.State.Error
          });
        }
      }
    }
  };

  _onVerify = lock => {
    let verified
    if (this.props.lock === lock) {
      verified = true
    } else {
      verified = false
    }

    if (verified) {
      this.setState({
        state: HeaderFragment.State.Success
      });

      this.props.onVerified && this.props.onVerified()
    } else {
      this.setState({
        state: HeaderFragment.State.Error
      });
    }
  };

  _renderLockFragment() {
    if (this.props.renderLockFragment) return this.props.renderLockFragment();

    let containerProps = {}
    if (this.props.backgroundImage) {
      containerProps = style.transparentContainer;
    }

    if (this.props.type === RNLockScreen.Type.Pin) {
      return (
          <PinFragment
            confirmPin={this.props.confirmPin}
            deletePin={this.props.deletePin}
            onAdd={this._onAdd}
            onRemove={this._onRemove}
            onDone={this._onDone}
            style={containerProps}
            {...this.props.lockFragmentProps}
          />
      );
    } else if (this.props.type === RNLockScreen.Type.Pattern) {
      let lock

      if (this.state.state === HeaderFragment.State.Default) {
        if (this.props.mode === RNLockScreen.Mode.Verify) {
          lock = this.props.lock
        } else if (this.props.mode === RNLockScreen.Mode.Capture) {
          lock = this.state.primaryLock
        }
      } else {
        if (this.props.mode === RNLockScreen.Mode.Verify) {
          lock = this.props.lock;
        } else if (this.props.mode === RNLockScreen.Mode.Capture) {
          lock = this.state.primaryLock;
        }
      }

      return (
          <PatternFragment
            onAdd={this._onAdd}
            onRemove={this._onRemove}
            onDone={this._onDone}
            clear={
              this.state.state === HeaderFragment.State.Default ? false : true
            }
            lock={lock}
            style={containerProps}
            {...this.props.lockFragmentProps}
          />
      );
    }
  }

  render() {
    if (this.props.backgroundImage) {
      return <ImageBackground
          source={this.props.backgroundImage}
          style={[style.container]}
          width={1000}
          height={1000}
        >
          {this._renderHeaderFragment()}
          {this._renderLockFragment()}
        </ImageBackground>
    } else {
      return <View style={[style.container]}>
          {this._renderHeaderFragment()}
          {this._renderLockFragment()}
        </View>;
    }
  }
}

export { RNLockScreen }