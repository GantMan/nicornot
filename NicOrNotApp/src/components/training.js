import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated
} from 'react-native'

const dark = '#222'
const background = '#4576b9'
const light = '#fff'
const scale = 100
const duration = 1000
const delayGap = 700
const image1 = require('../images/headshots/not1.png')
const image2 = require('../images/headshots/not2.png')
const image3 = require('../images/headshots/nic.png')
const image4 = require('../images/headshots/not3.png')

export default class App extends Component {
  // do not use Array(4).fill(new Animated.Value(0)), it shares the instance
  animatedValuesIn = [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]
  applySettings = val => Animated.timing(
    val,
    {
      toValue: 1,
      duration,
      useNativeDriver: true
    }
  )
  animations = this.animatedValuesIn.map(v => this.applySettings(v))

  componentDidMount () {
    Animated.stagger(delayGap, this.animations).start()
  }

  render() {
    // const spin = this.animatedValuesIn[2].interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['0deg', '360deg']
    // })
    return (
      <View style={styles.trainingContainer}>
        <Text style={styles.description}>
          Please Click on Nic
        </Text>

        <View style={styles.midContainer}>
          <View>
            <Animated.View style={[styles.orb, {
              opacity: this.animatedValuesIn[0],
              transform: [
                {scaleX: this.animatedValuesIn[0]},
                // {rotate: spin}
              ]
            }]}>
              <Image style={styles.headshot} source={image1} />
            </Animated.View>
            <Animated.View style={[styles.orb, {
              opacity: this.animatedValuesIn[2],
              transform: [
                {scaleX: this.animatedValuesIn[2]}
              ]
            }]}>
              <Image style={styles.headshot} source={image2} />
            </Animated.View>
          </View>
          <View>
            <Animated.View style={[styles.orb, {
              opacity: this.animatedValuesIn[1],
              transform: [
                {scaleX: this.animatedValuesIn[1]}
              ]
            }]}>
              <Image style={styles.headshot} source={image3} />
            </Animated.View>
            <Animated.View style={[styles.orb, {
              opacity: this.animatedValuesIn[3],
              transform: [
                {scaleX: this.animatedValuesIn[3]}
              ]
            }]}>
              <Image style={styles.headshot} source={image4} />
            </Animated.View>
          </View>

        </View>
        <View style={styles.bar}>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  trainingContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100,
    backgroundColor: dark
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
    backgroundColor: background,
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
