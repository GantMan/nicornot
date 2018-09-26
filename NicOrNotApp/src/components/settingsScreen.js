import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { colors } from '../theme'

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.header}>About this App</Text>
          <Text style={styles.paragraph}>
            Ridiculous? Yes. However, it's a fun adventure into the modern
            capabilities of Machine Learning. Why this app exists, and all its
            code are available for free.
          </Text>
          <Text style={[styles.us, { color: colors.ir }]}>
            We are Infinite Red.
          </Text>
          <Text style={styles.paragraph}>
            We solve deeply complicated tasks in a way that makes them
            approachable and fun. Want to write mobile apps and cool websites?
            We provide consulting and training.
          </Text>
          <View style={styles.social}>
            <Text style={styles.socialItem}>Twitter</Text>
            <Text style={styles.socialItem}>Medium</Text>
          </View>
          <Text style={styles.paragraph}>
            Specifically coded by Gant Laborde and help from Frank von Hoven and
            Ray Deck.
          </Text>

          <Text style={styles.header}>Settings</Text>
          <Text style={styles.paragraph}>
            Use your own CoreML model on faces:
          </Text>
          <TextInput
            style={styles.inputModel}
            placeholder="Full URL to your CoreML model"
          />
          <TouchableOpacity>
            <Text>Train Model Again</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
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
  social: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  socialItem: {
    color: colors.accent
  },
  us: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.ir,
    textAlign: 'center'
  },
  paragraph: {
    color: colors.light,
    fontSize: 16,
    padding: 10
  },
  inputModel: {
    backgroundColor: colors.light,
    height: 40,
    padding: 10,
    margin: 10
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.light,
    margin: 10,
    paddingTop: 30
  }
})
