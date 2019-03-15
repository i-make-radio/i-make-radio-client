import React, { Fragment, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const SubscriberVideoPlayer = props => {
  const videoPlayerRef = useRef(null)
  let RTCSubscriber
  let initializeStream
  useEffect(() => {
    window.addEventListener('beforeunload', unsubscribe)

    const red5prosdk = window.red5prosdk
    RTCSubscriber = new red5prosdk.RTCSubscriber()
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

    initializeStream = RTCSubscriber
      .init(config)
      .then(res => true)
      .catch(function (err) {
        console.error('Could not subscribe: ' + err)
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
    console.log(RTCSubscriber)

    return () => RTCSubscriber.unsubscribe()
  }, [])

  const subscribeStream = () => {
    initializeStream &&
      RTCSubscriber
        .subscribe()
        .then(res => console.log('subscribing'))
        .catch(err => console.log(err))
  }
  const unsubscribe = () => {
    RTCSubscriber.unsubscribe()
  }
  return (
    <Fragment>
      <div>
      <button onClick={unsubscribe}>unsubscribe</button>
        <button onClick={subscribeStream}>subscribeStream</button>
        <div>
            <video
              ref={videoPlayerRef}
              id="red5pro-subscriber"
              controls
              width="100%"
              height="100%"
              autoPlay={true}
              muted
            />
        </div>
      </div>

    </Fragment>
  )
}

export default SubscriberVideoPlayer

