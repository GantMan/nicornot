import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ScrollView
} from 'react-native'
import { SocialButton } from '../components/social-button'
import { colors } from '../theme'
import fetchModel from '../lib/fetchModel'
import Accordion from 'react-native-collapsible/Accordion'
const logo = require('../images/NicOrNot.png')

export default class App extends Component {
  state = {
    statusMessage: '',
    activeSections: [0],
    modelURL: '',
    modelString: ''
  }

  async componentDidMount() {
    // Are we working with a stored model?
    const modelURL = (await AsyncStorage.getItem('xURL')) || this.state.modelURL
    const modelString =
      (await AsyncStorage.getItem('xString')) || this.state.modelString
    this.setState({ modelURL, modelString })
  }

  renderHeader = section => {
    return <Text style={styles.header}>{section}</Text>
  }

  setModel = async () => {
    const xURL = this.state.modelURL
    const xString = this.state.modelString

    if (xURL && xString) {
      this.setState({
        statusMessage: 'Fetching and Compiling'
      })
      try {
        downloadedModel = await fetchModel(xURL)
        await AsyncStorage.setItem('xURL', xURL)
        await AsyncStorage.setItem('xModel', downloadedModel)
        await AsyncStorage.setItem('xString', xString)
        this.setState({ statusMessage: 'Done ✅' })
      } catch (e) {
        this.setState({ statusMessage: 'Failed' })
      }
    } else {
      this.setState({
        statusMessage: 'Missing info'
      })
    }
  }

  resetNic = () => {
    this.setState({
      modelURL: '',
      modelString: '',
      statusMessage: 'Reset to Nic'
    })
    AsyncStorage.removeItem('xURL')
    AsyncStorage.removeItem('xModel')
    AsyncStorage.removeItem('xString')
  }

  setNewURL = value => this.setState({ modelURL: value })

  setNewModelString = value => this.setState({ modelString: value })

  renderSettings = () => (
    <View>
      <Text style={styles.paragraph}>Use your own CoreML model on faces.</Text>
      <TextInput
        style={styles.inputModel}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={this.setNewURL}
        value={this.state.modelURL}
        placeholder="Full URL to your CoreML model"
      />
      <TextInput
        style={styles.inputModel}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={this.setNewModelString}
        value={this.state.modelString}
        placeholder="Class string to match"
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.pressy}
          onPress={async () => await this.setModel()}
        >
          <Text style={styles.paragraph}>Fetch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reset} onPress={this.resetNic}>
          <Text style={styles.paragraph}>Reset to Nic</Text>
        </TouchableOpacity>
        <Text style={styles.status}>{this.state.statusMessage}</Text>
      </View>
    </View>
  )

  renderAboutApp = () => (
    <View>
      <Text style={styles.paragraph}>
        Ridiculous? <Text style={styles.link}>Yes!</Text> However, it's a fun
        adventure into the modern capabilities of Machine Learning. The story of
        this app, and all its code are available for free.
      </Text>
      <Text style={styles.paragraph}>
        This app coded by Gant Laborde and help from Frank von Hoven and Ray
        Deck.
      </Text>
    </View>
  )

  renderAboutUs = () => (
    <View>
      <Text style={[styles.us, { color: colors.ir }]}>
        We are Infinite Red.
      </Text>
      <Text style={styles.paragraph}>
        We solve deeply complicated tasks in a way that make problems
        approachable and fun. If you want to write mobile apps and cool
        websites, we provide consulting and training.
      </Text>

      <View style={styles.social}>
        <SocialButton preset="website" link={'https://infinite.red'} />
        <SocialButton
          preset="twitter"
          link={'https://twitter.com/infinite_red'}
        />
        <SocialButton preset="github" link={'https://github.com/infinitered'} />
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
    </View>
  )

  renderContent = section => {
    if (section === 'Settings') {
      return this.renderSettings()
    } else if (section === 'About this App') {
      return this.renderAboutApp()
    } else if (section === 'About Us') {
      return this.renderAboutUs()
    }
  }

  updateSections = activeSections => this.setState({ activeSections })

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.settingsContainer}
        contentContainerStyle={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Accordion
            activeSections={this.state.activeSections}
            sections={['Settings', 'About this App', 'About Us']}
            touchableComponent={TouchableOpacity}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            onChange={this.updateSections}
          />
        </SafeAreaView>
      </ScrollView>
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
  settingsContainer: {
    backgroundColor: colors.dark
  },
  logo: {
    height: 150,
    resizeMode: 'contain'
  },
  link: {
    color: colors.accent,
    fontWeight: 'bold'
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
  status: {
    color: colors.accent,
    fontSize: 15,
    padding: 5,
    paddingTop: 15
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
    backgroundColor: colors.accent,
    margin: 5
  },
  reset: {
    backgroundColor: colors.ir,
    margin: 5
  },
  buttonRow: {
    flexDirection: 'row'
  }
})
