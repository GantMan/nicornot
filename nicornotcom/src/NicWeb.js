import React, { Component } from 'react'
import * as faceapi from 'face-api.js'
import logo from './NicOrNot.png'
import Dropzone from 'react-dropzone'
import './App.css'
import { Link } from 'react-router-dom'

const threshHold = 0.6

export default class NicWeb extends Component {
  state = {
    classification: null,
    graphic: logo,
    status: 'Loading Models',
    nic: null
  }

  async componentDidMount() {
    await faceapi.loadSsdMobilenetv1Model('/face_model')
    await faceapi.loadFaceLandmarkModel('/face_model')
    await faceapi.loadFaceRecognitionModel('/face_model')
    this.setState({
      status: 'Ready'
    })
    // const nic = await faceapi.fetchImage('./nic_face.jpg')
    // const nicDescript = await faceapi.allFacesSsdMobilenetv1(nic)
    // this.setState({
    //   status: 'Ready',
    //   nic: nicDescript[0].descriptor
    // })
  }

  checkFaces = async () => {
    this.setState({
      status: 'Processing Nic'
    })
    faceapi.drawDetection(this.refs.overlay, [])

    const nic = await faceapi.fetchImage('./nic_face.jpg')
    const nicDescript = await faceapi.allFacesSsdMobilenetv1(nic)

    this.setState({
      status: 'Processing Faces'
    })
    const otherURL = this.state.graphic
    const other = await faceapi.fetchImage(otherURL)
    const otherDescript = await faceapi.allFacesSsdMobilenetv1(other)
    let closestFace = 1

    const dropped = this.refs.dropped
    const overlay = this.refs.overlay
    overlay.width = dropped.width
    overlay.height = dropped.height

    let boxesWithText = []
    otherDescript.map(det => {
      // Distance of each face
      let distance = faceapi.round(
        faceapi.euclideanDistance(nicDescript[0].descriptor, det.descriptor)
      )

      if (distance < threshHold) {
        const face = det.forSize(overlay.width, overlay.height)
        closestFace = distance
        const { box } = face.alignedRect
        boxesWithText.push(
          new faceapi.BoxWithText(
            new faceapi.Rect(box.x, box.y, box.width, box.height),
            'Nic'
          )
        )
      }
      return null //no need for results
    })

    faceapi.drawDetection(this.refs.overlay, boxesWithText)

    this.setState({
      status: 'Ready',
      classification: closestFace
    })
  }

  setFile = file => {
    if (typeof file === 'string') {
      // using a sample
      this.setState({ classification: null, graphic: file })
    } else {
      // drag and dropped
      const reader = new FileReader()
      reader.onload = e => {
        this.setState({ classification: null, graphic: e.target.result })
      }

      reader.readAsDataURL(file)
    }

  }

  onDrop = (accepted, rejected) => {
    if (rejected.length > 0) {
      window.alert('JPG or PNG only plz')
    } else {
      this.setState({
        classification: null,
        status: 'Processing'
      })
      this.setFile(accepted[0])
      this.checkFaces()
    }
  }

  renderNicImage = () => {
    let nicPath = ''
    if (this.state.status === 'Ready') {
      if (this.state.classification) {
        nicPath =
          Number(this.state.classification) < threshHold
            ? './yes.png'
            : './no.png'

        return <img src={nicPath} alt={nicPath} id="detection" />
      }
    } else {
      nicPath = './processingFaces.gif'
      return (
        <div>
          <img src={nicPath} alt="processing" className="processing" />
          <p>{this.state.status}</p>
        </div>
      )
    }
  }

  renderSampleImages = (urlArray) =>
    <div>
      {urlArray.map(srcURL =>
        <img style={{height: 100}} alt={srcURL} src={srcURL} onClick={() => this.onDrop([srcURL], [])} />
      )}
    </div>

  render() {
    return (
      <div className="App">
        <p id="opener">
          Identify if a person <em>is</em> or <em>is NOT</em> Nicolas Cage with
          ease.
        </p>
        {this.renderNicImage()}
        <header className="App-header">
          <div>
          <Dropzone
            accept="image/jpeg, image/png"
            className="photo-box"
            onDrop={this.onDrop.bind(this)}
          >
            <img
              src={this.state.graphic}
              alt="your nic here"
              className="dropped-photo"
              ref="dropped"
            />
            <canvas
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
                maxHeight: '400px'
              }}
              ref="overlay"
            />
            <p>Drop your image here or click to browse.</p>
          </Dropzone>
          </div>
        </header>
          <div style={{paddingTop: 20}}>
            <p>Or click these:</p>
            {this.renderSampleImages(['/examples/example1.jpg', '/examples/example2.jpg', '/examples/example3.jpg', '/examples/example4.jpg', '/examples/example5.jpg', '/examples/example6.jpg', '/examples/example7.jpg', '/examples/example8.jpg'])}
          </div>
        <div>
          <h2>
            <Link to="/mobile/">Also available for iOS</Link>
          </h2>
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
