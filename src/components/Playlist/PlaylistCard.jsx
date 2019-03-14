import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import PlayCircleIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleIcon from '@material-ui/icons/PauseCircleOutline'

import PlayArrow from '@material-ui/icons/PlayArrow'

import './playlist.css'
const PlaylistCard = ({
  song,
  isPlaying,
  song: { artist, id, name, length },
  playNewSong,
  pausePlayer,
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
      <IconButton aria-label="Play/pause" className="song-icon">
        {isSongPlaying() ? (
          <PauseCircleIcon onClick={pausePlayer} className="song-icon" />
        ) : (
          <PlayCircleIcon
            className="song-icon"
            onClick={() => playNewSong(song)}
          />
        )}
      </IconButton>
    </div>
  )
}

export default PlaylistCard
