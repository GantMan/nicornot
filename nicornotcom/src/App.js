import React, { Component } from 'react';
import logo from './NicOrNot.png'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> <em>Coming Soon</em> </h1>
        </header>
        <div id="footer">
          <ul>
            <li>Copyright Now(ish)</li>
            <li><a href="http://declarationofindependencethief.com/">Declaration of Independence Thief Site</a></li>
            <li><a href="https://github.com/gantman/nicornot">GitHub Repo</a></li>
            <li><a href="https://slides.com/gantlaborde/cage#/">Slides</a></li>
          </ul>
        </div>

      </div>
    );
  }
}

export default App;
