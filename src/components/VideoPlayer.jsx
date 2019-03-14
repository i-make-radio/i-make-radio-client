import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import PowerSettingIcon from '@material-ui/icons/PowerSettingsNew'
import StopIcon from '@material-ui/icons/Stop'
import liveiconUrl from './icon/LIVE.svg'
import Slider from '@material-ui/lab/Slider'

const red5prosdk = window.red5prosdk
const rtcPublisher = new red5prosdk.RTCPublisher()
let initializeStream

const VideoPlayer = ({ updateStreamState, streamState }) => {
  const videoPlayerRef = useRef(null)

  const [streamVolumn, setStreamVolumn] = useState(50)

  useEffect(() => {
    console.log('rendering useEffect')
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

    return () => console.log('unpublishing') || rtcPublisher.unpublish()
  }, [])

  const publishStream = () => {
    initializeStream &&
      rtcPublisher
        .publish()
        .then(res => updateStreamState(true))
        .catch(err => console.log(err))
  }
  const unPublishStream = () => {
    rtcPublisher
      .unpublish()
      .then(res => updateStreamState(false))
      .catch(err => console.log(err))
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
            src={liveiconUrl}
            style={{ visibility: streamState ? 'visible' : 'hidden' }}
          />

          <p className="live_shows__elasped_time">3:24:48</p>
          <IconButton>
            {!streamState ? (
              <PowerSettingIcon
                onClick={publishStream}
                className="publisher-icon"
              />
            ) : (
              <StopIcon onClick={unPublishStream} className="publisher-icon" />
            )}
          </IconButton>
        </div>

        <Slider aria-labelledby="label" onChange={() => {}} />

        <button className="live_shows__pinned_comments_button">
          PINNED COMMENTS (12)
        </button>
        <div className="live_shows__bottom_spacer" />
      </div>
    </div>
  )
}

export default VideoPlayer
