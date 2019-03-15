import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import './shared.css'
import './publisher.css'
import socket from './utils/socket'
import Playlist from './Playlist/Playlist'
import SubscriberVideoPlayer from './SubscriberVideoPlayer'
import ChatBox from './ChatBox/ChatBox'

const Subscriber = () => {
  const [currentSong, setCurrentSong] = useState(null)
  const [playlist, updatePlaylist] = useState([])
  const [socketClient, updateSocketClient] = useState(socket)

  useEffect(() => {
    axios.get('http://10.10.213.235:8080/currentSong').then(res => {
      // debugger
      setCurrentSong(res.data.currentSong)
      updatePlaylist(res.data.otherSongs)
    })
  }, [])

  socket.registerOnStartPlaying(data => {
    // debugger
    setCurrentSong(data.currentSong)
    updatePlaylist(data.otherSongs)
  })

  socket.registerOnStopPlaying(() => {
    setCurrentSong(null)
  })

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

  return (
    <div className="main_publisher">
      <div className="two_column_container">
        <div className="left_column">
          <div className="left_column_profile_section">
            <div className="profile_top_left_menu" />
            <div className="profile_empty_spacer" />
            <div className="profile_image" />
            <p className="profile_title">Profile</p>
          </div>

          <div className="profile_section_divider" />

          <Playlist songs={playlist} isPublisher={false} currentSong={currentSong} playState={!!currentSong}/>
        </div>

        <div className="right_column">
          <SubscriberVideoPlayer />
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
