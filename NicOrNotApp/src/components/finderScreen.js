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
import { RNVCameraView, FacesProvider, Faces } from 'react-native-vision'
import { Identifier } from 'react-native-identifier'

// Emulate a fresh device by removing showIntro key
// AsyncStorage.removeItem('showIntro')

const logo = require('../images/non.png')
const flipIcon = require('../images/flip.png')
export default class App extends Component {
  state = {
    showIntro: false,
    classifier: null,
    successFace: 'nic',
    modelPath: '',
    cameraFront: false
  }

  async componentDidMount() {
    const storageResult = await AsyncStorage.getItem('showIntro')
    const showIntro = storageResult === null ? true : JSON.parse(storageResult)
    this.setState({ showIntro })
  }

  introDone = async () => {
    await AsyncStorage.setItem('showIntro', 'false')
    this.setState({ showIntro: false })
  }

  flipCam = () => {
    this.setState((pState) => ({cameraFront: !pState.cameraFront}))
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FacesProvider
          isCameraFront={this.state.cameraFront}
          classifier={this.state.classifier}
        />
        <RNVCameraView gravity="fill" style={styles.camera}>
          <Image source={logo} style={styles.header} />
          <Faces>
            {({ face, style, faceConfidence, key }) => {
              return (
                <Identifier
                  key={key}
                  style={style}
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
        <FacesProvider />
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
    height: 30
  }
})
