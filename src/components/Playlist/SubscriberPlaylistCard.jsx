import React from 'react'

import './playlist.css'
const SubscriberPlaylistCard = ({
  song,
  isPlaying,
  song: { artist, id, name, length },
  currentSong
}) => {
  const isSongPlaying = () => currentSong.id === song.id && isPlaying

  const formatDuration = time => {
    const minutes = Math.floor(time / 60)
    const seconds = time - minutes * 60

    return `${minutes}:${seconds}`
  }
  return (
    <div className="song-row">
      <span className="song-id">{id}</span>
      <span className="song-duration">{formatDuration(length)}</span>
      <div className="song-info">
        <p>{name}</p>
        <p>{artist}</p>
      </div>
    </div>
  )
}

export default SubscriberPlaylistCard
