import React, { useState, useRef, useEffect } from 'react'
import io from 'socket.io-client'

import ReactPlayer from 'react-player'

import PlaylistCard from './PlaylistCard'
import SubscriberPlaylistCard from './SubscriberPlaylistCard'
const socket = io.connect('http://10.10.213.235:8080')

const Playlist = ({songs, isPublisher = false}) => {
  const radioRef = useRef(null)

const [currentSong, setCurrentSong] = useState(songs[1])
  const [playState, setPlayState] = useState(false)

  const emitPlayOnSocket = () => {
    console.log('start songs', currentSong)
    const timeElapsed = radioRef.current.getCurrentTime()
    const data = { ...currentSong, ...{ timeElapsed } }
    console.log('startPlayingPublisher', data)
    socket.emit('startPlayingPublisher', data)
  }
  const stop = () => {
    // const timeElapsed = radioRef.current.getCurrentTime()
    // const data = { ...currentSong, ...{ timeElapsed } }
    console.log('stopPlayingPublisher', currentSong.id)
    socket.emit('stopPlayingPublisher', currentSong.id)
  }

  const volumeChange = () => {
    socket.emit('volumeChangePublisher', 75)
  }

  const playNewSong = song => {
    setPlayState(true)
    setCurrentSong(song)
    emitPlayOnSocket()
  }

  const pausePlayer = () => {
    setPlayState(false)
  }
  const playListJSX = songs.map(song => (
    isPublisher ?
    <PlaylistCard
      currentSong={currentSong}
      song={song}
      isPlaying={playState}
      playNewSong={playNewSong}
      pausePlayer={pausePlayer}
    />
    : 
    <SubscriberPlaylistCard
    currentSong={currentSong}
    song={song}
    isPlaying={playState}
    playNewSong={playNewSong}
    pausePlayer={pausePlayer}
  />
  ))
  return (
    <div className="playlist-container">
      <div className="playlist-header">
        <h2 className="playlist-title">Lavender’s Sweet Station</h2>
        <span>{songs.length} songs</span>
      </div>
      <div>{playListJSX}</div>
      <ReactPlayer
        playing={playState}
        url={currentSong ? currentSong.url : ''}
        id={'radio-player'}
        controls={true}
        onPlay={emitPlayOnSocket}
        onPause={stop}
        onEnded={stop}
        pip={true}
        ref={radioRef}
        height="124px"
        width="100%"
      />
    </div>
  )
}

export default Playlist
