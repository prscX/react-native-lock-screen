
import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import { HeaderFragment } from './HeaderFragment'
import { PinFragment } from './PinFragment'
import { PatternFragment } from "./PatternFragment";

import style from './RNLockScreen.style'

class RNLockScreen extends Component {
  static Mode = {
    Capture: 0,
    Verify: 1
  }

  static Type = {
    Pin: 0,
    Pattern: 1
  }

  static propTypes = {
    lock: PropTypes.number,
    mode: PropTypes.number,
    type: PropTypes.number,
    backgroundImage: PropTypes.number,
    headerFragmentColor: PropTypes.string,
    lockFragmentColor: PropTypes.string,
    defaultState: PropTypes.object,
    reenterState: PropTypes.object,
    successState: PropTypes.object,
    errorState: PropTypes.object
  }

  static defaultProps = {
    primaryLock: -1,
    lock: -1,
    type: 0,
    mode: 0
  }

  constructor (props) {
    super(props)

    this.state = {
      lock: RNLockScreen.defaultProps.lock,
      state: HeaderFragment.State.Default
    }
  }

  _renderHeaderFragment() {
    let dots = 0
    if (this.state.lock !== RNLockScreen.defaultProps.lock) {
      dots = this.state.lock.toString().length;      
    }

    return <HeaderFragment
      style={[style.headerContainer]}
      dots={dots}
      state={this.state.state}
      backgroundColor={this.props.headerFragmentColor}
      defaultState={this.props.defaultState}
      reenterState={this.props.reenterState}
      successState={this.props.successState}
      errorState={this.props.errorState}
    />;
  }

  _renderSeparator () {
    if (this.props.renderSeparator) return this.props.renderSeparator()

    return <View/>
  }

  _onAdd = (pin) => {
    let lock = this.state.lock
    if (lock === RNLockScreen.defaultProps.lock) {
      lock = 0
    }

    this.setState({
      lock: parseInt('' + lock + pin)
    })
  }

  _onRemove = () => {
    let lock = this.state.lock;
    if (lock === RNLockScreen.defaultProps.lock) {
      lock = 0;
    }

    lock = lock.toString()

    this.setState({ lock: lock.substring(0, lock.length - 1) });
  }

  _onDone = (pin) => {
    let lock
    if (this.state.lock === -1 && pin !== -1) {
      lock = pin
    } else {
      lock = this.state.lock
    }

    if (this.props.mode === RNLockScreen.Mode.Capture) {
      this._onCapture(lock)
    } else if (this.props.mode === RNLockScreen.Mode.Verify) {
      this._onVerify(lock)
    }
  }

  _onCapture = (lock) => {
    if (this.state.state === HeaderFragment.State.Default) {
      this.setState({
        primaryLock: lock,
        lock: RNLockScreen.defaultProps.lock,
        state: HeaderFragment.State.Reenter
      });
    } else if (this.state.state === HeaderFragment.State.Reenter || this.state.state === HeaderFragment.State.Error) {
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
  }

  _onVerify = (lock) => {
    if (this.props.onVerify) {
      let verified = this.props.onVerify(lock)
      if (verified) {
        this.setState({
          state: HeaderFragment.State.Success
        })
      } else {
       this.setState({
          state: HeaderFragment.State.Error
        })
      }
    }
  }

  _renderLockFragment() {
    let styles = [style.lockContainer];
    if (this.props.lockFragmentColor) {
      styles.push({ backgroundColor: this.props.lockFragmentColor });
    }
    
    if (this.props.type === RNLockScreen.Type.Pin) {
      return <View style={styles}>
          <PinFragment
            onAdd={this._onAdd}
            onRemove={this._onRemove}
            onDone={this._onDone}
            backgroundColor={this.props.lockFragmentColor}
          />
        </View>;
    } else if (this.props.type === RNLockScreen.Type.Pattern) {
      return <View style={styles}>
          <PatternFragment
            onAdd={this._onAdd}
            onRemove={this._onRemove}
            onDone={this._onDone}
            backgroundColor={this.props.lockFragmentColor}
            clear={this.state.state === HeaderFragment.State.Default ? false : true }
            lock={this.state.state === HeaderFragment.State.Default ? -1 : this.state.primaryLock}
          />
        </View>;
    }
  }

  render() {
    return <View style={[style.container]}>
        {this._renderHeaderFragment()}
        {this._renderLockFragment()}
      </View>;
  }
}

RNLockScreen.propTypes = {
  ...ViewPropTypes,

  title: PropTypes.string
};

RNLockScreen.defaultProps = {
    title: 'Enter a passcode'
}


export { RNLockScreen }