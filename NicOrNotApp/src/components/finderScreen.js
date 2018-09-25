import React, { Component } from 'react'
import Training from './training'
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableHighlight,
  AsyncStorage
} from 'react-native'
import { colors } from '../theme'

// Emulate a fresh machine by removing intro key
// AsyncStorage.removeItem('showIntro')

const logo = require('../images/non.png')
const flipIcon = require('../images/flip.png')
export default class App extends Component {
  state = {
    showIntro: false
  }

  async componentDidMount() {
    const storageResult = await AsyncStorage.getItem('showIntro')
    const showIntro = storageResult === null ? true : JSON.parse(storageResult)
    this.setState({ showIntro })
  }

  introDone = async () => {
    await AsyncStorage.setItem('showIntro', 'false')
    const showIntro = JSON.parse(await AsyncStorage.getItem('showIntro'))
    this.setState({ showIntro: false })
  }

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
        <Training active={this.state.showIntro} onComplete={this.introDone} />
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
