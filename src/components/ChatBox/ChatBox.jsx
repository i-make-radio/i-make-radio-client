import React, { useState, useRef, useEffect } from 'react'
import './chatbox.css'
// import io from 'socket.io-client'

// const socket = io.connect('http://10.10.213.235:8080')

const ChatBox = ({ changeUsername, sendMessage, registerReceivedMessage }) => {
  const [messages, updateMessages] = useState([])

  const chatBoxInputRef = useRef(null)
  const usernameBoxInputRef = useRef(null)

  useEffect(() => {
    registerReceivedMessage(onMessageReceived)
  }, [])

  const onMessageReceived = data => {
    const updatedList = [...messages, data]
    console.log('message received', messages, updatedList)
    updateMessages(updatedList)
  }

  // socket.on('startPlayingPublisher', (data) => {
  //   console.log("GOT FROM SUB startPlayingPublisher", data)
  // })

  // socket.on('stopPlayingPublisher', (data) => {
  //   console.log("GOT FROM SUB stopPlayingPublisher", data)
  // })

  // socket.on('resumePlayingPublisher', (data) => {
  //   console.log("GOT FROM SUB resumePlayingPublisher", data)
  // })

  // socket.on('new_message', (data) => {
  //   const updatedList = [...messages, data]
  //   console.log(updatedList)
  //   updateMessages(updatedList)
  // })

  // const sendMessage = e => {
  //   e.preventDefault()
  //   const message = chatBoxInputRef.current.value

  //   if (message.length == 0) {
  //     return
  //   }

  //   // socket.emit('new_message', { message })
  //   chatBoxInputRef.current.value = ''
  //   chatBoxInputRef.current.focus()
  // }

  // const changeUsername = e => {
  //   e.preventDefault()
  //   const newUsername = usernameBoxInputRef.current.value

  //   if (newUsername.length == 0) {
  //     return
  //   }

  //   socket.emit('change_username', { username: newUsername })
  // }

  const chatboxContentJSX = messages.map((message, i) => (
    <div id="messageContainer">
      <div id="messageSender" key={i + 's'}>
        {message.username}{' '}
      </div>
      <div id="message" key={i}>
        {message.message}
      </div>
    </div>
  ))

  return (
    <div id="chatboxClass">
      <div id="chat_messages_container">{chatboxContentJSX}</div>

      <form id="message_form" onSubmit={sendMessage}>
        <input
          id="message_input_box"
          autoComplete="off"
          type="text"
          ref={chatBoxInputRef}
        />
        <button
          id="send_message_button"
          type="button"
          onClick={e => sendMessage({ e, chatbox: chatBoxInputRef })}
        >
          SEND
        </button>
      </form>

      <form id="change_username_form">
        <input
          id="username_input_box"
          autoComplete="off"
          type="text"
          ref={usernameBoxInputRef}
        />
        <button
          id="send_username_button"
          type="button"
          onClick={e =>
            changeUsername({ e, username: chatBoxInputRef.current.value })
          }
        >
          CHANGE USERNAME
        </button>
      </form>
    </div>
  )
}

export default ChatBox
