import React, { Component } from 'react'
import Training from './training'
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableHighlight
} from 'react-native'
import { colors } from '../theme'

const logo = require('../images/non.png')
const flipIcon = require('../images/flip.png')
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.camera} />
        <Image source={logo} style={styles.header} />
        <TouchableHighlight
          onPress={() => alert('hi')}
          underlayColor={colors.light}
          style={styles.cameraBlock}
        >
          <Image style={styles.flipIcon} source={flipIcon} />
        </TouchableHighlight>
        <Training active={true} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dark
  },
  header: {
    position: 'absolute',
    width: '80%',
    resizeMode: 'contain',
    top: -25
  },
  camera: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.dark,
    overflow: 'hidden'
  },
  cameraBlock: {
    width: '100%',
    padding: 15,
    backgroundColor: colors.background
  },
  flipIcon: {
    resizeMode: 'contain',
    height: 30
  }
})
