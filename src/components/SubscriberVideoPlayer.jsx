import React, { useEffect, useRef, useState } from 'react'
import liveiconUrl from './icon/LIVE.svg'
import AudioPlayerSubscriber from './AudioPlayerSubscriber'

import IconButton from '@material-ui/core/IconButton'
import PowerSettingIcon from '@material-ui/icons/PowerSettingsNew'
import socket from './utils/socket'

let initializeStream
const red5prosdk = window.red5prosdk
const RTCSubscriber = new red5prosdk.RTCSubscriber()

const SubscriberVideoPlayer = props => {
  const videoPlayerRef = useRef(null)
  const [streamAlive, updateStreamState] = useState(false)

  useEffect(() => {
    window.addEventListener('beforeunload', unsubscribe)
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
      }
      // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
    }

    initializeStream = RTCSubscriber.init(config)
      .then(res => subscribeStream())
      .catch(err => {
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
    return unsubscribe
  }, [])

  useEffect(() => {
    socket.registerstreamVolumeChanged(onVolumeChangeReceived)
    return socket.unregisterstreamVolumeChanged
  }, [])

  const subscribeStream = () => {
    initializeStream &&
      RTCSubscriber.subscribe()
        .then(res => updateStreamState(true))
        .catch(err => console.log(err))
  }
  const unsubscribe = () => {
    RTCSubscriber.unsubscribe()
  }

  const onVolumeChangeReceived = ({ streamVolume, musicVolume }) => {
    videoPlayerRef.current.volume = streamVolume
  }
  return (
    <div className="right_column__row_flex__show_info_section">
      <div className="video_player_container">
        <video
          ref={videoPlayerRef}
          id="red5pro-subscriber"
          controls
          width="100%"
          height="100%"
          autoPlay={true}
        />
      </div>
      <div className="live_shows__column_flex">
        <p className="live_shows__listeners_count">726 listeners</p>
        <div className="subscriber live-timer-container">
          <img
            alt="live icon"
            src={liveiconUrl}
            style={{ visibility: streamAlive ? 'visible' : 'hidden' }}
          />
          <p className="live_shows__elasped_time">3:24:48</p>
          <IconButton>
            <PowerSettingIcon className="publisher-icon" />
          </IconButton>
        </div>

        <div className="live_shows__bottom_spacer" />

        <AudioPlayerSubscriber />
      </div>
    </div>
  )
}

export default SubscriberVideoPlayer
