import React, { useState, useRef, useEffect } from 'react'
import './chatbox.css'

const ChatBox = ({ changeUserName, sendMessage, registerReceivedMessage }) => {
  const [messages, updateMessages] = useState([])

  const chatBoxInputRef = useRef(null)
  const usernameBoxInputRef = useRef(null)

  useEffect(() => {
    registerReceivedMessage(onMessageReceived)
  }, [])

  const onMessageReceived = newMessage => {
    // messages.push(newMessage)
    // NOTE(Alvaro): I've change this to work as expected,
    // please ping me and I'll update you.
    // I don't know how I didn't see this all straight.
    // updateMessages([...messages, newMessage])
    updateMessages(actualMessages => [...actualMessages, newMessage])
  }

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
    <div className="chatbox-container">
      <div id="chat_messages_container">{chatboxContentJSX}</div>

      <form
        id="message_form"
        onSubmit={e => sendMessage({ e, chatbox: chatBoxInputRef })}
      >
        <input
          id="message_input_box"
          autoComplete="off"
          type="text"
          ref={chatBoxInputRef}
        />
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
