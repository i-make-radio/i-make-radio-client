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
      console.log("fetched current song", res.data.currentSong)
      setCurrentSong(res.data.currentSong)
    })
  }, [])

  socket.on('startPlayingSubscriber', (data) => {
    console.log("GOT FROM SUB startPlayingSubscriber", data)
    setCurrentSong(data.currentSong)
  })

  socket.on('stopPlayingSubscriber', () => {
    setCurrentSong(null)
    console.log("GOT FROM SUB stopPlayingSubscriber")
  })

  if (currentSong === null) {
    console.log("rendering currentSong is NULL", currentSong)

    return (<div className="playlist-container">
      <ReactPlayer
        playing={true}
        id={'radio-player-reciever'}
        controls={true}
        pip={true}
        ref={radioRef}
        height="124px"
        width="100%"
      />
    </div>)
  } else {
    console.log("rendering currentSong is", currentSong)

    return (
      // *******************
      // Todo implement SeekTo using currentSong.startTime. i.e.
      // const elaspedTime = new Date().getTime() - currentSong.startTime
      // *******************

      <div className="playlist-container">
        <ReactPlayer
          playing={true}
          url={currentSong.url}
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
}

export default AudioPlayerSubscriber
