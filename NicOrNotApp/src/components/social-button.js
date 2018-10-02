import * as React from 'react'
import { TouchableHighlight, Image, Linking } from 'react-native'

/**
 * All text will start off looking like this.
 */
const BASE_VIEW = {
  width: 32,
  height: 32,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 5
}

export const viewPresets = {
  default: { ...BASE_VIEW }
}

export const imageSource = {
  website: require('../images/social/link.png'),
  twitter: require('../images/social/twitter.png'),
  github: require('../images/social/github.png'),
  medium: require('../images/social/medium.png'),
  dribbble: require('../images/social/dribbble.png'),
  instagram: require('../images/social/instagram.png'),
  facebook: require('../images/social/facebook.png'),
  email: require('../images/social/email.icon.png'),
  phone: require('../images/social/phone.icon.png')
}

export const imageStyle = {
  default: {}
}

export function SocialButton(props) {
  // grab the props
  const { preset = 'website', link, style, ...rest } = props

  const image = imageSource[preset] || imageSource['website']

  return (
    <TouchableHighlight
      style={[viewPresets.default, style]}
      onPress={() => Linking.openURL(link)}
      {...rest}
    >
      <Image source={image} style={imageStyle.default} />
    </TouchableHighlight>
  )
}
