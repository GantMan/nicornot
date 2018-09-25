import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../theme'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Settings Screen</Text>
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
