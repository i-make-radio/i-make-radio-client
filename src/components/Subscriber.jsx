import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Subscriber extends Component {
  constructor() {
    super()
    this.videoPlayer = React.createRef()
  }

  componentDidMount() {
    console.log('rendering subscriber')
    const red5prosdk = window.red5prosdk

    this.rtcSubscriber = new red5prosdk.RTCSubscriber()
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
    this.initializeStream = this.rtcSubscriber
      .init(config)
      .then(() => this.rtcSubscriber.subscribe())
      .catch(err => {
        console.log('Could not play: ' + err)
        return false
      })

    console.log(this.rtcSubscriber)
  }
  subscribeVideo = () => {
    if (this.initializeStream) {
      console.log('playing subscription')
      return this.rtcSubscriber.subscribe()
    }
  }
  componentWillUnmount() {
    this.rtcSubscriber.unsubscribe()
  }
  render() {
    console.log('rendering')
    return (
      <div>
        <h1>Subscriber</h1>
        <video
          // autogitis.videoPlayer}
          id="red5pro-subscriber"
          width="640"
          height="480"
          controls
        />
      </div>
    )
  }
}

export default Subscriber
