import React, { useState, useRef, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'

import ReactPlayer from 'react-player'

var socket = io.connect('10.10.213.235:8080')

const AudioPlayerSubscriber = () => {
  const radioRef = useRef(null)

  const [currentSong, setCurrentSong] = useState(null)

  useEffect(() => {
    axios.get('http://10.10.213.235:8080/currentSong').then(res => {
      setCurrentSong(res.data.currentSong)
    })
  }, [])

  socket.on('startPlayingSubscriber', data => {
    setCurrentSong(data.currentSong)
  })

  socket.on('stopPlayingSubscriber', () => {
    setCurrentSong(null)
  })

  const seekToStartTime = () => {
    const elapsedTime = new Date().getTime() / 1000 - currentSong.startTime
    radioRef.current.seekTo(elapsedTime)
  }
  return (
    <div className="playlist-container">
      <ReactPlayer
        playing={true}
        url={currentSong ? currentSong.url : ''}
        onStart={seekToStartTime}
        id={'radio-player-reciever'}
        controls={true}
        pip={true}
        ref={radioRef}
        height="124px"
        width="100%"
      />
    </div>
  )
}

export default AudioPlayerSubscriber
