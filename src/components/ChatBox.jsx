import React, { useState, useRef } from 'react'
import './chatbox.css'
import io from 'socket.io-client'

const socket = io.connect('localhost:8080')

const ChatBox = (props) => {
  const [messages, updateMessages] = useState([])
  const [username, updateUsername] = useState("")

  const chatBoxInputRef = useRef(null)
  const usernameBoxInputRef = useRef(null)

  socket.on('new_message', (data) => {
    const updatedList = [...messages, data]
    console.log(updatedList)
    updateMessages(updatedList)
  })

  const sendMessage = (e) => {
    e.preventDefault()
    const message = chatBoxInputRef.current.value

    if (message.length == 0) {
      return
    }

    socket.emit('new_message', { message })
    chatBoxInputRef.current.value = ''
    chatBoxInputRef.current.focus()
  }

  const changeUsername = (e) => {
    e.preventDefault()
    const newUsername = usernameBoxInputRef.current.value

    if (newUsername.length == 0) {
      return
    }

    socket.emit('change_username', {username: newUsername})
  }

  const chatboxContentJSX = messages.map((message, i) => <div className="messageContainer">
  <div className="messageSender" key={i+"s"}>{message.username} </div>
   <div className="message" key={i}>{message.message}</div>
  </div>)

  return (
    <section className="chatboxClass">

      <section id="chatroom">
        {chatboxContentJSX}
        <section id="feedback"></section>
      </section>

      <form className="message_form" onSubmit={sendMessage}>
        <input className="message_input_box" autocomplete="off" type="text" ref={chatBoxInputRef} />
        <button className="send_message_button" type="button" onClick={sendMessage}>SEND</button>
      </form>

      <section>
        <form id="change_username_form">
          <input className="username_input_box" type="text" ref={usernameBoxInputRef}/>
          <button className="send_username_button" type="button" onClick={changeUsername}>Change Username</button>
        </form>
      </section>

    </section>
  )
}


export default ChatBox
