import React, { Component } from 'react'
import { StyleSheet, View, Animated, Easing } from 'react-native'
import { colors } from '../theme'
const message = 'TRAINING MODEL...'
export default class TrainingText extends Component {
  animatedValues = []
  constructor(props) {
    super(props)
    let animations = []

    for (let i = 0; i < message.length; i++) {
      this.animatedValues.push(new Animated.Value(0))
      animations.push(this.animateSin(this.animatedValues[i], i))
    }

    // start the animation
    Animated.stagger(200, animations).start()
  }

  animateSin = (val, index) => {
    const duration = 1200
    // up n down
    return Animated.loop(
      Animated.timing(val, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true
      })
    )
  }

  render() {
    return (
      <View style={styles.trainingTextContainer}>
        {this.animatedValues.map((val, index) => {
          return (
            <Animated.Text
              key={`letter${index}`}
              style={[
                styles.letter,
                {
                  transform: [
                    {
                      translateY: this.animatedValues[index].interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0, 10, 0]
                      })
                    }
                  ]
                }
              ]}
            >
              {message[index]}
            </Animated.Text>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  trainingTextContainer: {
    flexDirection: 'row'
  },
  letter: {
    fontSize: 16,
    fontFamily: 'Courier-BoldOblique',
    marginTop: -5,
    color: colors.background
  }
})
