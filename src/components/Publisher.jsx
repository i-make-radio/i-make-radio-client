import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import './publisher.css'

import socket from './utils/socket'
import Playlist from './Playlist/Playlist'
import VideoPlayer from './VideoPlayer'
import ChatBox from './ChatBox/ChatBox'

const Publisher = () => {
  const [playlist, updatePlaylist] = useState([])
  const [socketClient, updateSocketClient] = useState(socket)
  const [streamAlive, updateStreamState] = useState(false)

  useEffect(() => {
    axios.get('http://10.10.213.235:8080/allSongs').then(res => {
      updatePlaylist(res.data)
    })
  }, [])

  const sendMessage = ({ e, chatbox }) => {
    e.preventDefault()
    const message = chatbox.current.value

    if (message.length == 0) {
      return
    }

    socketClient.message(message)
    chatbox.current.value = ''
    chatbox.current.focus()
  }

  const changeUserName = ({ e, userRef }) => {
    e.preventDefault()

    const username = userRef.current.value
    if (username.length == 0) {
      return
    }
    socketClient.changeUserName(username)
    userRef.current.value = ''
    userRef.current.focus()
  }

  return playlist.length ? (
    <div id="main_publisher">
      <div id="two_column_container">
        <div id="left_column">
          <div id="left_column_profile_section">
            <div id="profile_top_left_menu" />
            <div id="profile_empty_spacer" />
            <div id="profile_image" />
            <p id="profile_title">Profile</p>
          </div>

          <div id="profile_section_divider" />

          <Playlist songs={playlist} />
        </div>

        <div id="right_column">
          <VideoPlayer
            updateStreamState={updateStreamState}
            streamState={streamAlive}
          />
          <ChatBox
            registerReceivedMessage={socketClient.registerReceivedMessage}
            sendMessage={sendMessage}
            changeUserName={changeUserName}
          />
        </div>
      </div>
    </div>
  ) : (
    'loading'
  )
}

export default Publisher
