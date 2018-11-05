import React, { Component } from 'react'
import logo from './NicOrNot.png'
import './App.css'
import { Link } from 'react-router-dom'

export default class NicMobile extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>
          <p id="opener">
            The Nic Cage detecting app!{' '}
            <Link to="/">Or use the web version.</Link>
          </p>
          <img src="/nic_clip.gif" />
          <p>
            This app is very useful when{' '}
            <a
              href="http://declarationofindependencethief.com/"
              target="_blank"
            >
              someone steals the Declaration of Independence
            </a>
            , or if you're just looking to{' '}
            <a
              href="https://shift.infinite.red/cage-against-the-machine-a419b6980424"
              target="_blank"
            >
              learn more about facial recognition
            </a>
            . If either of those are your need, then this is the app for you!{' '}
            <a
              href="https://itunes.apple.com/us/app/nic-or-not/id1437819644?ls=1&mt=8"
              target="_blank"
            >
              This App is <strong>currently available on iOS App Store</strong>
            </a>
            .
          </p>
          <img src="/app.png" className="appStore" alt="app store image" />
        </div>
        <footer id="footer">
          <ul>
            <li>Copyright Now(ish)</li>
            <li>
              <a href="http://declarationofindependencethief.com/">
                Declaration of Independence Thief Site
              </a>
            </li>
            <li>
              <a href="https://github.com/gantman/nicornot">GitHub Repo</a>
            </li>
            <li>
              <a href="https://shift.infinite.red/cage-against-the-machine-a419b6980424">
                Blog Post
              </a>
            </li>
            <li>
              <a href="https://slides.com/gantlaborde/cage#/">Slides</a>
            </li>
          </ul>
        </footer>
      </div>
    )
  }
}
