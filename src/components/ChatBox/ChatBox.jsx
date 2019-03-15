import React, { useState, useRef, useEffect } from 'react'
import socket from '../utils/socket'
import './chatbox.css'

var recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)()
recognition.lang = 'en-US'
recognition.continous = true

const ChatBox = ({ changeUserName, sendMessage, registerReceivedMessage }) => {
  const [messages, updateMessages] = useState([])
  const [speechInput, updateSpeechInput] = useState('')
  const chatBoxInputRef = useRef(null)
  const usernameBoxInputRef = useRef(null)

  useEffect(() => {
    registerReceivedMessage(onMessageReceived)
    return socket.unregisterReceivedMessage
  }, [])

  const onMessageReceived = newMessage => {
    // messages.push(newMessage)
    // NOTE(Alvaro): I've change this to work as expected,
    // please ping me and I'll update you.
    // I don't know how I didn't see this all straight.
    // updateMessages([...messages, newMessage])
    updateMessages(actualMessages => [...actualMessages, newMessage])

    var element = document.getElementById('chat_messages_container')
    element.scrollTop = element.scrollHeight
  }

  const speechToText = () => {
    recognition.start()
  }

  recognition.onresult = function(e) {
    const result = e.results[0][0].transcript
    updateSpeechInput(result)
    sendMessage({ e, chatbox: chatBoxInputRef, updateSpeechInput })
  }

  const chatboxContentJSX = messages.map((message, i) => (
    <div id="messageContainer" aria-label={''.concat(message.username, ' said ', message.message)} aria-atomic="true">
      <div id="messageSender" key={i + 's'}>
        {message.username}{' '}
      </div>
      <div id="message" key={i}>
        {message.message}
      </div>
    </div>
  ))

  return (
    <div className="chatbox-container">

      <div id="chat_messages_container"
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="all">
        {chatboxContentJSX}
      </div>

      <form
        id="message_form"
        onSubmit={e => sendMessage({ e, chatbox: chatBoxInputRef })}
      >
        <input
          id="message_input_box"
          autoComplete="off"
          type="text"
          aria-label="message input"
          ref={chatBoxInputRef}
          value={speechInput}
        />
        <button onClick={speechToText}>SPEECH</button>
        <button id="send_message_button" type="submit">
          SEND
        </button>
      </form>

      <form
        id="change_username_form"
        onSubmit={e => changeUserName({ e, userRef: usernameBoxInputRef })}
      >
        <input
          id="username_input_box"
          autoComplete="off"
          type="text"
          aria-label="username input"
          ref={usernameBoxInputRef}
        />
        <button id="send_username_button" type="submit">
          CHANGE USERNAME
        </button>
      </form>
    </div>
  )
}

export default ChatBox
