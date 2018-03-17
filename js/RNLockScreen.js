
import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import { HeaderFragment } from './HeaderFragment'
import { PinFragment } from './PinFragment'

import style from './RNLockScreen.style'

class RNLockScreen extends Component {
  static propTypes = {
    lock: PropTypes.number
  }

  static defaultProps = {
    lock: -1
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

    return <HeaderFragment style={style.headerContainer} dots={dots} state={this.state.state} />;
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
    this.setState({
      state: 2
    });
  }

  _renderLockFragment() {
    return <View style={style.lockContainer}>
        <PinFragment onAdd={this._onAdd} onRemove={this._onRemove} onDone={this._onDone} />
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