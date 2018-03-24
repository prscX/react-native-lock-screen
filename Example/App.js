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
  TouchableOpacity,
  StatusBar
} from 'react-native';

import { RNLockScreen } from 'react-native-lock-screen'

type Props = {};
export default class App extends Component<Props> {
  _onPress () {
    RNLockScreen.Show()
  }

  render() {
    return <View style={styles.container}>
        <StatusBar
          backgroundColor={'#4a8df3'}
          barStyle={"light-content"}
        />
        <RNLockScreen type={0} mode={0} onCapture={lock => {
            console.log("lock: " + lock);
          }}
          lock={'123'}
        />
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
