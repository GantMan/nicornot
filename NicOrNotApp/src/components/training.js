import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Modal
} from 'react-native'

const dark = '#222'
const background = '#4576b9'
const light = '#fff'
const scale = 100
const duration = 1000
const delayGap = 700
const notNicImages = [
  require('../images/headshots/not1.png'),
  require('../images/headshots/not2.png'),
  require('../images/headshots/not3.png'),
  require('../images/headshots/not4.png'),
  require('../images/headshots/not5.png'),
  require('../images/headshots/not6.png'),
  require('../images/headshots/not7.png'),
  require('../images/headshots/not8.png'),
  require('../images/headshots/not9.png'),
  require('../images/headshots/not10.png'),
  require('../images/headshots/not11.png'),
  require('../images/headshots/not12.png'),
  require('../images/headshots/not13.png'),
  require('../images/headshots/not14.png'),
  require('../images/headshots/not15.png'),
]

export default class App extends Component {
  state = {
    correctCount: 0,
    currentMessage: ''
  }
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

  // Frustrating rewrite of simple array shuffle
  // oh JavaScript, when will you give us the basics
  shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      // this semicolon is essential!?!?!?!?!
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  // 3 random pics and 1 nic
  nicPics = () => {
    let pics = []
    while(pics.length < 3){
        const rando = Math.floor(Math.random()*15)
        if(pics.indexOf(rando) > -1) continue
        pics[pics.length] = rando
    }

    return this.shuffleArray([
      notNicImages[pics[0]],
      notNicImages[pics[1]],
      notNicImages[pics[2]],
      require('../images/headshots/nic.png')
    ])
  }

  renderOrbs = () => {
    const imageSource = this.nicPics()
    return (
      <View style={styles.midContainer}>
        <View>
          <Animated.View style={[styles.orb, {
            opacity: this.animatedValuesIn[0],
            transform: [
              {scaleX: this.animatedValuesIn[0]},
              // {rotate: spin}
            ]
          }]}>
            <Image style={styles.headshot} source={imageSource[0]} />
          </Animated.View>
          <Animated.View style={[styles.orb, {
            opacity: this.animatedValuesIn[2],
            transform: [
              {scaleX: this.animatedValuesIn[2]}
            ]
          }]}>
            <Image style={styles.headshot} source={imageSource[2]} />
          </Animated.View>
        </View>
        <View>
          <Animated.View style={[styles.orb, {
            opacity: this.animatedValuesIn[1],
            transform: [
              {scaleX: this.animatedValuesIn[1]}
            ]
          }]}>
            <Image style={styles.headshot} source={imageSource[1]} />
          </Animated.View>
          <Animated.View style={[styles.orb, {
            opacity: this.animatedValuesIn[3],
            transform: [
              {scaleX: this.animatedValuesIn[3]}
            ]
          }]}>
            <Image style={styles.headshot} source={imageSource[3]} />
          </Animated.View>
        </View>
      </View>
    )
  }

  renderTest = () => {
    return this.renderOrbs()
  }

  render() {
    // const spin = this.animatedValuesIn[2].interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['0deg', '360deg']
    // })
    return (
      <Modal
        animationType="fade"
        visible={this.props.active}
      >
        <View style={styles.trainingContainer}>
          <Text style={styles.regular}>
            Help us train our recognition model
          </Text>
          <Text style={styles.description}>
            Please Click on Nic
          </Text>

          {this.renderTest()}
          <View style={styles.bar}>

          </View>
        </View>
      </Modal>
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
  regular: {
    textAlign: 'center',
    fontSize: 16,
    color: light
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
