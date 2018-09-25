import React, { Component } from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import FinderScreen from './src/components/finderScreen'
import SettingsScreen from './src/components/settingsScreen'
import { colors } from './src/theme'
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
])

export default createBottomTabNavigator(
  {
    Finder: FinderScreen,
    Settings: SettingsScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let icon
        if (routeName === 'Finder') {
          icon = require('./src/images/find.png')
        } else if (routeName === 'Settings') {
          icon = require('./src/images/settings.png')
        }

        return (
          <Image source={icon} style={{ height: 40, resizeMode: 'contain' }} />
        )
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
