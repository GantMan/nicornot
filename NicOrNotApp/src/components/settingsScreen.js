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
import { SocialButton } from '../components/social-button'
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
          <View style={styles.social}>
            <SocialButton preset="website" link={'https://infinite.red'} />
            <SocialButton
              preset="twitter"
              link={'https://twitter.com/infinite_red'}
            />
            <SocialButton
              preset="github"
              link={'https://github.com/infinitered'}
            />
            <SocialButton preset="medium" link={'https://shift.infinite.red'} />
            <SocialButton
              preset="dribbble"
              link={'https://dribbble.com/infinitered'}
            />
            <SocialButton
              preset="instagram"
              link={'https://instagram.com/infinitered_designers'}
            />
            <SocialButton
              preset="facebook"
              link={'https://facebook.com/infiniteredinc'}
            />
          </View>
          <Text style={styles.paragraph}>
            We solve deeply complicated tasks in a way that make them
            approachable and fun. Want to write mobile apps and cool websites?
            We provide consulting and training.
          </Text>
          <Text style={styles.paragraph}>
            Specifically coded by <Text style={styles.link}>Gant Laborde </Text>
            and help from
            <Text style={styles.link}> Frank von Hoven</Text> and
            <Text style={styles.link}> Ray Deck</Text>.
          </Text>

          <Text style={styles.header}>Settings</Text>
          <Text style={styles.paragraph}>
            Use your own CoreML model on faces.
          </Text>
          <TextInput
            style={styles.inputModel}
            placeholder="Full URL to your CoreML model"
          />
          <View style={styles.social}>
            <TouchableOpacity style={styles.pressy}>
              <Text style={styles.paragraph}>Fetch and Compile</Text>
            </TouchableOpacity>
            <Text>{}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dark
  },
  link: {
    color: colors.accent
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15
  },
  socialItem: {
    color: colors.accent
  },
  us: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.ir,
    textAlign: 'center',
    marginTop: 10
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
    margin: 5
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.light,
    margin: 10,
    paddingTop: 10
  },
  pressy: {
    backgroundColor: colors.accent
  }
})
