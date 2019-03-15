import React, { useEffect, useRef, useState, memo } from 'react'

import IconButton from '@material-ui/core/IconButton'
import PowerSettingIcon from '@material-ui/icons/PowerSettingsNew'
import StopIcon from '@material-ui/icons/Stop'
import Slider from '@material-ui/lab/Slider'

import liveiconUrl from './icon/LIVE.svg'
import socket from './utils/socket'

const red5prosdk = window.red5prosdk
const rtcPublisher = new red5prosdk.RTCPublisher()
let initializeStream

const VideoPlayer = memo(({ updateStreamState, streamState }) => {
  const videoPlayerRef = useRef(null)

  const [streamVolume, setStreamVolume] = useState(0.25)

  useEffect(() => {
    window.addEventListener('beforeunload', unPublishStream)

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

    initializeStream = rtcPublisher
      .init(config)
      .then(res => true)
      .catch(err => {
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

    return rtcPublisher.unpublish
  }, [])

  const publishStream = () => {
    initializeStream &&
      rtcPublisher
        .publish()
        .then(res => updateStreamState(true))
        .catch(err => console.log(err))
  }
  const unPublishStream = e => {
    e.preventDefault()
    // socket.emit('stopPlayingPublisher')
    rtcPublisher
      .unpublish()
      .then(res => updateStreamState(false))
      .catch(err => console.log(err))
  }

  const handleVolumeSlider = (event, value) => {
    setStreamVolume(value)
  }

  const sendVolumeChange = () => {
    const musicVolume = Math.abs(1 - streamVolume)
    console.log({
      streamVolume,
      musicVolume
    })
    socket.changeStreamVolume({
      streamVolume,
      musicVolume
    })
  }

  const check = (rawValue, props) => {
    const { disabled, step } = props
    if (rawValue === 10) {
      rawValue = 1
    }
    if (disabled) {
      return null
    }
    if (step) {
      return Math.round(rawValue / step) * step
    }

    return Number(rawValue.toFixed(3))
  }
  return (
    <div className="right_column__row_flex__show_info_section">
      <div className="video_player_container">
        <video
          ref={videoPlayerRef}
          id="red5pro-publisher"
          controls
          width="100%"
          height="100%"
          autoPlay={true}
          muted
        />
      </div>

      <div className="live_shows__column_flex">
        <p className="live_shows__listeners_count">726 listeners</p>
        <div className="live-timer-container">
          <img
            alt="stream live icon"
            src={liveiconUrl}
            style={{ visibility: streamState ? 'visible' : 'hidden' }}
          />

          <p className="live_shows__elasped_time">3:24:48</p>

          {!streamState ? (
            <IconButton onClick={publishStream}>
              <PowerSettingIcon className="publisher-icon" />
            </IconButton>
          ) : (
            <IconButton onClick={unPublishStream}>
              <StopIcon className="publisher-icon" />
            </IconButton>
          )}
        </div>
        <div className="slider-container">
          <span className="slider-label">Music</span>
          <Slider
            className="slider"
            aria-labelledby="label"
            value={streamVolume}
            min={0}
            max={1}
            step={0.25}
            onChange={handleVolumeSlider}
            onDragEnd={sendVolumeChange}
            valueReducer={check}
          />
          <span className="slider-label">Voice</span>
        </div>

        <button className="live_shows__pinned_comments_button">
          PINNED COMMENTS (12)
        </button>
        <div className="live_shows__bottom_spacer" />
      </div>
    </div>
  )
})

export default VideoPlayer
