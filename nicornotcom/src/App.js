import React, { Component } from 'react'
import logo from './NicOrNot.png'
import './App.css'
import * as tf from '@tensorflow/tfjs'
import { loadFrozenModel } from '@tensorflow/tfjs-converter'

const OPTIONS = ['Nic', 'Not']
const MODEL_URL = 'tensorflowjs_model.pb'
const WEIGHTS_URL = 'weights_manifest.json'

class App extends Component {
  state = {
    classification: 'Loading'
  }

  preprocces = img => {
    const tensor = tf.fromPixels(img).toFloat()

    const offset = tf.scalar(127.5)
    // Normalize the image
    const normalized = tensor.sub(offset).div(offset)

    // We add a dimension to get a batch shape [1,224,224,3]
    // batched image
    return normalized.expandDims(0)
  }

  preproccesNic = img => {
    const tensor = tf.fromPixels(img).toFloat()

    const offset = tf.scalar(127.5)
    // Normalize the image
    const normalized = tensor.sub(offset).div(offset)

    // We add a dimension to get a batch shape [1,227,227,3]
    // batched image
    return normalized.expandDims(0)
  }

  predict = (input, model) => {
    // get prediction
    const prediction = model.predict(input)
    // retrieve the highest probability class label idx
    return prediction.argMax(1).buffer().values[0]
  }

  loadMobileNet = async img => {
    const mobilenet = await tf.loadModel(
      'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json'
    )
    const cls = this.preprocces(img)
    return this.predict(cls, mobilenet)
  }

  loadNicNet = async img => {
    let nicmodel
    try {
      nicmodel = await loadFrozenModel(MODEL_URL, WEIGHTS_URL)
      // return nicmodel.execute({input: tf.fromPixels(img)});
      const cls = this.preproccesNic(img)
      return this.predict(cls, nicmodel)
    } catch (e) {
      window.alert('Totes got an error')
      console.log(e)
    }
  }

  componentDidMount() {
    let img = new Image()
    img.crossOrigin = '*'
    // img.width = 224
    // img.height = 224
    img.width = 227
    img.height = 227
    // img.src = "https://i.imgur.com/p2mewNT.jpg"; // not
    // img.src = "https://i.imgur.com/BPLtsDR.jpg"; // not
    // img.src = "https://i.imgur.com/IYNZ3UN.jpg" // not
    img.src = 'https://i.imgur.com/fV7Sm6s.jpg' // nic
    // img.src = "https://i.imgur.com/FQWxcKg.jpg" // nic
    // img.src = "https://i.imgur.com/5wJryHC.jpg" // nic
    // img.src = "https://i.imgur.com/fUm1zSu.jpg" // not
    // img.src = "https://i.imgur.com/rF6bW1F.jpg" // not
    // img.src = "https://i.imgur.com/WWXVhFX.jpg" // not
    // img.src = "https://i.imgur.com/qg4a4oU.jpg" // not

    img.onload = async () => {
      // const result = await this.loadMobileNet(img)
      const result = await this.loadNicNet(img)
      // this.setState({ classification: result })
      this.setState({ classification: OPTIONS[result] })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            {' '}
            <em>{this.state.classification}</em>{' '}
          </h1>
        </header>
        <div id="footer">
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
              <a href="https://slides.com/gantlaborde/cage#/">Slides</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default App
