import React, { Component } from 'react'
import Training from './training'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { colors } from '../theme'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.welcome}>Finder Screen</Text>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.light,
    margin: 10
  }
})
