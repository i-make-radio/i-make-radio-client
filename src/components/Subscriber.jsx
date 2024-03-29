import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './shared.css'
import socket from './utils/socket'
import Playlist from './Playlist/Playlist'
import SubscriberVideoPlayer from './SubscriberVideoPlayer'
import ChatBox from './ChatBox/ChatBox'
import NameFormDialog from './Dialogs/NameFormDialog'

const Subscriber = () => {
  const [currentSong, setCurrentSong] = useState(null)
  const [playlist, updatePlaylist] = useState([])
  const [socketClient, updateSocketClient] = useState(socket)
  const [userName, updateUserName] = useState('Profile')

  useEffect(() => {
    axios.get('http://10.10.210.12:8080/currentSong').then(res => {
      setCurrentSong(res.data.currentSong)
      updatePlaylist(res.data.otherSongs)
    })
  }, [])

  socket.registerOnStartPlaying(data => {
    setCurrentSong(data.currentSong)
    updatePlaylist(data.otherSongs)
  })

  socket.registerOnStopPlaying(() => {
    setCurrentSong(null)
  })

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

  const changeUserName = (newUserName) => {
    if (newUserName.length == 0) {
      return
    }
    socketClient.changeUserName(newUserName)
    updateUserName(newUserName)
  }

  return (
    <div className="main_publisher subscriber_container">
      <div className="two_column_container">
        <div className="left_column">
          <div className="left_column_profile_section">
            <div className="profile_top_left_menu" />
            <div className="profile_empty_spacer" />
            <div className="profile_image" />
             <NameFormDialog 
            className="profile_title"
            changeUserName={changeUserName}
            defaultUsername={userName}/>
          </div>

          <div className="profile_section_divider" />

          <Playlist
            songs={playlist}
            isPublisher={false}
            currentSong={currentSong}
            playState={!!currentSong}
          />
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
