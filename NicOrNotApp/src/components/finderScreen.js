import React, { Component } from 'react'
import RNFS from 'react-native-fs'
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
import { RNVCameraView, FacesProvider, Faces } from 'react-native-vision'
import { Identifier } from 'react-native-identifier'

// Emulate a fresh device by removing showIntro key
// AsyncStorage.removeItem('showIntro')

const nudge = -10
const logo = require('../images/non.png')
const flipIcon = require('../images/flip.png')
const defaultName = 'nic'
const defaultModelPath = RNFS.MainBundlePath + '/MegaNic50_linear_5.mlmodelc'
export default class App extends Component {
  state = {
    showIntro: false,
    classifier: defaultModelPath,
    successFace: defaultName,
    cameraFront: false
  }

  gotFocus = async () => {
    // pull from device storage
    const classifier =
      (await AsyncStorage.getItem('xModel')) || defaultModelPath
    const successFace = (await AsyncStorage.getItem('xString')) || defaultName
    const storageResult = await AsyncStorage.getItem('showIntro')
    const showIntro = storageResult === null ? true : JSON.parse(storageResult)
    this.setState({ showIntro, classifier, successFace })
  }

  lostFocus = async () => {
    // Possibly disable camera when not in use
  }

  componentDidMount() {
    // Let's make some events
    this.getFocusListener = this.props.navigation.addListener(
      'didFocus',
      this.gotFocus
    )
    this.loseFocusListener = this.props.navigation.addListener(
      'didBlur',
      this.lostFocus
    )
  }

  componentWillUnmount() {
    this.getFocusListener.remove()
    this.loseFocusListener.remove()
  }

  introDone = async () => {
    await AsyncStorage.setItem('showIntro', 'false')
    this.setState({ showIntro: false })
  }

  flipCam = () => {
    this.setState(pState => ({ cameraFront: !pState.cameraFront }))
  }

  render() {
    return (
      <FacesProvider
        isCameraFront={this.state.cameraFront}
        classifier={this.state.classifier}
      >
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <RNVCameraView gravity="fill" style={styles.camera}>
            <Image source={logo} style={styles.header} />
            <Faces>
              {({ face, style, faceConfidence, key }) => {
                return (
                  <Identifier
                    key={key}
                    style={{ ...style, marginTop: nudge }}
                    horizontal
                    accuracy={
                      face === this.state.successFace ? faceConfidence : 0
                    }
                  />
                )
              }}
            </Faces>
            <TouchableHighlight
              onPress={this.flipCam}
              underlayColor={colors.light}
              style={styles.cameraBlock}
            >
              <Image style={styles.flipIcon} source={flipIcon} />
            </TouchableHighlight>
          </RNVCameraView>
          <Training active={this.state.showIntro} onComplete={this.introDone} />
        </View>
      </FacesProvider>
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
    top: -25,
    alignSelf: 'center'
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
    height: 30,
    alignSelf: 'center'
  }
})
