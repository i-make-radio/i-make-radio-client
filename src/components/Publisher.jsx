import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'

import ChatBox from './ChatBox'
import Playlist from './Playlist'
import VideoPlayer from './VideoPlayer'

const Publisher = () => {
  const [playlist, updatePlaylist] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:8088/allSongs').then(res => {
      updatePlaylist(res.data)

    })
  }, [])

  return playlist.length ? (
    <div>
      <h1>Publisher</h1>
      <VideoPlayer />
      <Link to="/">Go Away</Link>

      <Playlist />
      <ChatBox customNameId="paige" />
    </div>
  ) : (
    'loading'
  )
}

export default Publisher
