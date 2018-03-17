
import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import OnLayout from 'react-native-on-layout'

import { HeaderFragment } from './HeaderFragment'
import { PinFragment } from './PinFragment'

import { RNLock } from './RNLock'

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
      lock: RNLockScreen.defaultProps.lock
    }
  }

  _renderHeaderFragment() {
    let dots = 0
    if (this.state.lock !== -1) {
      dots = this.state.lock.toString().length
    }

    return <HeaderFragment style={style.headerContainer} dots={dots} />;
  }

  _renderSeparator () {
    if (this.props.renderSeparator) return this.props.renderSeparator()

    return <View/>
  }

  _onPress = (pin) => {
    let lock = this.state.lock
    if (lock === RNLockScreen.defaultProps.lock) {
      lock = 0
    }

    this.setState({
      lock: parseInt('' + lock + pin)
    })
  }

  _renderLockFragment() {
    return <View style={style.lockContainer}>
        <PinFragment onPress={this._onPress} />
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