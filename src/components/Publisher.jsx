import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'

import ChatBox from './ChatBox'
import Playlist from './Playlist'
import VideoPlayer from './VideoPlayer'

const Publisher = () => {
  useEffect(() => {
    this.state = { playlist: [] }
    axios.get('http://10.10.213.235:8088').then(res => {
      this.setState({
        playlist: res.data
      })
    })
  }, [])

  return this.state.playlist.length ? (
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
