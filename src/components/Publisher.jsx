import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'

import Playlist from './Playlist/Playlist'
import VideoPlayer from './VideoPlayer'
import ChatBox from './ChatBox';

const Publisher = () => {
  const [playlist, updatePlaylist] = useState([])

  useEffect(() => {
    axios.get('http://10.10.213.235:8088/allSongs').then(res => {
      updatePlaylist(res.data)
    })
  }, [])

  return playlist.length ? (
    <div>
      <h1>Publisher</h1>
      <VideoPlayer />
      <Link to="/">Go Away</Link>
      <ChatBox />
      <Playlist songs={playlist} />
    </div>
  ) : (
    'loading'
  )
}

export default Publisher
