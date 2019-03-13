import React, { Component } from 'react'
import './chatbox.css'

class ChatBox extends Component {
  alertName = name => {
    alert(name)
  }
  render() {
    return (
      <div onClick={() => this.alertName('alice')}>
        {this.props.customNameId}
      </div>
    )
  }
}

export default ChatBox
