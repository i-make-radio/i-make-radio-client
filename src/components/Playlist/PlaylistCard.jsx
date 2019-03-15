import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import PlayCircleIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleIcon from '@material-ui/icons/PauseCircleOutline'

import './playlist.css'
const PlaylistCard = ({
  song,
  isPlaying,
  song: { artist, id, name, length },
  playNewSong,
  pausePlayer,
  currentSong
}) => {
  const isSongPlaying = () =>
    !!currentSong && currentSong.id === id && isPlaying

  const formatDuration = time => {
    const minutes = Math.floor(time / 60)
    const seconds = time - minutes * 60

    return `${minutes}:${seconds}`
  }

  return (
    <div className={isSongPlaying() ? 'song-row current-song-row' : 'song-row'}>
      <span className="song-id">{id}</span>
      <span className="song-duration">{formatDuration(length)}</span>
      <div className="song-info">
        <p className="song-row-title">{name}</p>
        <p className="song-row-artist">{artist}</p>
      </div>

      {isSongPlaying() ? (
        <IconButton
          aria-label="Play/pause"
          onClick={pausePlayer}
          className="song-icon"
        >
          <PauseCircleIcon className="song-icon" />
        </IconButton>
      ) : (
        <IconButton
          aria-label="Play/pause"
          onClick={() => playNewSong(song)}
          className="song-icon"
        >
          <PlayCircleIcon className="song-icon" />
        </IconButton>
      )}
    </div>
  )
}

export default PlaylistCard
