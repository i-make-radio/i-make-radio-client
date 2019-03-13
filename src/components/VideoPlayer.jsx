import React, { Fragment, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const VideoPlayer = ({ autoPlay = false, playerId, wrapper = 'div' }) => {
  const videoPlayerRef = useRef(null)
  let rtcPublisher
  let initializeStream
  useEffect(() => {
    window.addEventListener('beforeunload', unPublish)

    const red5prosdk = window.red5prosdk
    rtcPublisher = new red5prosdk.RTCPublisher()
    const config = {
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

    initializeStream = rtcPublisher
      .init(config)
      .then(res => true)
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
    console.log(rtcPublisher)
  }, [])

  const publishStream = () => {
    initializeStream &&
      rtcPublisher
        .publish()
        .then(res => console.log('publishinng'))
        .catch(err => console.log(err))
  }
  const unPublish = () => {
    rtcPublisher.unpublish()
  }
  return (
    <Fragment>
      <video
        ref={videoPlayerRef}
        id="red5pro-publisher"
        width="640"
        height="480"
        controls
        autoPlay={true}
        muted
      />
      <button onClick={unPublish}>UnPublish</button>
      <button onClick={publishStream}>publishStream</button>
    </Fragment>
  )
}

export default VideoPlayer
