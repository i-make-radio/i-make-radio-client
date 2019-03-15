import React, { useState, useRef, useEffect } from 'react'
import socket from './utils/socket'
import axios from 'axios'

import ReactPlayer from 'react-player'

const AudioPlayerSubscriber = () => {
  const radioRef = useRef(null)

  const [currentSong, setCurrentSong] = useState(null)
  const [radioVolume, setRadioVolume] = useState(0.2)
  useEffect(() => {
    axios.get('http://10.10.210.12:8080/currentSong').then(res => {
      setCurrentSong(res.data.currentSong)
    })
  }, [])

  useEffect(() => {
    socket.registerPlayingSubscriber(updateCurrentSong)
    return socket.unregisterPlayingSubscriber
  }, [])

  useEffect(() => {
    socket.registerStopSubscriber(stopCurrentSong)
    return socket.unregisterStopSubscriber
  }, [])
  useEffect(() => {
    socket.registerVolumeChanged(onVolumeChangeReceived)
    return socket.unregisterVolumeChanged
  }, [])

  const onVolumeChangeReceived = ({ musicVolume }) => {
    setRadioVolume(musicVolume)
  }
  const updateCurrentSong = data => {
    setCurrentSong(data.currentSong)
  }

  const stopCurrentSong = () => {
    setCurrentSong(null)
  }

  const seekToStartTime = () => {
    const elapsedTime = new Date().getTime() / 1000 - currentSong.startTime
    radioRef.current.seekTo(elapsedTime)
  }
  return (
    <div className="playlist-container" style={{ display: 'none' }}>
      <ReactPlayer
        playing={!!currentSong}
        url={currentSong ? currentSong.url : ''}
        onStart={seekToStartTime}
        id={'radio-player-reciever'}
        controls={true}
        pip={true}
        ref={radioRef}
        height="124px"
        width="600px"
        volume={radioVolume}
      />
    </div>
  )
}

export default AudioPlayerSubscriber
