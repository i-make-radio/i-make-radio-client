import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import VideoPlayer from './VideoPlayer'
const SongUrl =
  'https://s3.amazonaws.com/i-make-radio-hackathon/02+-+Too+Deep+For+The+Intro.mp3'

class Publisher extends Component {
  constructor() {
    super()
    this.videoPlayer = React.createRef
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.unPublish)

    const red5prosdk = window.red5prosdk
    this.rtcPublisher = new red5prosdk.RTCPublisher()
    var config = {
      protocol: 'ws',
      host: '35.182.68.158',
      port: 5080,
      app: 'live',
      streamName: 'mystream',
      rtcConfiguration: {
        iceServers: [{ urls: 'stun:stun2.l.google.com:19302' }],
        iceCandidatePoolSize: 2,
        bundlePolicy: 'max-bundle'
      } // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
    }

    this.initializeStream = this.rtcPublisher
      .init(config)
      .then(res => console.log(res) || true)
      .catch(function(err) {
        console.error('Could not publish: ' + err)
        return false
      })

    // this.rtcPublisher.on('CONNECTION_CLOSED', event => {
    //   var type = event.type
    //   // The dispatching publisher instance:
    //   var publisher = event.publisher
    //   // Optional data releated to the event (not available on all events):
    //   var data = event.data

    //   console.log('connection closed', type, publisher, data)
    // })
    console.log(this.rtcPublisher)
  }

  componentWillUnmount() {
    alert('unmounting')
    this.rtcPublisher.unpublish()
  }

  publishStream = () => {
    this.initializeStream &&
      this.rtcPublisher
        .publish()
        .then(res => console.log('publishinng'))
        .catch(err => console.log(err))
  }
  unPublish = () => {
    this.rtcPublisher.unpublish()
  }
  render() {
    return (
      <div>
        <h1>Publisher</h1>
        <video
          ref={this.videoPlayer}
          id="red5pro-publisher"
          width="640"
          height="480"
          controls
          autoPlay={true}
        />

        <Link to="/">Go Away</Link>
        <button onClick={this.unPublish}>UnPublish</button>
        <button onClick={this.publishStream}>publishStream</button>
      </div>
    )
  }
}

export default Publisher
