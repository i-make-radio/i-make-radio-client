import React, { useEffect, useState } from 'react'
import axios from 'axios'

import socket from './utils/socket'
import Playlist from './Playlist/Playlist'
import VideoPlayer from './VideoPlayer'
import ChatBox from './ChatBox/ChatBox'
import NameFormDialog from './Dialogs/NameFormDialog'

import './shared.css'

const Publisher = () => {
  const [playlist, updatePlaylist] = useState([])
  const [currentSong, updateCurrentSong] = useState(null)
  const [playState, setPlayState] = useState(false)
  const [socketClient] = useState(socket)
  const [streamAlive, updateStreamState] = useState(false)

  useEffect(() => {
    axios.get('http://10.10.210.12:8080/allSongs').then(res => {
      updatePlaylist(res.data)
      updateCurrentSong(res.data[1])
    })
  }, [])

  const sendMessage = ({ e, chatbox, updateSpeechInput = () => {} }) => {
    e.preventDefault()
    const message = chatbox.current.value

    if (message.length === 0) {
      return
    }

    socketClient.message(message)
    chatbox.current.value = ''
    updateSpeechInput('')
    chatbox.current.focus()
  }

  const changeUserName = ({ e, userRef }) => {
    e.preventDefault()

    const username = userRef.current.value
    if (username.length === 0) {
      return
    }
    socketClient.changeUserName(username)
    userRef.current.value = ''
    userRef.current.focus()
  }

  return playlist.length ? (
    <div className="main_publisher">
      <div className="two_column_container">
        <div className="left_column">
          <div className="left_column_profile_section">
            <div className="profile_top_left_menu" />
            <div className="profile_empty_spacer" />
            <div className="profile_image" />
            {/* <p className="profile_title">Profile</p> */}
            {/* <NameFormDialog className="profile_title"/> */}
          </div>

          <div className="profile_section_divider" />

          <Playlist
            songs={playlist}
            isPublisher
            currentSong={currentSong}
            updateCurrentSong={updateCurrentSong}
            playState={playState}
            setPlayState={setPlayState}
          />
        </div>

        <div className="right_column">
          <VideoPlayer
            updateStreamState={updateStreamState}
            streamState={streamAlive}
          />
          <div className="publisher_music_controller" />
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
