import React, { Component } from 'react'
import logo from './NicOrNot.png'
import './App.css'
import * as tf from '@tensorflow/tfjs'

let nicornot
class App extends Component {
  state = {
    classification: 'Loading'
  }

  preprocces = async (img) => {
    nicornot = await tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json')
    let tensor = tf.fromPixels(img).toFloat();

    const offset = tf.scalar(127.5);
    // Normalize the image
    const normalized = tensor.sub(offset).div(offset);

    // We add a dimension to get a batch shape [1,224,224,3]
    // batched image
    return normalized.expandDims(0)
  }

  predict = (input) => {
    // get prediction
    let prediction = nicornot.predict(input)
    // retrieve the highest probability class label idx
    console.log(prediction.argMax().buffer().values)
    return prediction.argMax().buffer().values[0]
  }

  async componentDidMount () {
    let img = new Image();
    img.crossOrigin = '*';
    img.src = 'https://i.imgur.com/p2mewNT.jpg';
    img.width = 224;
    img.height = 224;
    let classification = await this.preprocces(img)
    this.setState({classification: this.predict(classification)})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> <em>{this.state.classification}</em> </h1>
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
