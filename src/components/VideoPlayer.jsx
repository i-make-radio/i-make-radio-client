import React from 'react'
import PropTypes from 'prop-types'

import ReactPlayer from 'react-player'

const VideoPlayer = ({ autoPlay = false, playerId, wrapper = 'div' }) => {
  return (
    <ReactPlayer
      id={playerId}
      wrapper={wrapper}
      controls={true}
      autoPlay={autoPlay}
      pip={true}
    />
  )
}

export default VideoPlayer
