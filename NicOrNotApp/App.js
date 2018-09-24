import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import FinderScreen from './src/components/finderScreen'
import SettingsScreen from './src/components/settingsScreen'

export default createBottomTabNavigator({
  Finder: FinderScreen,
  Settings: SettingsScreen
})
