import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NicWeb from './NicWeb'
import NicMobile from './NicMobile'

export default () => (
  <Router>
    <div>
      <Route path="/" exact component={NicWeb} />
      <Route path="/mobile/" component={NicMobile} />
    </div>
  </Router>
)
