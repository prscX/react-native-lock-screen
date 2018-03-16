
import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import OnLayout from 'react-native-on-layout'

import { Header } from './header'
import { RNLock } from './RNLock'

class RNLockScreen extends Component {
  _renderHeader() {
    return (
      <Header></Header>
    );
  }

  _renderSeparator () {
    if (this.props.renderSeparator) return this.props.renderSeparator()

    return <View/>
  }

  _renderLock() {
    return (
      <View style={style.bodyContainer}>
        {/* <OnLayout style={style.container}>
          {({ width, height }) => ( */}
             {/* <RNLock type={"pin"} width={width} height={height} /> */}
          {/* )} */}
        {/* </OnLayout> */}
      </View>
    );
  }

  render() {
    return (
      <View style={[style.container]}>
        {this._renderHeader()}
        {/* {this._renderLock()} */}
      </View>
    );
  }
}

RNLockScreen.propTypes = {
  ...ViewPropTypes,

  title: PropTypes.string
};

RNLockScreen.defaultProps = {
    title: 'Enter a passcode'
}

const style = StyleSheet.create({
  container: {
    flex: 1
  }
})

export { RNLockScreen }