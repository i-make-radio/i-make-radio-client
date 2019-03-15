import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import './publisher.css'
import io from 'socket.io-client'

import socket from './utils/socket'
import Playlist from './Playlist/Playlist'
import SubscriberVideoPlayer from './SubscriberVideoPlayer'
import ChatBox from './ChatBox/ChatBox'

const Subscriber = () => {
  const [playlist, updatePlaylist] = useState([])
  const [socketClient, updateSocketClient] = useState(socket)

  useEffect(() => {
    axios.get('http://10.10.213.235:8080/playedSongs').then(res => {
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
    debugger
    e.preventDefault()

    const username = userRef.current.value
    if (username.length == 0) {
      return
    }
    socketClient.changeUserName(username)
    userRef.current.value = ''
    userRef.current.focus()
  }

  return (
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
          <div className="right_column__row_flex__show_info_section">
            <div id="video_player_container">
              <SubscriberVideoPlayer />
            </div>

            <div id="live_shows__column_flex">
              <p id="live_shows__listeners_count">726 listeners</p>
              <p id="live_shows__elasped_time">3:24:48</p>
              <div id="live_shows__bottom_spacer" />
            </div>
          </div>

          <ChatBox
            registerReceivedMessage={socketClient.registerReceivedMessage}
            sendMessage={sendMessage}
            changeUserName={changeUserName}
          />
        </div>
      </div>
    </div>
  )
}

export default Subscriber
