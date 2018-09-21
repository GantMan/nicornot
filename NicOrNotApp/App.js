import React, { Component } from 'react'
import Training from './src/components/training'
import {
  StyleSheet,
  Text,
  View,
  Modal
} from 'react-native'


export default class App extends Component {
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit App.js
          </Text>
          <Modal
            animationType="fade"
            visible
            transparent

          >
            <Training />
          </Modal>
        </View>
    )
  }
}

const dark = '#222'
const background = '#4576b9'
const light = '#fff'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: light,
    marginBottom: 5,
  },
});
