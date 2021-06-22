/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import {RNLockScreen} from 'react-native-lock-screen';

import wallpaper from './assets/wallpaper.jpg';

type Props = {};
export default class App extends Component<Props> {
  _onPress() {
    RNLockScreen.Show();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#4a8df3'} barStyle={'light-content'} />
        <RNLockScreen
          type={1}
          mode={0}
          onCapture={lock => {
            console.log('lock: ' + lock);
          }}
          onVerified={() => {
            console.log('lock verified');
          }}
          // headerFragmentProps={{
          //   backgroundColor: '#2777ae'
          // }}
          lock={'1234'}
          // lockLimit={6}
          // backgroundImage={wallpaper}
          // lockFragmentProps={{
          //   style: {
          //     backgroundColor: '#000'
          //   }
          // }}
          // pinProps={{
          //   confirmPin:{
          //     title: 'Confirm',
          //     style: {
          //       color: '#006400'
          //     }
          //   },
          //   // deletePin:{
          //   //   title: 'Delete',
          //   //   style: {
          //   //     color: '#006400'
          //   //   }
          //   // },
          //   rippleProps:{
          //     rippleColor: '#8b0000'
          //   },
          //   containerStyle:{
          //     backgroundColor: 'transparent'
          //   },
          //   textStyle:{
          //     color: '#000'
          //   },
          //   suggestionStyle: {
          //     color: '#989889'
          //   },
          //   alphabetPinSuggestion: true
          // }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
