import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

const image1 = require('../images/headshots/not1.png')
const image2 = require('../images/headshots/not2.png')
const image3 = require('../images/headshots/nic.png')
const image4 = require('../images/headshots/not3.png')

export default class App extends Component {
  render() {
    return (
      <View style={styles.trainingContainer}>
        <Text style={styles.description}>
          Please Click on Nic
        </Text>

        <View style={styles.midContainer}>
          <View>
            <View style={styles.orb}>
              <Image style={styles.headshot} source={image1} />
            </View>
            <View style={styles.orb}>
              <Image style={styles.headshot} source={image2} />
            </View>
          </View>
          <View>
            <View style={styles.orb}>
              <Image style={styles.headshot} source={image3} />
            </View>
            <View style={styles.orb}>
              <Image style={styles.headshot} source={image4} />
            </View>
          </View>

        </View>
        <View style={styles.bar}>

        </View>
      </View>
    )
  }
}

const dark = '#222'
const background = '#4576b9'
const light = '#fff'
const scale = 100

const styles = StyleSheet.create({
  trainingContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100
  },
  description: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: background,
    fontFamily: "ArialRoundedMTBold"
  },
  midContainer: {
    minHeight: scale,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    zIndex: 2
  },
  orb: {
    backgroundColor: dark,
    borderWidth: 2,
    borderColor: light,
    width: scale,
    height: scale,
    borderRadius: scale/2,
    margin: scale/10,
    overflow: "hidden",
    zIndex: 3
  },
  headshot: {
    width: scale,
    height: scale
  },
  bar: {
    marginTop: -1.75 * scale,
    backgroundColor: background,
    height: scale,
    zIndex: 1
  }
})
