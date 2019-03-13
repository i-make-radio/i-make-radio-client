import React, { useState, useRef, useEffect } from 'react'
import io from 'socket.io-client'

import ReactPlayer from 'react-player'

const socket = io.connect('http://10.10.213.235:8088')

console.log(socket)
const SongUrl =
  'https://s3.amazonaws.com/i-make-radio-hackathon/02+-+Too+Deep+For+The+Intro.mp3'

const StaticPlaylist = [
  {
    title: 'Too deep for the intro',
    id: 1,
    url: SongUrl
  },
  {
    title: 'Too deep for the intro',
    id: 2,
    url: SongUrl
  },
  {
    title: 'Too deep for the intro',
    id: 3,
    url: SongUrl
  },
  {
    title: 'Too deep for the intro',
    id: 4,
    url: SongUrl
  },
  {
    title: 'Too deep for the intro',
    id: 5,
    url: SongUrl
  },
  {
    title: 'Too deep for the intro',
    id: 6,
    url: SongUrl
  },
  {
    title: 'Too deep for the intro',
    id: 7,
    url: SongUrl
  }
]

const Playlist = () => {
  useEffect(() => {
    console.log('rerendering')
  })
  const defaultSongState = {
    title: 'Too deep for the intro',
    id: 1,
    url: SongUrl
  }

  const radioRef = useRef(null)

  const [currentSong, setCurrentSong] = useState(defaultSongState)
  const [playState, setPlayState] = useState(false)

  const emitPlayOnSocket = () => {
    console.log('start songs', currentSong)
    const timeElapsed = radioRef.current.getCurrentTime()
    const data = { ...currentSong, ...{ timeElapsed } }
    console.log(data)
    socket.emit('startPlayingPublisher', data)
  }
  const stop = () => {
    const timeElapsed = radioRef.current.getCurrentTime()
    const data = { ...currentSong, ...{ timeElapsed } }
    console.log(data)
    socket.emit('stopPlayingPublisher', data)
  }
  const resume = () => {
    const timeElapsed = radioRef.current.getCurrentTime()
    const data = { ...currentSong, ...{ timeElapsed } }
    socket.emit('resumePlayingPublisher', data)
  }

  const volumeChange = () => {
    socket.emit('volumeChangePublisher', 75)
  }

  const playNewSong = song => {
    setCurrentSong(song)
    setPlayState(true)
  }
  const playListJSX = StaticPlaylist.map(song => (
    <li>
      <button onClick={() => playNewSong(song)}>play</button>
      <span>{song.title}</span>
    </li>
  ))
  return (
    <div>
      <ul>{playListJSX}</ul>
      <ReactPlayer
        playing={playState}
        url={currentSong.url}
        id={'radio-player'}
        controls={true}
        onPlay={emitPlayOnSocket}
        onPause={stop}
        onEnded={stop}
        pip={true}
        ref={radioRef}
      />
    </div>
  )
}

export default Playlist
