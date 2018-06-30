
import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View, Text, Image, ImageBackground } from "react-native";
import PropTypes from "prop-types";

import { RNToasty } from 'react-native-toasty'
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
    lockLimit: PropTypes.number,
    clearLockOnError: PropTypes.bool,

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
    lockFragmentProps: PropTypes.object
  };

  static defaultProps = {
    type: 0,
    mode: 0,
    lock: "",
    lockLimit: 4,
    clearLockOnError: true
  };

  constructor(props) {
    super(props);

    this.state = {
      lock: RNLockScreen.defaultProps.lock,
      state: HeaderFragment.State.Default
    };
  }

  _renderHeaderFragment() {
    let {
      defaultState,
      reenterState,
      successState,
      errorState,
      headerFragmentProps,
      backgroundImage,
      renderHeaderFragment,
      lockLimit,
      type
    } = this.props;

    if (renderHeaderFragment) return renderHeaderFragment();

    let dots = 0;
    if (this.state.lock !== RNLockScreen.defaultProps.lock) {
      dots = this.state.lock.length;
    }
    let enableDots = type === 0 ? true : false;

    let separator, containerProps;

    if (backgroundImage) {
      containerProps = style.transparentContainer;
    } else {
      separator = this._renderSeparator();
    }

    return (
      <View style={{ flex: 1 }}>
        <HeaderFragment
          style={[style.headerContainer, containerProps]}
          enableDots={enableDots}
          dots={dots}
          dotsLimit={lockLimit}
          state={this.state.state}
          defaultState={defaultState}
          reenterState={reenterState}
          successState={successState}
          errorState={errorState}
          {...headerFragmentProps}
        />
        {separator}
      </View>
    );
  }

  _renderSeparator() {
    let { renderSeparator } = this.props;

    if (renderSeparator) return renderSeparator();

    return (
      <View style={[style.separatorContainer]}>
        <SvgUri width={1380} height={35} source={watermark} />
      </View>
    );
  }

  _onAdd = pin => {
    let { lockLimit, type } = this.props;
    let { lock, state } = this.state;

    if (lock && lock.length >= lockLimit) {
      if (type === RNLockScreen.Type.Pin)
        RNToasty.Warn({
          title: "Passcode Limit Reached"
        });

      return;
    }

    this.setState({
      lock: lock.concat(pin)
    });
  };

  _onRemove = () => {
    let lock = this.state.lock;
    if (lock.length > 0) {
      this.setState({
        lock: lock.substr(0, lock.length - 1)
      });
    }
  };

  _onDone = pin => {
    let { mode, lockLimit, type } = this.props;
    let lock = this.state.lock;

    if (
      type === RNLockScreen.Type.Pin &&
      (lock === undefined || lock.length < lockLimit)
    ) {
      RNToasty.Warn({
        title: `Please re-enter ${lockLimit} digit passcode`
      });

      return;
    }

    if (pin !== undefined && pin !== RNLockScreen.defaultProps.lock) {
      lock = pin;
    }

    if (mode === RNLockScreen.Mode.Capture) {
      this._onCapture(lock);
    } else if (mode === RNLockScreen.Mode.Verify) {
      this._onVerify(lock);
    }
  };

  _onCapture = lock => {
    let { onCapture, type, clearLockOnError } = this.props;

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

        onCapture && onCapture(lock);
      } else {
        if (type === RNLockScreen.Type.Pin)
          RNToasty.Error({
            title: "Incorrect Passcode"
          });

        if (type === RNLockScreen.Type.Pattern) {
          this.setState({
            state: HeaderFragment.State.Error,
            lock: RNLockScreen.defaultProps.lock
          });
        } else if (type === RNLockScreen.Type.Pin) {
          this.setState({
            state: HeaderFragment.State.Error
          });

          if (clearLockOnError) {
            setTimeout(() => {
              this.setState({
                lock: "",
                state: HeaderFragment.State.Reenter
              });
            }, 1000)
          }
        }
      }
    }
  };

  _onVerify = capturedLock => {
    let { lock, onVerified, type, clearLockOnError } = this.props;

    let verified;
    if (lock === capturedLock) {
      verified = true;
    } else {
      verified = false;
    }

    if (verified) {
      this.setState({
        state: HeaderFragment.State.Success
      });

      onVerified && onVerified();
    } else {
      if (type === RNLockScreen.Type.Pin)
        RNToasty.Error({
          title: "Incorrect Passcode"
        });

      this.setState({
        state: HeaderFragment.State.Error
      });

      if (clearLockOnError) {
        setTimeout(() => {
          this.setState({
            lock: "",
            state: HeaderFragment.State.Reenter
          });
        }, 1000)
      }
    }
  };

  _renderLockFragment() {
    let {
      pinProps,
      lockFragmentProps,
      mode,
      renderLockFragment,
      backgroundImage,
      type,
      lock
    } = this.props;

    if (renderLockFragment) return renderLockFragment();

    let containerProps = {};
    if (backgroundImage) {
      containerProps = style.transparentContainer;
    }

    if (type === RNLockScreen.Type.Pin) {
      return (
        <PinFragment
          onAdd={this._onAdd}
          onRemove={this._onRemove}
          onDone={this._onDone}
          style={containerProps}
          {...lockFragmentProps}
          {...pinProps}
        />
      );
    } else if (type === RNLockScreen.Type.Pattern) {
      let lock;

      if (this.state.state === HeaderFragment.State.Default) {
        if (mode === RNLockScreen.Mode.Verify) {
          lock = lock;
        } else if (mode === RNLockScreen.Mode.Capture) {
          lock = this.state.primaryLock;
        }
      } else {
        if (mode === RNLockScreen.Mode.Verify) {
          lock = lock;
        } else if (mode === RNLockScreen.Mode.Capture) {
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
          {...lockFragmentProps}
        />
      );
    }
  }

  render() {
    let { backgroundImage } = this.props;

    if (backgroundImage) {
      return (
        <ImageBackground
          source={backgroundImage}
          style={[style.container]}
          width={1000}
          height={1000}
        >
          {this._renderHeaderFragment()}
          {this._renderLockFragment()}
        </ImageBackground>
      );
    } else {
      return (
        <View style={[style.container]}>
          {this._renderHeaderFragment()}
          {this._renderLockFragment()}
        </View>
      );
    }
  }
}

export { RNLockScreen }