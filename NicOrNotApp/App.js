import { createBottomTabNavigator } from 'react-navigation'
import FinderScreen from './src/components/finderScreen'
import SettingsScreen from './src/components/settingsScreen'
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
])

export default createBottomTabNavigator({
  Finder: FinderScreen,
  Settings: SettingsScreen
})
