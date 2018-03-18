
import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import { HeaderFragment } from './HeaderFragment'
import { PinFragment } from './PinFragment'

import style from './RNLockScreen.style'

class RNLockScreen extends Component {
  static Mode = {
    Capture: 0,
    Verify: 1
  }

  static propTypes = {
    lock: PropTypes.number,
    mode: PropTypes.number,
    backgroundImage: PropTypes.number,
    headerFragmentColor: PropTypes.string,
    lockFragmentColor: PropTypes.string,
    defaultState: PropTypes.object,
    reenterState: PropTypes.object,
    successState: PropTypes.object,
    errorState: PropTypes.object
  }

  static defaultProps = {
    lock: -1,
    mode: 0
  }

  constructor (props) {
    super(props)

    this.state = {
      lock: RNLockScreen.defaultProps.lock,
      state: 0
    }
  }

  _renderHeaderFragment() {
    let dots = 0
    if (this.state.lock !== -1) {
      dots = this.state.lock.toString().length
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

  _onDone = () => {
    if (this.props.mode === RNLockScreen.Mode.Capture) {
      this._onCapture()
    } else if (this.props.mode === RNLockScreen.Mode.Verify) {
      this._onVerify()
    }
  }

  _onCapture = () => {
    this.props.onCapture && this.props.onCapture(this.state.lock)
  }

  _onVerify = () => {
    if (this.props.onVerify) {
      let verified = this.props.onVerify(this.state.lock)
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
    
    return <View style={styles}>
        <PinFragment
          onAdd={this._onAdd}
          onRemove={this._onRemove}
          onDone={this._onDone}
          backgroundColor={this.props.lockFragmentColor}
        />
      </View>;
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