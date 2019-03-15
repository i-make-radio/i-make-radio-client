import React, { useRef } from 'react'
import socket from '../utils/socket'
import ReactPlayer from 'react-player'

import PlaylistCard from './PlaylistCard'
import SubscriberPlaylistCard from './SubscriberPlaylistCard'

const Playlist = ({
  currentSong,
  songs,
  isPublisher,
  updateCurrentSong,
  playState,
  setPlayState
}) => {
  const radioRef = useRef(null)

  const emitPlayOnSocket = () => {
    const timeElapsed = radioRef.current.getCurrentTime()
    const data = { ...currentSong, ...{ timeElapsed } }
    socket.publisherEmitPlayOnSocket(data)
  }

  const stop = () => {
    socket.publisherStopAudio()
  }

  const playNewSong = song => {
    setPlayState(true)
    updateCurrentSong(song)
    emitPlayOnSocket()
  }

  const pausePlayer = () => {
    setPlayState(false)
  }

  const playListJSX = songs.map(song =>
    isPublisher ? (
      <PlaylistCard
        key={song.name}
        currentSong={currentSong}
        song={song}
        isPlaying={playState}
        playNewSong={playNewSong}
        pausePlayer={pausePlayer}
      />
    ) : (
      <SubscriberPlaylistCard
        key={song.name}
        currentSong={currentSong}
        song={song}
        isPlaying={playState}
      />
    )
  )
  return (
    <div className="playlist-container">
      <div className="playlist-header">
        <h2 className="playlist-title">Lavender’s Sweet Station</h2>
        <span>{songs.length} songs</span>
      </div>
      <div>{playListJSX}</div>
      {isPublisher ? (
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
      ) : (
        ''
      )}
    </div>
  )
}

export default Playlist
