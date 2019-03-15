import React, { useState, useRef, useEffect } from 'react'
import socket from '../utils/socket'
import './chatbox.css'

var recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)()
recognition.lang = 'en-US'
recognition.continous = true

const ChatBox = ({ sendMessage, registerReceivedMessage }) => {
  const [messages, updateMessages] = useState([])
  const [speechInput, updateSpeechInput] = useState('')
  const chatBoxInputRef = useRef(null)

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
    console.log("speech to text")
    recognition.start()
  }

  recognition.onresult = function(e) {
    const result = e.results[0][0].transcript
    updateSpeechInput(result)
    sendMessage({ e, chatbox: chatBoxInputRef, updateSpeechInput })
    recognition.stop()
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
       
      <div className="speech_to_text_button_container">
            <button className="speech_to_text_button" onClick={speechToText}>      </button>
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
          defaultValue={speechInput}
        />
        
        <button id="send_message_button" type="submit">
          SEND
        </button>
        
      </form>

    </div>
  )
}

export default ChatBox
