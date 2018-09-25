import React, { Component } from 'react'
import Training from './training'
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native'
import { colors } from '../theme'

const logo = require('../images/non.png')
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.camera} />
        <Image source={logo} style={styles.header} />
        <Text style={styles.cameraBlock}>Flip Camera</Text>
        <Training active={false} />
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
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: colors.background,
    color: colors.light
  }
})
