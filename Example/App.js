/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import RNLockScreen from 'react-native-lock-screen'

type Props = {};
export default class App extends Component<Props> {
  _onPress () {
    RNLockScreen.Show()
  }

  render() {
    return <View style={styles.container}>
        <RNLockScreen type={'pin'} pattern={{
          lock: '012'
        }} />
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
