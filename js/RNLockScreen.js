
import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import SvgUri from "react-native-svg-uri";

import { HeaderFragment } from './HeaderFragment'
import { PinFragment } from './PinFragment'
import { PatternFragment } from "./PatternFragment";

import style from './RNLockScreen.style'

import watermark from '../assets/watermark.svg'

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

    title: PropTypes.string,
    mode: PropTypes.number,
    type: PropTypes.number,
    lock: PropTypes.string,
    backgroundImage: PropTypes.number,
    headerFragmentColor: PropTypes.string,
    lockFragmentColor: PropTypes.string,
    defaultState: PropTypes.object,
    reenterState: PropTypes.object,
    successState: PropTypes.object,
    errorState: PropTypes.object,

    patternProps: PropTypes.object,
    pinProps: PropTypes.object,

    renderHeaderFragment: PropTypes.func,
    renderSeparator: PropTypes.func,
    renderLockFragment: PropTypes.func
  };

  static defaultProps = {
    type: 0,
    mode: 0,
    lock: "",
    title: "Enter a passcode"
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

    return (
      <View style={{ flex: 1 }}>
        <HeaderFragment
          style={[style.headerContainer]}
          dots={dots}
          state={this.state.state}
          backgroundColor={this.props.headerFragmentColor}
          defaultState={this.props.defaultState}
          reenterState={this.props.reenterState}
          successState={this.props.successState}
          errorState={this.props.errorState}
        />
        {this._renderSeparator()}
      </View>
    );
  }

  _renderSeparator() {
    if (this.props.renderSeparator) return this.props.renderSeparator();

    return (
      <View style={[style.separatorContainer]}>
        <SvgUri width={1200} height={100} source={watermark} />
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
    } else {
      this.setState({
        state: HeaderFragment.State.Error
      });
    }
  };

  _renderLockFragment() {
    if (this.props.renderLockFragment) return this.props.renderLockFragment();

    let styles = [style.lockContainer];
    if (this.props.lockFragmentColor) {
      styles.push({ backgroundColor: this.props.lockFragmentColor });
    }

    if (this.props.type === RNLockScreen.Type.Pin) {
      return (
        <View style={styles}>
          <PinFragment
            onAdd={this._onAdd}
            onRemove={this._onRemove}
            onDone={this._onDone}
            backgroundColor={this.props.lockFragmentColor}
            {...this.props.pinProps}
          />
        </View>
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
        <View style={styles}>
          <PatternFragment
            onAdd={this._onAdd}
            onRemove={this._onRemove}
            onDone={this._onDone}
            backgroundColor={this.props.lockFragmentColor}
            clear={
              this.state.state === HeaderFragment.State.Default ? false : true
            }
            lock={lock}
            {...this.props.patternProps}
          />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={[style.container]}>
        {this._renderHeaderFragment()}
        {this._renderLockFragment()}
      </View>
    );
  }
}

export { RNLockScreen }