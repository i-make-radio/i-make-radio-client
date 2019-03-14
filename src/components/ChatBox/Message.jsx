import React from 'react';

const Message = ({ username, message }) => (
    <div id="messageContainer">
    <div id="messageSender">{username} </div>
    <div id="message">{message}</div>
  </div>
)

export default Message