import React from 'react'

import './playlist.css'
import { isNullOrUndefined, debug } from 'util';
const SubscriberPlaylistCard = ({
  isPlaying,
  song: { artist, id, name, length },
  currentSong
}) => {  
  const isSongPlaying = () => !!currentSong && currentSong.id == id && isPlaying

  const formatDuration = time => {
    const minutes = Math.floor(time / 60)
    const seconds = time - minutes * 60

    return `${minutes}:${seconds}`
  }

  return (
    <div className={isSongPlaying() ? "song-row current-song-row" : "song-row"}>
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
