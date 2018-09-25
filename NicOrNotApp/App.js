import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import FinderScreen from './src/components/finderScreen'
import SettingsScreen from './src/components/settingsScreen'
import { colors } from './src/theme'
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
])

const sharedStyles = {}
export default createBottomTabNavigator(
  {
    Finder: FinderScreen,
    Settings: SettingsScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        const opacity = focused ? 1 : 0.5
        if (routeName === 'Finder') {
          return (
            <Image
              source={require('./src/images/find.png')}
              style={[styles.tabButton, { opacity }]}
            />
          )
        } else {
          return (
            <Image
              source={require('./src/images/settings.png')}
              style={[styles.tabButton, { opacity }]}
            />
          )
        }
      }
    }),
    tabBarOptions: {
      style: {
        backgroundColor: colors.background
      },
      showLabel: false
    }
  }
)

const styles = StyleSheet.create({
  tabButton: {
    height: 40,
    resizeMode: 'contain'
  }
})
