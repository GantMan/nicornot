import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

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

            </View>
            <View style={styles.orb}>

            </View>
          </View>
          <View>
            <View style={styles.orb}>

            </View>
            <View style={styles.orb}>

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
    zIndex: 3
  },
  bar: {
    marginTop: -1.75 * scale,
    backgroundColor: background,
    height: scale,
    zIndex: 1
  }
})
