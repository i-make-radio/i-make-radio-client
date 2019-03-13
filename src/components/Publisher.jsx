import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Playlist from './Playlist'
import VideoPlayer from './VideoPlayer'
class Publisher extends Component {
  constructor() {
    super()
    this.videoPlayer = React.createRef
    this.state = { playlist: [] }

    axios.get('http://10.10.213.235:8088').then(res => {
      this.setState({
        playlist: res
      })
    })
  }

  componentDidMount() {}

  componentWillUnmount() {
    alert('unmounting')
    this.rtcPublisher.unpublish()
  }

  publishStream = () => {
    this.initializeStream &&
      this.rtcPublisher
        .publish()
        .then(res => console.log('publishinng'))
        .catch(err => console.log(err))
  }
  unPublish = () => {
    this.rtcPublisher.unpublish()
  }
  render() {
    return this.state.playlist.length ? (
      <div>
        <h1>Publisher</h1>
        <VideoPlayer />
        <Link to="/">Go Away</Link>
        <button onClick={this.unPublish}>UnPublish</button>
        <button onClick={this.publishStream}>publishStream</button>

        <Playlist />
      </div>
    ) : (
      'loading'
    )
  }
}

export default Publisher
