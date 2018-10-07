import React, { Component } from 'react'
import logo from './NicOrNot.png'
import './App.css'
import * as tf from '@tensorflow/tfjs'
import { loadFrozenModel } from '@tensorflow/tfjs-converter'
import * as faceapi from 'face-api.js'

const OPTIONS = ['Nic', 'Not']
const MODEL_URL = 'tensorflowjs_model.pb'
const WEIGHTS_URL = 'weights_manifest.json'

class App extends Component {
  state = {
    classification: 'Loading',
    currentImage: null
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
    // img.width = 227
    // img.height = 227
    // img.src = 'https://i.imgur.com/p2mewNT.jpg' // not
    // img.src = 'https://i.imgur.com/BPLtsDR.jpg' // not
    // img.src = 'https://i.imgur.com/IYNZ3UN.jpg' // not
    // img.src = 'https://i.imgur.com/fV7Sm6s.jpg' // nic
    // img.src = 'https://i.imgur.com/FQWxcKg.jpg' // nic
    // img.src = 'https://i.imgur.com/5wJryHC.jpg' // nic
    // img.src = 'https://i.imgur.com/fUm1zSu.jpg' // not
    // img.src = "https://i.imgur.com/rF6bW1F.jpg" // not
    // img.src = "https://i.imgur.com/WWXVhFX.jpg" // not
    // img.src = "https://i.imgur.com/qg4a4oU.jpg" // not
    img.src =
      'https://media.istockphoto.com/photos/friendship-picture-id532969250?k=6&m=532969250&s=612x612&w=0&h=Vlf2_iNPkEjbCNozIbZlScGfRx4fDSpGphGM9P1XGFQ='

    img.onload = async () => {
      // const result = await this.loadMobileNet(img) // mobile net model
      // const result = await this.loadNicNet(img)
      const result = 0
      let faceImages
      try {
        // window.alert(faceapi.loadFaceDetectionModel)
        await faceapi.loadFaceDetectionModel(
          './face_detection/face_detection_model-weights_manifest.json'
        )
        // await faceapi.loadFaceRecognitionModel('./weights_manifest.json')
        const width = img.width
        const height = img.height
        const overlay = this.refs.overlay
        overlay.width = width
        overlay.height = height

        // THIS WOULD DRAW FACE BOXES ON OVERLAY
        const faces = await faceapi.locateFaces(img, 0.5)
        faceapi.drawDetection(
          overlay,
          faces.map(det => det.forSize(width, height))
        )
        const input = await faceapi.toNetInput(img)
        faceImages = await faceapi.extractFaces(input.canvases[0], faces)
      } catch (e) {
        window.alert('Locating faces failed: ' + e.message)
      }

      // this.setState({ classification: result }) // just result index
      // this.setState({ currentImage: img, classification: OPTIONS[result] })
      this.setState({
        currentImage: img,
        classification: faceImages.length + ' faces'
      })
    }
  }

  render() {
    const imgURL = this.state.currentImage ? this.state.currentImage.src : ''
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div
            style={{
              position: 'relative',
              margin: '20px',
              backgroundColor: 'black',
              textAlign: 'left',
              display: 'inline-block'
            }}
          >
            <img id="inputImg" src={imgURL} style={{ maxWidth: '800px' }} />
            <canvas
              style={{
                position: 'absolute',
                top: 0,
                left: 0
              }}
              ref="overlay"
            />
          </div>
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
